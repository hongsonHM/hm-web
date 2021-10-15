import React, { Fragment, useEffect, useState } from "react";
import { getUserByRole } from "../../../apis/auth";
import { Select } from "antd";

const { Option } = Select;

function TransferTo(props) {
  const [serviceManager, setServiceManager] = useState();
  const [supervisors, setSupervisors] = useState();
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

  return (
    <div className="flex__start__start flex__column">
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

export default TransferTo;
