import React, { useState } from "react";
import { Table, Button, Input } from "antd";
import ToggleEditInputStatus from "../ToggleEditInputStatus";
import { buildingObjName } from "./mock";

const TableInput = (props) => {
  const { disabled, record } = props;
  const [value, setValue] = useState();
  return (
    <Input
      disabled={disabled}
      size="middle"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        props.actions(e.target.value);
      }}
    />
  );
};

function CollapsePanel(props) {
  const { sub, subDivisions } = props;
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
        <TableInput
          actions={(value) => {
            record.mass = value;
            props.setSubDivisions([...subDivisions]);
          }}
          disabled={!editStatus || selectedRecord !== record.id}
          value={mass || 0}
          record={record}
        />
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
        <TableInput
          actions={(note) => {
            record.note = note;
            props.setSubDivisions([...subDivisions]);
          }}
          disabled={!editStatus || selectedRecord !== record.id}
          value={value}
        />
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
        dataSource={sub.svcSpendTaskDTOs}
        columns={columns}
        locale={{
          emptyText: <span>Vui lòng chọn các đối tượng có trong khu vực!</span>,
        }}
      />
      <div style={{ marginTop: 15 }} className="flex__center__center">
        <Button
          type="primary"
          onClick={() => {
            props.setSelectedId(sub.svcAreaDTO.key);
            props.setIsModalVisible(true);
            props.setCheckedList(buildingObjName(sub.svcSpendTaskDTOs));
            console.log(sub);
          }}
        >
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
