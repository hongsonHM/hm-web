import React, { Fragment, useEffect, useState } from "react";
import { getContractById, getCoreTasks } from "../../../apis/contract";
import { getUserByRole } from "../../../apis/auth";
import { Radio, Tabs, Row, Col, Checkbox, Typography, Divider, Input, Select } from "antd";

const { TabPane } = Tabs;
const { Option } = Select;

function CreatePlan(props) {
  const { selectedContract, selectedPlan } = props;
  const [subAreas, setSubAreas] = useState();
  const [coreTasks, setCoreTasks] = useState();
  const [value, setValue] = useState();
  const [serviceManager, setServiceManager] = useState();
  const [supervisors, setSupervisors] = useState();
  // get all schedules of a contract
  const fetchSchedules = async () => {
    const response = await getContractById(selectedContract.id);
    setSubAreas(response.data.svcSpendTaskForAreaDTOs);
  };

  useEffect(() => {
    if (selectedContract) {
      fetchSchedules();
    }
  }, [selectedContract]);

  const fetchCoreTasks = async () => {
    const res = await getCoreTasks();
    setCoreTasks(res.data);
  };

  useEffect(() => {
    if (!coreTasks) {
      fetchCoreTasks();
    }
  }, [coreTasks]);

  const getServiceManager = async () => {
    const res = await getUserByRole("SERVICE_MANAGER");
    setServiceManager(res.data);
  };

  useEffect(() => {
    if (!serviceManager) getServiceManager();
  }, [serviceManager]);

  const getSupervisors = async () => {
    const res = await getUserByRole("SUPERVISOR");
    setSupervisors(res.data);
  };

  useEffect(() => {
    if (!supervisors) getSupervisors();
  }, [supervisors]);

  function onChange(checkedValues) {
    console.log(
      "checked = ",
      coreTasks.filter((task) => checkedValues.includes(task.id))
    );
    props.setSelectedPlan(coreTasks.filter((task) => checkedValues.includes(task.id)));
  }

  const friendlyPlan = (plan, id) => {
    plan.forEach((element) => (element.location = subAreas.filter((area) => area.svcAreaDTO.id === id)[0].svcAreaDTO.name));
    return plan;
  };

  return (
    <div className="flex__start__start flex__column">
      <Input onChange={(e) => props.setPlanName(e.target.value)} style={{ width: "100%" }} size="large" placeholder="Tên kế hoạch" />
      <br />
      <Tabs tabPosition="left" defaultActiveKey="1" onChange={() => {}}>
        <TabPane tab="Chọn tiểu bộ phận" key="1">
          <Radio.Group
            onChange={(e) => {
              setValue(e.target.value);
              const plans = subAreas.filter((area) => e.target.value === area.svcAreaDTO.id)[0].svcSpendTaskDTOs;
              props.setSelectedPlan(friendlyPlan(plans, e.target.value));
            }}
            value={value}
          >
            {subAreas
              ? subAreas.map((area, index) => (
                  <Radio key={index} value={area.svcAreaDTO.id}>
                    {area.svcAreaDTO.name}
                  </Radio>
                ))
              : "Hợp đồng không có tiểu bộ phận! "}
          </Radio.Group>
        </TabPane>
        <TabPane tab="Chọn đối tượng" key="2">
          <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
            <Row>
              {coreTasks &&
                coreTasks.map((task, index) => (
                  <Col key={task.id} span={8}>
                    <Checkbox value={task.id}>{task.name}</Checkbox>
                  </Col>
                ))}
            </Row>
          </Checkbox.Group>
        </TabPane>
      </Tabs>
      <br />
      <Select
        style={{ width: "100%" }}
        size="large"
        showSearch
        placeholder="Chọn quản lý dịch vụ"
        optionFilterProp="children"
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={(e) => {
          props.setSelectedManager(serviceManager.filter((manager) => e === manager.id)[0]);
        }}
      >
        {serviceManager &&
          serviceManager.map((manager, i) => (
            <Option key={i} value={manager.id}>
              {manager.internalUser.firstName + " " + manager.internalUser.lastName}
            </Option>
          ))}
      </Select>
      <br />
      <Select
        style={{ width: "100%" }}
        size="large"
        showSearch
        placeholder="Chọn người giám sát"
        optionFilterProp="children"
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        onChange={(e) => {
          props.setSelectedSupervisor(supervisors.filter((manager) => e === manager.id)[0]);
        }}
      >
        {supervisors &&
          supervisors.map((manager, i) => (
            <Option key={i} value={manager.id}>
              {manager.internalUser.firstName + " " + manager.internalUser.lastName}
            </Option>
          ))}
      </Select>
    </div>
  );
}

export default CreatePlan;
