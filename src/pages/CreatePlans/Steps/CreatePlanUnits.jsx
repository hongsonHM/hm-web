import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Input, Checkbox } from "antd";
import SelectLaborer from "./SelectLaborer";
import { EditOutlined } from "@ant-design/icons";
import ToggleEditInputStatus from "../../../components/ToggleEditInputStatus";

const TableCheckbox = (props) => {
  const { disabled, type } = props;
  const [value, setValue] = useState();
  return (
    <Checkbox
      style={{ transform: "scale(1.5)" }}
      // type={type || "number"}
      disabled={disabled}
      size="middle"
      value={value}
      onChange={(e) => {
        setValue(e.target.checked);
        props.actions(e.target.checked ? 1 : 0);
      }}
    />
  );
};

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

  const renderCheckboxInTable = (value, record, key, type) => (
    <TableCheckbox
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
      render: (value, record) => (
        <TableInput
          type={"string"}
          actions={(e) => {
            record["startAt"] = e;
            props.setSelectedPlan([...selectedPlan]);
          }}
          disabled={!editStatus || selectedRecord !== record.id}
          value={value || 0}
          record={record}
        />
      ),
    },
    {
      title: "Kết thúc",
      dataIndex: "endAt",
      key: "endAt",
      render: (value, record) => (
        <TableInput
          type={"string"}
          actions={(e) => {
            record["endAt"] = e;
            props.setSelectedPlan([...selectedPlan]);
          }}
          disabled={!editStatus || selectedRecord !== record.id}
          value={value || 0}
          record={record}
        />
      ),
    },
    {
      title: "Đối tượng",
      dataIndex: "coreTask",
      key: "coreTask",
      render: (value) => value.name,
    },
    {
      title: "Hóa chất",
      dataIndex: "coreTask",
      key: "coreTask",
      render: (value) => {
        console.log(value.coreSupplies.filter((supplies) => supplies.category === "Hóa chất"));
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
      render: (value, record) => renderCheckboxInTable(value, record, "mon"),
    },
    {
      title: "T3",
      dataIndex: "tue",
      key: "tue",
      render: (value, record) => renderCheckboxInTable(value, record, "tue"),
    },
    {
      title: "T4",
      dataIndex: "wed",
      key: "wed",
      render: (value, record) => renderCheckboxInTable(value, record, "wed"),
    },
    {
      title: "T5",
      dataIndex: "thu",
      key: "thu",
      render: (value, record) => renderCheckboxInTable(value, record, "thu"),
    },
    {
      title: "T6",
      dataIndex: "fri",
      key: "fri",
      render: (value, record) => renderCheckboxInTable(value, record, "fri"),
    },
    {
      title: "T7",
      dataIndex: "sat",
      key: "sat",
      render: (value, record) => renderCheckboxInTable(value, record, "sat"),
    },
    {
      title: "CN",
      dataIndex: "sun",
      key: "sun",
      render: (value, record) => renderCheckboxInTable(value, record, "sun"),
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
