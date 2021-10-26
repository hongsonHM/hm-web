import React, { useEffect, useState } from "react";
import { Empty, Descriptions, Divider, Table, Button, Checkbox } from "antd";
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
      dataIndex: "coreTask",
      key: "coreTask",
      render: (value) => {
        return value.coreSupplies
          .filter((supplies) => supplies.category === "Hóa chất")
          .reduce((a, b) => a + b.effort * 1, 0)
          .toFixed(3);
      },
    },
    {
      title: "Máy móc",
      dataIndex: "coreTask",
      key: "coreTask",
      render: (value) =>
        value.coreSupplies
          .filter((supplies) => supplies.category === "Máy móc, thiết bị")
          .reduce((a, b) => a + b.effort * 1, 0)
          .toFixed(3),
    },
    {
      title: "CCDC",
      dataIndex: "coreTask",
      key: "coreTask",
      render: (value) =>
        value.coreSupplies
          .filter((supplies) => supplies.category === "Công cụ, vật tư")
          .reduce((a, b) => a + b.effort * 1, 0)
          .toFixed(3),
    },
    {
      title: "Công",
      dataIndex: "coreTask",
      key: "coreTask",
      render: (value) =>
        value.coreSupplies
          .filter((supplies) => supplies.category === "Nhân công")
          .reduce((a, b) => a + b.effort * 1, 0)
          .toFixed(3),
    },
    {
      title: "Tần suất",
      dataIndex: "frequency",
      key: "frequency",
      render: (value) => `${value.split("/")[0]} lần / ${value.split("/")[1]}`,
    },
    {
      title: "T2",
      dataIndex: "mon",
      key: "mon",
      render: (value) => <Checkbox checked={value ? true : false} style={{ transform: "scale(1.5)" }} />,
    },
    {
      title: "T3",
      dataIndex: "tue",
      key: "tue",
      render: (value) => <Checkbox checked={value ? true : false} style={{ transform: "scale(1.5)" }} />,
    },
    {
      title: "T4",
      dataIndex: "wed",
      key: "wed",
      render: (value) => <Checkbox checked={value ? true : false} style={{ transform: "scale(1.5)" }} />,
    },
    {
      title: "T5",
      dataIndex: "thu",
      key: "thu",
      render: (value) => <Checkbox checked={value ? true : false} style={{ transform: "scale(1.5)" }} />,
    },
    {
      title: "T6",
      dataIndex: "fri",
      key: "fri",
      render: (value) => <Checkbox checked={value ? true : false} style={{ transform: "scale(1.5)" }} size="middle" />,
    },
    {
      title: "T7",
      dataIndex: "sat",
      key: "sat",
      render: (value) => <Checkbox checked={value ? true : false} style={{ transform: "scale(1.5)" }} size="middle" />,
    },
    {
      title: "CN",
      dataIndex: "sun",
      key: "sun",
      render: (value) => <Checkbox checked={value ? true : false} style={{ transform: "scale(1.5)" }} size="middle" />,
    },
    {
      title: "Nhân công",
      dataIndex: "",
      key: "",
    },
  ];
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
          {/* <Descriptions.Item label="Số lượng đối tượng">3 Tiểu bộ phận - 9 đối tượng</Descriptions.Item> */}
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
