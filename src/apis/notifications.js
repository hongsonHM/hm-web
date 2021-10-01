import retryHandleApis from "../configs/handleApis";

export const getNotification = (orgUserId) => {
  return retryHandleApis(`/org-notifications?orgUserId.equals=${orgUserId}&sort.sorted=false`, "GET");
};
