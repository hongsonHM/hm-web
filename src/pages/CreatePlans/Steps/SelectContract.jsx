import React, { Fragment, useEffect, useState } from "react";
import { Select, Empty, Descriptions, Typography, Divider } from "antd";
import { getAllContract } from "../../../apis/contract";
import moment from "moment";

const { Option } = Select;

function SelectContract(props) {
  const { selectedContract } = props;
  const [contracts, setContracts] = useState();
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
            <Descriptions.Item label="Số lượng đối tượng">2 Tiểu bộ phận</Descriptions.Item>
            <Descriptions.Item label="Số lượng công">320 công</Descriptions.Item>
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
