import React from "react";
import { Button, Descriptions, Divider, Table } from "antd";
import { GlobalDescriptions } from "../../configs/styled.global";
import moment from "moment";
import CollapsePanel from "./CollapsePanel";
function ConfirmContract(props) {
  const { contract, selectedClient } = props;

  const columns = [
    {
      title: "TT",
      dataIndex: "index",
      key: "index",
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Tên vật tư/hóa chất",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Khối lượng",
      dataIndex: "mass",
      key: "mass",
    },
  ];

  return (
    <div>
      {selectedClient && (
        <GlobalDescriptions labelStyle={{ width: 300 }} bordered column={1} title={"Thông tin khách hàng"}>
          <Descriptions.Item label="Tên khách hàng">{selectedClient.customerName || "Chưa có thông tin"}</Descriptions.Item>
          <Descriptions.Item label="Tỉnh/Tp">{selectedClient.customerCity || "Chưa có thông tin"}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{selectedClient.address || "Chưa có thông tin"}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{selectedClient.phoneNumber || "Chưa có thông tin"}</Descriptions.Item>
          <Descriptions.Item label="Mô hình">{selectedClient.type || "Chưa có thông tin"}</Descriptions.Item>
        </GlobalDescriptions>
      )}
      <Divider />
      <GlobalDescriptions labelStyle={{ width: 300 }} bordered column={1} title={"Thông tin hợp đồng"}>
        <Descriptions.Item label={contract["effectiveTimeFrom"].label}>
          {moment(contract["effectiveTimeFrom"].value).format("DD/MM/YYYY") || "Chưa có thông tin"}
        </Descriptions.Item>
      </GlobalDescriptions>

      <Divider />
      <GlobalDescriptions labelStyle={{ width: 300 }} bordered column={1} title={"Thông tin đối tượng"}>
        <Descriptions.Item label="Số lượng đối tượng">
          {(
            <>
              3 Tiểu bộ phận - 6 Đối tượng{" "}
              <Button onClick={() => props.setCurrent(2)} style={{ float: "right" }} type="link" size="small">
                Chi tiết
              </Button>
            </>
          ) || "Chưa có thông tin"}
        </Descriptions.Item>
        <Descriptions.Item label="Tổng hao phí nhân công">{"302 công tương đương 1 người" || "Chưa có thông tin"}</Descriptions.Item>
      </GlobalDescriptions>

      <Divider />
      <GlobalDescriptions labelStyle={{ width: 300 }} bordered column={1} title={"Hao phí vật tư, hóa chất; máy, thiết bị"}></GlobalDescriptions>
      <Table
        pagination={false}
        dataSource={[
          {
            name: "Chổi cán dài",
            unit: "Chiếc",
            mass: 3,
          },
          {
            name: "Xô nhựa",
            unit: "Chiếc",
            mass: 5,
          },
          {
            name: "Hóa chất X",
            unit: "ml",
            mass: 50,
          },
          {
            name: "Máy ABC",
            unit: "ca",
            mass: 0.5,
          },
        ]}
        columns={columns}
        locale={{
          emptyText: <span>Chưa có dữ liệu!</span>,
        }}
      />
      <br />
    </div>
  );
}

export default React.memo(ConfirmContract);
