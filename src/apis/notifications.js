import retryHandleApis from "../configs/handleApis";

export const getNotification = (options) => {
  return retryHandleApis("/org-notifications", "GET", options);
};
