import React, { useState, useEffect } from "react";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent } from "../../configs/styled.global";
import { mockContracts } from "../../configs/mock";
import { mergeContractToInitialContract } from "../../utils/contract";
import Descriptions from "../../components/Descriptions";

const ContractDetails = (props) => {
  const cid = new URLSearchParams(window.location.search).get("cid");
  const [contract, setContract] = useState();
  const [initContract, setInitContract] = useState();
  useEffect(() => {
    cid &&
      mockContracts.filter((c) => {
        if (c.key == cid) {
          setContract(c);
        }
      });
  }, [cid]);

  useEffect(() => {
    if (contract) {
      setInitContract(mergeContractToInitialContract(contract));
    }
  }, [contract]);

  return (
    <GlobalContent key="contract_details">
      <GlobalTitle title="Thông tin hợp đồng" level={3} color="#3eb8f8" />
      <Descriptions  bordered column={2} title={null} data={initContract} />
    </GlobalContent>
  );
};

export default ContractDetails;
