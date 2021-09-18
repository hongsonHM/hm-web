import retryHandleApis from "../configs/handleApis";

// svc-schedule-plan-resource
export const getAllSchedulesByContractId = (contract_id) => {
  return retryHandleApis(`/svc-plans?contractId.equals=${contract_id}`, "GET",);
};

export const getScheduleById = (id) => {
  return retryHandleApis(`/svc-plans/${id}`, "GET",);
};

export const createSchedule = (data) => {
  return retryHandleApis("/svc-plans", "POST", data);
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
export const getAllPlanUnitByPlanId = (plan_id) => {
  return retryHandleApis(`/svc-plan-units?svcPlanId.equals=${plan_id}`, "GET");
};

export const getPlanUnitById = (id) => {
  return retryHandleApis(`/svc-plan-units/${id}`, "GET",);
};

export const createPlanUnit= (data) => {
  return retryHandleApis("/svc-plan-units", "POST", data);
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

