import React, { Fragment, useEffect, useState } from "react";
import { Select, Empty, Descriptions, message, Divider } from "antd";
import { getAllContract, getPreviewSupplies, getContractById } from "../../../apis/contract";
import moment from "moment";

const { Option } = Select;

function SelectContract(props) {
  const { selectedContract } = props;
  const [contracts, setContracts] = useState();
  const [labor, setLabor] = useState();
  const [subAreaNumber, setSubAreaNumber] = useState(0);
  // const [selectedContract, setSelectedContract] = useState();

  // Get all contract by status = SUCCESS
  const fetchContracts = async () => {
    const response = await getAllContract();
    setContracts(response.data);
  };

  useEffect(() => {
    if (!contracts) {
      fetchContracts();
    }
  }, [contracts]);

  /**
   * 
   * @param {contract id} 
   * GET info contract by id => update number of sub area
   * GET preview supplies => get labor
   */
  const fetchContract = async (cid) => {
    const response = await getContractById(cid);
    if (response.status === 201) {
      setSubAreaNumber(response.data.svcSpendTaskForAreaDTOs.length);
      const res = await getPreviewSupplies(response.data);
      if (res.data) {
        props.setSupplies(res.data);
        setLabor(res.data.filter((d) => d.name === "Nhân công phổ thông")[0].effort);
      }
    } else message.error("Không có hợp đồng này, vui lòng thử lại!");
  };

  useEffect(() => {
    if (selectedContract) fetchContract(selectedContract.id);
  }, [selectedContract]);

  return (
    <Fragment>
      <Select
        showSearch
        placeholder="Chọn 1 hợp đồng"
        optionFilterProp="children"
        onChange={(e) => {
          props.setSelectedContract(contracts.filter((c) => c.id === e)[0]);
          // console.log(contracts.filter((c) => c.id === e)[0]);
        }}
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        size="large"
        style={{ width: "100%" }}
      >
        {contracts &&
          contracts.map((contract, i) => (
            <Option key={contract.id} value={contract.id}>
              {contract.client.customerName} - {contract.documentId}
            </Option>
          ))}
      </Select>
      {selectedContract ? (
        <>
          <Divider />
          <Descriptions labelStyle={{ fontWeight: 600 }} column={2} title="Thông tin hợp đồng">
            <Descriptions.Item label="Tên khách hàng">{selectedContract.client.customerName}</Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">{selectedContract.client.address}</Descriptions.Item>
            <Descriptions.Item label="Ngày bắt đầu">{moment(selectedContract.effectiveTimeFrom).format("DD/MM/YYYY")}</Descriptions.Item>
            <Descriptions.Item label="Ngày kết thúc">{moment(selectedContract.effectiveTimeTo).format("DD/MM/YYYY")}</Descriptions.Item>
            <Descriptions.Item label="Số lượng đối tượng">{subAreaNumber} Tiểu bộ phận</Descriptions.Item>
            <Descriptions.Item label="Số lượng công">{labor} công</Descriptions.Item>
            {/* <Descriptions.Item label="Nội dung">{selectedContract.content}</Descriptions.Item> */}
          </Descriptions>
        </>
      ) : (
        <Empty description="Chọn một hợp đồng để bắt đầu" />
      )}
    </Fragment>
  );
}

export default React.memo(SelectContract);
