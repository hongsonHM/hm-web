import retryHandleApis from "../configs/handleApis";

export const userLogin = (data) => {
  return retryHandleApis("/auth/sign-in", "POST", data);
};
