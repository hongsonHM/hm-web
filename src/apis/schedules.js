import retryHandleApis from "../configs/handleApis";

// svc-schedule-plan-resource
export const getAllSchedules = () => {
  return retryHandleApis("/svc-schedule-plans", "GET",);
};

export const getScheduleById = (id) => {
  return retryHandleApis(`/svc-schedule-plans/${id}`, "GET",);
};

export const createSchedule = (data) => {
  return retryHandleApis("/svc-schedule-plans", "POST", data);
};

// svc-schedule-plan-record-resource
export const getAllScheduleRecords = () => {
  return retryHandleApis("/svc-schedule-plan-records", "GET");
};

export const getScheduleRecordById = (id) => {
  return retryHandleApis(`/svc-schedule-plan-records/${id}`, "GET",);
};

export const createScheduleRecord = (data) => {
  return retryHandleApis("/svc-schedule-plan-records", "POST", data);
};

// svc-schedule-unit-resource
export const getAllScheduleUnit = () => {
  return retryHandleApis("/svc-schedule-plan-units", "GET");
};

export const getScheduleUnitById = (id) => {
  return retryHandleApis(`/svc-schedule-plan-units/${id}`, "GET",);
};

export const createScheduleUnit= (data) => {
  return retryHandleApis("/svc-schedule-plan-units", "POST", data);
};

// svc-schedule-unit-record-resource
export const getAllScheduleUnitRecords = () => {
  return retryHandleApis("/svc-schedule-plan-unit-records", "GET");
};

export const getScheduleUnitRecordById = (id) => {
  return retryHandleApis(`/svc-schedule-plan-unit-records/${id}`, "GET",);
};

export const createScheduleUnitRecords= (data) => {
  return retryHandleApis("/svc-schedule-plan-unit-records", "POST", data);
};

