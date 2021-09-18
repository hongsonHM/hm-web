import React, { useState, useEffect } from "react";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent } from "../../configs/styled.global";
import ContractForm from "../../components/ContractForm";
import { useSelector, useDispatch } from "react-redux";
import { getContract, setCurrentContract } from "../../stores/contractSlice";
import { mergeContractToInitialContract } from "../../utils/contract";
import { getContractById, updateContractById, getAllClients } from "../../apis/contract";
import { checkObjEmpty } from "../../utils";
import { getUserByRole } from "../../apis/auth";

const EditContract = (props) => {
  const cid = new URLSearchParams(window.location.search).get("cid");
  const dispatch = useDispatch();
  const [contract, setContract] = useState();
  const [client, setClient] = useState();
  const selectedContract = useSelector(getContract);
  const [clients, setClients] = useState([]);
  const [serviceManager, setServiceManager] = useState([]);
  const [businessManager, setBusinessManager] = useState([]);

  const getClients = async () => {
    const res = await getAllClients();
    setClients(res.data);
  };

  const getServiceManager = async () => {
    const res = await getUserByRole("SERVICE_MANAGER");
    const bm = await getUserByRole("BUSINESS_MANAGER");
    setServiceManager(res.data);
    setBusinessManager(bm.data);
  };

  useEffect(() => {
    if (!clients.length) {
      getClients();
    }
  }, [clients]);
  useEffect(() => {
    if (!serviceManager.length) {
      getServiceManager();
    }
  }, [serviceManager]);

  const fetchContractById = async () => {
    const data = await getContractById(cid);
    dispatch(setCurrentContract(data.data));
  };

  useEffect(() => {
    if (checkObjEmpty(selectedContract)) {
      setClient(selectedContract.client);
      setContract(mergeContractToInitialContract(selectedContract));
    } else fetchContractById();
  }, [selectedContract]);

  return (
    <GlobalContent key="edit_contract">
      <GlobalTitle title={`Chỉnh sửa hợp đồng ${selectedContract && selectedContract.documentId}`} level={3} color="#3eb8f8" />
      <br />
      <ContractForm
        businessManager={businessManager}
        serviceManager={serviceManager}
        customers={clients}
        actions={updateContractById}
        client={client}
        contract={contract}
        cid={cid}
      />
    </GlobalContent>
  );
};

export default EditContract;
