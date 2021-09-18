import React, { Fragment, useEffect, useState } from "react";
import { Form, Input, Select, Button, message } from "antd";
import { getUserByRole } from "../../../apis/auth";
import { createSchedule } from "../../../apis/schedules";

const { Option } = Select;

function CreateScheduleForm(props) {
  const {selectedContract} = props
  const [form] = Form.useForm();
  const [serviceManager, setServiceManager] = useState();
  const [humanResourceStaffs, setHumanResourceStaffs] = useState();

  const getServiceManager = async () => {
    const res = await getUserByRole("SERVICE_MANAGER");
    setServiceManager(res.data);
  };
  const getHumanResourceStaff = async () => {
    const res = await getUserByRole("HUMAN_RESOURCE_STAFF");
    setHumanResourceStaffs(res.data);
  };

  useEffect(() => {
    if (!serviceManager) getServiceManager();
  }, [serviceManager]);
  useEffect(() => {
    if (!humanResourceStaffs) getHumanResourceStaff();
  }, [humanResourceStaffs]);

  const onFinish = async (values) => {
    const res = await createSchedule({
      active: true,
      contractId: selectedContract.id,
      name: values.schedulesName,
      serviceManagerId: serviceManager.filter((e) => e.id === values.serviceManager)[0].id,
      defaultSuppervisorId: humanResourceStaffs.filter((e) => e.id === values.defaultSupervisor)[0].id,
    });
    switch (res.status) {
      case 201:
        message.success("Tạo kế hoạch thành công!");
        props.fetchSchedules()
        break;

      default:
        message.error("Có lỗi xảy ra, thử lại sau ít phút!");
        break;
    }
    props.setModalVisible(false);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      name="create_schedule"
      onFinish={onFinish}
      scrollToFirstError
      style={{ width: "100%" }}
    >
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
          onChange={(e) => {
            console.log(humanResourceStaffs[e]);
          }}
        >
          {humanResourceStaffs &&
            humanResourceStaffs.map((manager, i) => (
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
      >
        <Select
          size="large"
          showSearch
          placeholder="Chọn quản lý dịch vụ"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {serviceManager &&
            serviceManager.map((manager, i) => (
              <Option key={i} value={manager.id}>
                {manager.internalUser.firstName + " " + manager.internalUser.lastName}
              </Option>
            ))}
        </Select>
      </Form.Item>
      <Form.Item className="flex__center__center" >
          <Button style={{ width: '100%' }} size="large" type="primary" htmlType="submit">
            Thêm Kế Hoạch
          </Button>
        </Form.Item>
    </Form>
  );
}
export default CreateScheduleForm;
