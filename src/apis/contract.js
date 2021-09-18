import retryHandleApis from "../configs/handleApis";

export const getAllContract = (options) => {
  return retryHandleApis("/svc-contracts", 'GET')
}

export const getContractById = (cid) => {
  return retryHandleApis(`/svc-contracts/${cid}`, 'GET')
}
export const getContractByStatus = (status) => {
  return retryHandleApis(`/svc-contracts/?status=${status}`, 'GET')
}

export const updateContractById = (cid, data) => {
  return retryHandleApis(`/svc-contracts/${cid}`, 'PUT', data)
}

export const partialUpdateSvcContract = (cid, data) => {
  return retryHandleApis(`/svc-contracts/${cid}`, 'PUT', data)
}

export const createContract = (id, data) => {
  return retryHandleApis(`/svc-contracts`, 'POST', data)
}

export const getAllClients = () => {
  return retryHandleApis(`/svc-clients`, 'GET')
}
export const createClient = (data) => {
  return retryHandleApis(`/svc-clients`, 'POST', data)
}
export const getCoreSupplies = () => {
  return retryHandleApis(`/core-supplies`, 'GET')
}
export const getCoreTasks = () => {
  return retryHandleApis(`/core-tasks?size=117`, 'GET')
}
