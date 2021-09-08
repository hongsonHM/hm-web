import React, { useState } from "react";
import { Button, Typography, Modal } from "antd";
import { StyledTable } from "../../assets/styled/table.styled";
import GlobalTitle from "../../components/GlobalTitle";
import { mockScheduleUnits, mockLaborer } from "./mock";
import CreateScheduleUnitForm from "./Components/CreateScheduleUnitForm";
import SwitchStatus from "./Components/SwitchStatus";
import { GlobalContent } from "../../configs/styled.global";

function SchedulesRecord(props) {
  const [modalVisible, setModalVisible] = useState(false);
  console.log('Here');
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
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (phone, record) => mockLaborer.filter(laborer => laborer.name === record.labor)[0].phone
    },
    {
      title: "Trạng thái",
      key: "active",
      dataIndex: "active",
      render: (active) => {
        return <SwitchStatus checked={active} />;
      },
      filters: [
        {
          text: "Đang hoạt động",
          value: true,
        },
        {
          text: "Không hoạt động",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        return record.active === value;
      },
    },
  ];

  return (
    <GlobalContent key="create_plan" className="site-drawer-render-in-current-wrapper">
      <GlobalTitle
        title="Quản lý nhiệm vụ"
        level={3}
        color="#3eb8f8"
        extra={
          <Button type="primary" >
            Cập nhật
          </Button>
        }
      />
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
    </GlobalContent>
  );
}

export default React.memo(SchedulesRecord);
