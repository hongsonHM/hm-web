import React, { useState } from "react";
import { Table, Button, Input, Select, Space, message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ToggleEditInputStatus from "../ToggleEditInputStatus";
import { buildingObjName } from "./mock";

const { Option } = Select;
const { confirm } = Modal;

const TableInput = (props) => {
  const { disabled, record } = props;
  const [value, setValue] = useState();
  return (
    <Input
      type="number"
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

const tansuat = [
  { value: "day", label: "	lần/ngày" },
  { value: "week", label: "	lần/tuần" },
  { value: "month", label: "	lần/tháng" },
  { value: "year", label: "	lần/năm" },
];

function CollapsePanel(props) {
  const { sub, subDivisions } = props;
  const [editStatus, setEditStatus] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  function showDeleteConfirm(id) {
    confirm({
      title: "Bạn có thực sự muốn xóa tiểu bộ phận này?",
      icon: <ExclamationCircleOutlined />,
      content: null,
      okText: "Vẫn xóa",
      okType: "danger",
      cancelText: "Thôi",
      width: '450px',
      onOk() {
        deleteCollapsePanel(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const saveRecord = () => {
    setEditStatus(false);
    setSelectedRecord(null);
  };

  const deleteCollapsePanel = (id) => {
    const filteredItems = subDivisions.filter((item) => item.svcAreaDTO.key !== id);
    props.setSubDivisions(filteredItems);
    console.log(filteredItems);
  };

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
          disabled={!editStatus || selectedRecord !== record.coreTask.id}
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
      title: "Tần suất",
      dataIndex: "frequency",
      key: "frequency",
      render: (value, record) => (
        <Space className="flex__between__center">
          <TableInput
            actions={(frequency) => {
              record.frequency = frequency;
              props.setSubDivisions([...subDivisions]);
            }}
            disabled={!editStatus || selectedRecord !== record.coreTask.id}
            value={value}
          />
          <Select
            size="middle"
            style={{ width: 120 }}
            onChange={(e) => {
              record.frequency = `${record.frequency}/${e}`;
              props.setSubDivisions([...subDivisions]);
            }}
            disabled={!editStatus || selectedRecord !== record.coreTask.id}
          >
            {tansuat.map((ts, index) => (
              <Option key={index} value={ts.value}>
                {ts.label}
              </Option>
            ))}
          </Select>
        </Space>
      ),
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
          disabled={!editStatus || selectedRecord !== record.coreTask.id}
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
          condition={!(!editStatus || selectedRecord !== record.coreTask.id)}
          onOk={() => saveRecord()}
          onCancel={() => {
            setEditStatus(false);
            setSelectedRecord(null);
          }}
          actions={() => {
            setEditStatus(!editStatus);
            setSelectedRecord(record.coreTask.id);
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
          }}
        >
          Chỉnh sửa đối tượng
        </Button>
        &nbsp;&nbsp;
        <Button
          type="primary"
          danger
          onClick={() => {
            showDeleteConfirm(sub.svcAreaDTO.key);
          }}
        >
          Xóa tiểu bộ phận
        </Button>
      </div>
    </>
  );
}

export default CollapsePanel;
