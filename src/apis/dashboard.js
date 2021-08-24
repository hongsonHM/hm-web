import retryHandleApis from "../configs/handleApis";

export const getDashboard = () => {
  return retryHandleApis(`/dashboard`, "GET");
};
