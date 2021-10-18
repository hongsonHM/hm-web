import retryHandleApis from "../configs/handleApis";

export const getAllContract = (options) => {
  return retryHandleApis(`/svc-contracts?sort.sorted=false`, 'GET')
}

export const getContractById = (cid) => {
  return retryHandleApis(`/full-contract/${cid}`, 'GET')
}
export const getContractByStatus = (status) => {
  return retryHandleApis(`/svc-contracts/?status.equals=${status}`, 'GET')
}

export const updateContractById = (cid, data) => {
  return retryHandleApis(`/svc-contracts/${cid}`, 'PUT', data)
}

export const partialUpdateSvcContract = (cid, data) => {
  return retryHandleApis(`/svc-contracts/${cid}`, 'PUT', data)
}

export const createContract = (id, data) => {
  return retryHandleApis(`/full-contract`, 'POST', data)
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

export const getPreviewSupplies = (data) => {
  return retryHandleApis(`/preview-supplies`, 'POST', data)
}

export const getOrgGroups = () => {
  return retryHandleApis(`/org-groups`, 'GET' )
}
