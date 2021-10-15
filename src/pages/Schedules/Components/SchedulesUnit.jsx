import React, { useState, useEffect } from "react";
import { Button, Typography, Modal, Checkbox } from "antd";
import { StyledTable } from "../../../assets/styled/table.styled";
import { getAllPlanUnitByPlanId } from "../../../apis/schedules";
import SelectLaborer from "./SelectLaborer";

function SchedulesUnit(props) {
  const { selectedPlan } = props;
  const [planUnits, setPlanUnits] = useState();
  const [modalSelectLabor, setModalSelectLabor] = useState(false);

  const renderValueByText = (value, key) => {
    let day = value[0].workOnDays.split(",").filter((work) => work.includes(key))[0]
    return day ? day.split("-")[1] : 0
  }

  const columns = [
    {
      title: "Vị trí",
      dataIndex: "location",
      key: "location",
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
      render: value => value[0].svcSpendTask.coreTask.name
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
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) => renderValueByText(value, 'mon')
    },
    {
      title: "Thứ 3",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) =>renderValueByText(value, 'tue')
    },
    {
      title: "Thứ 4",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) => renderValueByText(value, 'wed')
    },
    {
      title: "Thứ 5",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) => renderValueByText(value, 'thu')
    },
    {
      title: "Thứ 6",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) => renderValueByText(value, 'fri')
    },
    {
      title: "Thứ 7",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) => renderValueByText(value, 'sat')
    },
    {
      title: "Chủ nhật",
      dataIndex: "svcPlanPartDTOList",
      key: "svcPlanPartDTOList",
      render: (value) => renderValueByText(value, 'sun')
    },
    {
      title: "Nhân công",
      dataIndex: "",
      key: "",
    },
  ];

  const fetchPlanUnits = async () => {
    const res = await getAllPlanUnitByPlanId(selectedPlan.id);
    setPlanUnits(res.data.svcPlanUnitDTOList);
  };

  useEffect(() => {
    fetchPlanUnits();
  }, [selectedPlan]);

  return (
    <>
      <Typography.Title level={5} className="flex__between__center">
        {planUnits && planUnits.length ? `${planUnits.length} nhiệm vụ được hiển thị` : `Không có nhiệm vụ nào!`}
      </Typography.Title>
      <StyledTable
        columns={columns}
        dataSource={planUnits}
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
