import retryHandleApis from "../configs/handleApis";

export const userLogin = (data) => {
  return retryHandleApis("/authenticate", "POST", data);
};
export const getUserByRole = (role) => {
  return retryHandleApis(`/org-users?role.equals=${role}`, "GET");
};

