import React, { useState } from "react";
import { Table, Button, Input } from "antd"
import ToggleEditInputStatus from "../ToggleEditInputStatus";

function CollapsePanel(props) {
  const { sub } = props;
  const [editStatus, setEditStatus] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const columns = [
    {
      title: "Tên đối tượng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Khối lượng",
      dataIndex: "mass",
      key: "mass",
      render: (mass, record) => (
        <div className="flex__between__center">{<Input disabled={!editStatus || selectedRecord !== record.id} size="middle" value={mass} />}</div>
      ),
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      render: (value, record) => (
        <div className="flex__between__center">{<Input disabled={!editStatus || selectedRecord !== record.id} size="middle" value={value} />}</div>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
      render: (value, record) => (
        <ToggleEditInputStatus
          condition={!(!editStatus || selectedRecord !== record.id)}
          onOk={() => {
            setEditStatus(false);
            setSelectedRecord(null);
          }}
          onCancel={() => {
            setEditStatus(false);
            setSelectedRecord(null);
          }}
          actions={() => {
            setEditStatus(!editStatus);
            setSelectedRecord(record.id);
          }}
        />
      ),
    },
  ];
  return (
    <>
      <Table
        pagination={false}
        dataSource={sub.objects}
        columns={columns}
        locale={{
          emptyText: <span>Vui lòng chọn các đối tượng có trong khu vực!</span>,
        }}
      />
      <div style={{ marginTop: 15 }} className="flex__center__center">
        <Button type="primary" onClick={() => props.setIsModalVisible(true)}>
          Chỉnh sửa đối tượng
        </Button>
        &nbsp;&nbsp;
        <Button type="primary" danger>
          Xóa tiểu bộ phận
        </Button>
      </div>

    </>
  );
}

export default CollapsePanel;
