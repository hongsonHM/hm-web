import React, { useState, useEffect } from "react";
import { Button, Typography, Modal, Checkbox, Table } from "antd";
import { StyledTable } from "../../../assets/styled/table.styled";
import { getAllPlanUnitByPlanId } from "../../../apis/schedules";
import SelectLaborer from "./SelectLaborer";

function SchedulesUnit(props) {
  const { selectedPlan } = props;
  const [planUnits, setPlanUnits] = useState();
  const [modalSelectLabor, setModalSelectLabor] = useState(false);

  const renderValueByText = (value, key) => {
    let day = value[0].workOnDays.split(",").filter((work) => work.includes(key))[0];
    return <Checkbox style={{ transform: "scale(1.5)" }} checked={day ? true : false} disabled={day ? false : true} />;
  };

  const fetchPlanUnits = async () => {
    const res = await getAllPlanUnitByPlanId(selectedPlan.id);
    setPlanUnits(res.data.svcPlanUnitDTOList);
  };

  const columns = [
    {
      title: "Vị trí",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: value =>  value[0].svcSpendTask.svcGroupTask.svcArea.name
    },
    {
      title: "Bắt đầu",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) => value[0].startAt,
    },
    {
      title: "Kết thúc",
      dataIndex: "endAt",
      key: "endAt",
    },
    {
      title: "Đối tượng",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) => value[0].svcSpendTask.coreTask.name,
    },
    {
      title: "Hóa chất",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) => {
        return value[0].svcSpendTask.coreTask.coreSupplies
          .filter((supplies) => supplies.category === "Hóa chất")
          .reduce((a, b) => a + b.effort * 1, 0)
          .toFixed(3);
      },
    },
    {
      title: "Máy móc",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) =>
        value[0].svcSpendTask.coreTask.coreSupplies
          .filter((supplies) => supplies.category === "Máy móc, thiết bị")
          .reduce((a, b) => a + b.effort * 1, 0)
          .toFixed(3),
    },
    {
      title: "CCDC",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) =>
        value[0].svcSpendTask.coreTask.coreSupplies
          .filter((supplies) => supplies.category === "Công cụ, vật tư")
          .reduce((a, b) => a + b.effort * 1, 0)
          .toFixed(3),
    },
    {
      title: "Công",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) =>
        value[0].svcSpendTask.coreTask.coreSupplies
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
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) => renderValueByText(value, "mon"),
    },
    {
      title: "T3",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) => renderValueByText(value, "tue"),
    },
    {
      title: "T4",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) => renderValueByText(value, "wed"),
    },
    {
      title: "T5",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) => renderValueByText(value, "thu"),
    },
    {
      title: "T6",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) => renderValueByText(value, "fri"),
    },
    {
      title: "T7",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) => renderValueByText(value, "sat"),
    },
    {
      title: "Chủ nhật",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) => renderValueByText(value, "sun"),
    },
    {
      title: "Nhân công",
      dataIndex: "",
      key: "",
    },
  ];

  useEffect(() => {
    fetchPlanUnits();
  }, [selectedPlan]);

  return (
    <>
      <Typography.Title level={5} className="flex__between__center">
        {planUnits && planUnits.length ? `${planUnits.length} nhiệm vụ được hiển thị` : `Không có nhiệm vụ nào!`}
      </Typography.Title>
      <Table
        columns={columns}
        dataSource={planUnits}
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

export default SchedulesUnit;
