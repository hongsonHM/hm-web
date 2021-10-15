import React, { useEffect, useState } from "react";
import { Empty, Descriptions, Divider, Table, Button } from "antd";
import { GlobalDescriptions } from "../../../configs/styled.global";
import moment from "moment";

function PreviewPlan(props) {
  const { selectedContract, selectedPlan, customValues, previewSupplies } = props;

  const columns = [
    {
      title: "Vị trí",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Bắt đầu",
      dataIndex: "startAt",
      key: "startAt",
    },
    {
      title: "Kết thúc",
      dataIndex: "endAt",
      key: "endAt",
    },
    {
      title: "Đối tượng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Hóa chất",
      dataIndex: "hc",
      key: "hc",
      render: () => 0,
    },
    {
      title: "Máy móc",
      dataIndex: "mm",
      key: "mm",
      render: () => 0,
    },
    {
      title: "CCDC",
      dataIndex: "",
      key: "",
      render: () => 1,
    },
    {
      title: "Công",
      dataIndex: "nc",
      key: "nc",
      render: () => 1,
    },
    {
      title: "Tần suất",
      dataIndex: "frequency",
      key: "frequency",
      render: (value) => `${value.split("/")[0]} lần / ${value.split("/")[1]}`,
    },
    {
      title: "Thứ 2",
      dataIndex: "mon",
      key: "mon",
    },
    {
      title: "Thứ 3",
      dataIndex: "tue",
      key: "tue",
    },
    {
      title: "Thứ 4",
      dataIndex: "wed",
      key: "wed",
    },
    {
      title: "Thứ 5",
      dataIndex: "thu",
      key: "thu",
    },
    {
      title: "Thứ 6",
      dataIndex: "fri",
      key: "fri",
    },
    {
      title: "Thứ 7",
      dataIndex: "sat",
      key: "sat",
    },
    {
      title: "Chủ nhật",
      dataIndex: "sun",
      key: "sun",
    },
    {
      title: "Nhân công",
      dataIndex: "",
      key: "",
    },
  ];
  console.log(selectedPlan);
  return (
    <div>
      {selectedContract ? (
        <GlobalDescriptions
          labelStyle={{ fontWeight: 600 }}
          column={1}
          title={
            <>
              Thông tin hợp đồng
              <Button onClick={() => props.setCurrent(0)} className="btn--right" size="small" type="link">
                Chi tiết
              </Button>
            </>
          }
          bordered
        >
          <Descriptions.Item label="Tên khách hàng">{selectedContract.client.customerName}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">{selectedContract.client.address}</Descriptions.Item>
          <Descriptions.Item label="Ngày bắt đầu">{moment(selectedContract.effectiveTimeFrom).format("DD/MM/YYYY")}</Descriptions.Item>
          <Descriptions.Item label="Ngày kết thúc">{moment(selectedContract.effectiveTimeTo).format("DD/MM/YYYY")}</Descriptions.Item>
          <Descriptions.Item label="Số lượng đối tượng">3 Tiểu bộ phận - 9 đối tượng</Descriptions.Item>
          {/* <Descriptions.Item label="Nội dung">{selectedContract.content}</Descriptions.Item> */}
        </GlobalDescriptions>
      ) : (
        <Empty description="Chọn chọn hợp đồng" />
      )}
      <br />
      {selectedPlan ? (
        <>
          <GlobalDescriptions
            labelStyle={{ fontWeight: 600 }}
            column={1}
            title={
              <>
                Thông tin kế hoạch - lịch làm việc
                <Button onClick={() => props.setCurrent(0)} className="btn--right" size="small" type="link">
                  Chi tiết
                </Button>
              </>
            }
            bordered
          ></GlobalDescriptions>
          <Table
            pagination={false}
            dataSource={selectedPlan}
            columns={columns}
            locale={{
              emptyText: <span>Chưa có dữ liệu!</span>,
            }}
            rowKey="id"
          />
        </>
      ) : (
        <Empty description="Chưa chọn tiểu bộ phận hoặc đối tượng" />
      )}
    </div>
  );
}

export default React.memo(PreviewPlan);
