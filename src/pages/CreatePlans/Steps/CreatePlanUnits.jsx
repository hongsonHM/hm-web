import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Input } from "antd";
import SelectLaborer from "./SelectLaborer";
import { EditOutlined } from "@ant-design/icons";
import ToggleEditInputStatus from "../../../components/ToggleEditInputStatus";

const TableInput = (props) => {
  const { disabled, type } = props;
  const [value, setValue] = useState();
  return (
    <Input
      style={{ width: type === "string" ? 100 : 35 }}
      type={type || "number"}
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

function CreatePlanUnits(props) {
  const { selectedPlan } = props;
  const [modalSelectLabor, setModalSelectLabor] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const renderInputInTable = (value, record, key, type) => (
    <TableInput
      type={type}
      actions={(e) => {
        record[key] = e;
        props.setSelectedPlan([...selectedPlan]);
      }}
      disabled={!editStatus || selectedRecord !== record.id}
      value={value || 0}
      record={record}
    />
  );

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
      render: (value, record) => renderInputInTable(value, record, "startAt", "string"),
    },
    {
      title: "Kết thúc",
      dataIndex: "endAt",
      key: "endAt",
      render: (value, record) => renderInputInTable(value, record, "endAt", "string"),
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
      render: (value, record) => renderInputInTable(value, record, "mon"),
    },
    {
      title: "Thứ 3",
      dataIndex: "tue",
      key: "tue",
      render: (value, record) => renderInputInTable(value, record, "tue"),
    },
    {
      title: "Thứ 4",
      dataIndex: "wed",
      key: "wed",
      render: (value, record) => renderInputInTable(value, record, "wed"),
    },
    {
      title: "Thứ 5",
      dataIndex: "thu",
      key: "thu",
      render: (value, record) => renderInputInTable(value, record, "thu"),
    },
    {
      title: "Thứ 6",
      dataIndex: "fri",
      key: "fri",
      render: (value, record) => renderInputInTable(value, record, "fri"),
    },
    {
      title: "Thứ 7",
      dataIndex: "sat",
      key: "sat",
      render: (value, record) => renderInputInTable(value, record, "sat"),
    },
    {
      title: "Chủ nhật",
      dataIndex: "sun",
      key: "sun",
      render: (value, record) => renderInputInTable(value, record, "sun"),
    },
    {
      title: "Nhân công",
      dataIndex: "",
      key: "",
      render: () => (
        <>
          0
          <Button type="link" size="small" className="btn--right" onClick={() => setModalSelectLabor(true)}>
            Chi tiết
          </Button>
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (value, record) => (
        <ToggleEditInputStatus
          condition={!(!editStatus || selectedRecord !== record.id)}
          onOk={() => saveRecord()}
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

  const saveRecord = () => {
    setEditStatus(false);
    setSelectedRecord(null);
  };

  return (
    <>
      {/* <Typography.Title level={5} className="flex__between__center">
        {planUnits && planUnits.length ? `${planUnits.length} nhiệm vụ được hiển thị` : `Không có nhiệm vụ nào!`}
        <Button danger type="primary" onClick={() => setIsModalVisible(true)}>
          + Thêm mới nhiệm vụ
        </Button>
      </Typography.Title> */}
      <Table
        columns={columns}
        dataSource={selectedPlan}
        rowKey="id"
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
      <Modal
        width={"50vw"}
        footer={null}
        title="Nhân công"
        visible={modalSelectLabor}
        onOk={() => setModalSelectLabor(false)}
        onCancel={() => setModalSelectLabor(false)}
      >
        <SelectLaborer setModalSelectLabor={setModalSelectLabor} />
      </Modal>
    </>
  );
}

export default CreatePlanUnits;
