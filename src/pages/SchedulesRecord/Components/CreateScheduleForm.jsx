import React, { Fragment, useEffect, useState } from "react";
import { Input, Form, Select } from "antd";
import RegistrationForm from "../../../components/RegistrationForm";
import { getUserByRole } from "../../../apis/auth";

const { Option } = Select;

function CreateScheduleForm(props) {
  const [serviceManager, setServiceManager] = useState();

  const getServiceManager = async () => {
    const res = await getUserByRole("SERVICE_MANAGER");
    setServiceManager(res.data);
  };

  useEffect(() => {
    if(!serviceManager) getServiceManager()
  }, [serviceManager]);

  return (
    <RegistrationForm
      submit_text="TẠO MỚI KẾ  HOẠCH"
      contents={
        <Fragment>
          <Form.Item
            name="schedulesName"
            label="Tên kế hoạch"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input size="large" placeholder="Tên kế hoạch" />
          </Form.Item>
          <Form.Item
            name="defaultSupervisor"
            label="Giám sát"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Select
              size="large"
              showSearch
              placeholder="Chọn người giám sát"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {serviceManager && serviceManager.map((manager, i) => (
                <Option key={i} value={manager.id}>
                  {manager.internalUser.firstName + " " + manager.internalUser.lastName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="serviceManager"
            label="Quản lý dịch vụ"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
            initialValue="Service Manager User 001"
          >
            <Input disabled size="large" placeholder="Tên khách hàng" />
          </Form.Item>
        </Fragment>
      }
      type="create_schedule"
      onFinish={(res) => {
        props.setModalVisible(false);
        props.setCustomValues(Object.assign(props.customValues, { client: res }));
      }}
    />
  );
}
export default CreateScheduleForm;
