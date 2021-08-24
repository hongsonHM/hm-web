import retryHandleApis from "../configs/handleApis";

export const getUserProfile = () => {
  return retryHandleApis("/account", 'GET')
}
