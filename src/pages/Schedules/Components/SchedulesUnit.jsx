import React, { useState, useEffect } from "react";
import { Button, Typography, Modal, Checkbox } from "antd";
import { StyledTable } from "../../../assets/styled/table.styled";
import CreateScheduleUnitForm from "./CreateScheduleUnitForm";
import { getAllPlanUnitByPlanId } from "../../../apis/schedules";
import { getCoreTasks } from "../../../apis/contract";
import { getArrayObjectName } from "../../../utils";

const defaultCheckedList = [];
const DEFAULT_SUPPLIES = 48;
const DEFAULT_SUBJECTS = ['Xà phòng', 'Khăn', 'Chổi - Mo hót', 'Xô, giỏ vắt', 'Bàn chải cứng', 'Găng tay']

function SchedulesUnit(props) {
  const { selectedPlan } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [planUnits, setPlanUnits] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [plainOptions, setPlainOptions] = useState();
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [selectedPlanUnit, setSelectedPlanUnit] = useState();
  const [coreTasks, setCoreTasks] = useState();

  const columns = [
    {
      title: "Start time",
      dataIndex: "startAt",
      key: "startAt",
    },
    {
      title: "Đối tượng",
      dataIndex: "tasks",
      key: "tasks",
      render: (value, record) => (
        <div className="flex__between__center">
          {checkedList ? checkedList.length : 0}/117{" "}
          <Button
            type="link"
            onClick={() => {
              setIsModalVisible(true);
              setSelectedPlanUnit(record);
            }}
          >
            Sửa
          </Button>
        </div>
      ),
    },
    {
      title: "Số lượng công",
      dataIndex: "",
      key: "",
      render: () => DEFAULT_SUPPLIES * checkedList.length,
    },
    {
      title: "Vật tư, hóa chất, thiết bị",
      dataIndex: "",
      key: "",
      render: () => checkedList.length && DEFAULT_SUBJECTS.join(", ")
    },
  ];

  const fetchPlanUnits = async () => {
    const res = await getAllPlanUnitByPlanId(selectedPlan.id);
    setPlanUnits(res.data);
  };

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
    console.log(list);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const fetchCoreTasks = async () => {
    const res = await getCoreTasks();
    const planopts = getArrayObjectName(res.data);
    setCoreTasks(res.data);
    setPlainOptions([...new Set(planopts)]);
  };

  useEffect(() => {
    if (!plainOptions) {
      fetchCoreTasks();
    }
  }, [plainOptions]);

  useEffect(() => {
    fetchPlanUnits();
  }, [selectedPlan]);

  useEffect(() => {
    if (checkedList.length) {
      const listTasks = coreTasks.filter((task) => checkedList.includes(task.name));
      console.log(listTasks);
    }
  }, [checkedList]);
  return (
    <>
      <Typography.Title level={5} className="flex__between__center">
        {planUnits && planUnits.length ? `${planUnits.length} nhiệm vụ được hiển thị` : `Không có nhiệm vụ nào!`}
        <Button danger type="primary" onClick={() => setModalVisible(true)}>
          + Thêm mới nhiệm vụ
        </Button>
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
      <Modal footer={null} title="Thêm mới nhiệm vụ" visible={modalVisible} onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
        <CreateScheduleUnitForm fetchPlanUnits={fetchPlanUnits} selectedPlan={selectedPlan} setModalVisible={setModalVisible} />
      </Modal>

      <Modal
        width="80vw"
        title={
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} value={1}>
            Chọn tất cả ({plainOptions && plainOptions.length} đối tượng)
          </Checkbox>
        }
        visible={isModalVisible}
        onOk={() => {
          // const selectetItem = subDivisions.filter((e) => e.id === selectedId)[0];
          // const selectedTasks = coreTasks.filter((task) => checkedList.includes(task.name));
          // selectetItem.svcSpendTaskDTOs = selectedTasks;
          // setSubDivisions([...subDivisions]);
          // props.setCustomValues(Object.assign(customValues, { svcSpendTaskForAreaDTOs: subDivisions }));
          setIsModalVisible(false);
          // setCheckedList([]);
        }}
        onCancel={() => setIsModalVisible(false)}
      >
        <Checkbox.Group
          className="flex__between__center flex__wrap list_objects_contract"
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
          style={{ width: "100%" }}
        />
      </Modal>
    </>
  );
}

export default SchedulesUnit;
