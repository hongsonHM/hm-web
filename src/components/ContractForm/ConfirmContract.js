import React, { useEffect, useState } from "react";
import { Button, Descriptions, Divider, Table } from "antd";
import { GlobalDescriptions } from "../../configs/styled.global";
import moment from "moment";

function ConfirmContract(props) {
  const { contract, selectedClient, customValues, previewSupplies } = props;
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
      dataIndex: "effort",
      key: "effort",
    },
  ];

  return (
    <div>
      {selectedClient && (
        <GlobalDescriptions
          labelStyle={{ width: 300 }}
          bordered
          column={1}
          title={
            <>
              Thông tin khách hàng
              <Button onClick={() => props.setCurrent(0)} className="btn--right" size="small" type="link">
                Chi tiết
              </Button>
            </>
          }
        >
          <Descriptions.Item label="Tên khách hàng">{selectedClient.customerName || "Chưa có thông tin"}</Descriptions.Item>
          <Descriptions.Item label="Tỉnh/Tp">{selectedClient.customerCity || "Chưa có thông tin"}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{selectedClient.address || "Chưa có thông tin"}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{selectedClient.phoneNumber || "Chưa có thông tin"}</Descriptions.Item>
          <Descriptions.Item label="Mô hình">{selectedClient.type || "Chưa có thông tin"}</Descriptions.Item>
        </GlobalDescriptions>
      )}
      <Divider />
      {contract && (
        <GlobalDescriptions
          labelStyle={{ width: 300 }}
          bordered
          column={1}
          title={
            <>
              Thông tin hợp đồng
              <Button onClick={() => props.setCurrent(1)} className="btn--right" size="small" type="link">
                Chi tiết
              </Button>
            </>
          }
        >
          <Descriptions.Item label={contract["effectiveTimeFrom"].label}>
            {contract["effectiveTimeFrom"].value ? moment(contract["effectiveTimeFrom"].value).format("DD/MM/YYYY") : "Chưa có thông tin"}
          </Descriptions.Item>
        </GlobalDescriptions>
      )}

      <Divider />
      <GlobalDescriptions
        labelStyle={{ width: 300 }}
        bordered
        column={1}
        title={
          <>
            Thông tin đối tượng
            <Button onClick={() => props.setCurrent(2)} className="btn--right" size="small" type="link">
              Chi tiết
            </Button>
          </>
        }
      >
        <Descriptions.Item label="Số lượng đối tượng">
          {(customValues.svcSpendTaskForAreaDTOs && customValues.svcSpendTaskForAreaDTOs.length + "Tiểu bộ phận") || "Chưa có thông tin"}
        </Descriptions.Item>
        <Descriptions.Item label="Tổng hao phí nhân công">
          {previewSupplies ? previewSupplies[2].effort : "Chưa có thông tin"}
        </Descriptions.Item>
      </GlobalDescriptions>

      <Divider />
      <GlobalDescriptions labelStyle={{ width: 300 }} bordered column={1} title={"Hao phí vật tư, hóa chất; máy, thiết bị"}></GlobalDescriptions>
      <Table
        pagination={false}
        dataSource={previewSupplies}
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
