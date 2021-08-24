import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const MOCK_MODE = true;

let access_token = Cookies.get("token");
if (!access_token && window.location.pathname !== "/dang-nhap" && !MOCK_MODE) window.location.pathname = "/dang-nhap";

MOCK_MODE && !localStorage.loggedin && window.location.pathname !== "/dang-nhap" && (window.location.pathname = "/dang-nhap");

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

// Check token has expired. if true : refresh token and save to cookies
const refreshToken = () => {
  let decoded = access_token ? jwt_decode(access_token) : { claims: {} };
  if (Date.now() >= decoded.claims.expired_at) {
    return axios
      .post("/auth/token/refresh", {
        refresh_token: Cookies.get("refresh_token"),
      })
      .then(function (response) {
        console.log("RESPONSE", response);
        Cookies.set("token", response.data.data.access_token);
        Cookies.set("refresh_token", response.data.data.refresh_token);
        access_token = response.data.data.access_token;
        console.log("UPDATE TOKEN...");
        return access_token;
      })
      .catch(function (error) {
        console.log(error);
      });
  } else return access_token;
};

/**
 * Retry call API limit 3 times
 */
async function retryHandleApis(url, method, data, retries = 3, backoff = 100) {
  const retryCodes = [408, 500, 502, 503, 504, 522, 524];
  const successCodes = [200, 201, 202];
  return axios({
    method: method,
    url: url,
    data: data,
    headers: {
      Authorization: "Bearer " + (await refreshToken()),
    },
  })
    .then(function (res) {
      if (res.data.status === "UR0015") refreshToken();
      if (successCodes.includes(res.status)) {
        return res.data;
      }
      if (retries > 0 && retryCodes.includes(res.status)) {
        setTimeout(() => {
          return retryHandleApis(url, method, data, retries - 1, backoff * 2); /* 3 */
        }, backoff);
      } else {
        throw new Error(res);
      }
    })
    .catch(console.error);
}

export default retryHandleApis;
