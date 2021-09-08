import React, { useState } from "react";
import { Button, Typography, Modal } from "antd";
import { StyledTable } from "../../../assets/styled/table.styled";
import { mockScheduleUnits } from "../mock";
import CreateScheduleUnitForm from "./CreateScheduleUnitForm";

function SchedulesUnit(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const columns = [
    {
      title: "Start time",
      dataIndex: "start_at",
      key: "start_at",
    },
    {
      title: "End time",
      dataIndex: "end_at",
      key: "end_at",
    },
    {
      title: "Nhân công",
      dataIndex: "labor",
      key: "labor",
    },
  ];

  return (
    <>
      <Typography.Title level={5} className="flex__between__center">
        5/5 nhiệm vụ được hiển thị{" "}
        <Button danger type="primary" onClick={() => setModalVisible(true)}>
          + Thêm mới nhiệm vụ
        </Button>
      </Typography.Title>
      <StyledTable
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              // setSelectedContract(record);
              // setDrawerVisible(true);
            }, // click row
          };
        }}
        columns={columns}
        dataSource={mockScheduleUnits}
        locale={{
          emptyText: (
            <>
              <p>Chưa có nhiệm vụ nào cho kế hoạch này!</p>
              <Button type="primary" danger>
                + Tạo mới một nhiệm vụ
              </Button>
            </>
          ),
        }}
      />
      {/* Modal add new Schedules Unit */}
      <Modal footer={null} title="Thêm mới nhiệm vụ" visible={modalVisible} onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
        <CreateScheduleUnitForm setModalVisible={setModalVisible} />
      </Modal>
    </>
  );
}

export default SchedulesUnit;
