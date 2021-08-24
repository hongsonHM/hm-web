import retryHandleApis from "../configs/handleApis";

export const getUserProfile = () => {
  return retryHandleApis("/profile", 'GET')
}
