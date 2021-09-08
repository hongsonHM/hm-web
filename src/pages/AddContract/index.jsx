import React, { useState, useEffect } from "react";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent } from "../../configs/styled.global";
import { Select, DatePicker } from "antd";
import ContractForm from "../../components/ContractForm";
import { createContract, getAllClients } from "../../apis/contract";
import { getUserByRole } from "../../apis/auth";
import { mergeContractToInitialContract } from "../../utils/contract";

const { Option } = Select;

const initialContract = {
  appendicesNumber: "0.0",
  fileId: null,
  content: "",
  effectiveTimeFrom: null,
  effectiveTimeTo: null,
  durationMonth: null,
  value: null,
  contractValue: null,
  humanResources: null,
  humanResourcesWeekend: null,
  status: "UNREQUEST",
  subjectCount: null,
  valuePerPerson: 0,
  // year: null,
  client: {
    id: 1101,
    customerName: null,
    customerCity: null,
    phoneNumber: null,
    type: null,
    address: null,
  },
};

const AddContract = (props) => {
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

  return (
    <GlobalContent key="add_contract">
      <GlobalTitle title="Thêm mới hợp đồng" level={3} color="#3eb8f8" />
      <br />
      <ContractForm
        serviceManager={serviceManager}
        businessManager={businessManager}
        customers={clients}
        actions={createContract}
        client={initialContract.client}
        contract={mergeContractToInitialContract(initialContract)}
      />
    </GlobalContent>
  );
};

export default AddContract;
