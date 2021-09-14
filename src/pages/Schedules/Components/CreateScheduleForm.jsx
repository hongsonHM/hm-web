import React, { Fragment, useEffect, useState } from "react";
import { Form, Input, Select, Button } from "antd";
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
    // dispatch(setLoading(true));
    const res = await createSchedule({
      active: true,
      contract: selectedContract,
      schedulesName: values.schedulesName,
      serviceManager: serviceManager.filter((e) => e.id === values.serviceManager)[0],
      defaultSupervisor: humanResourceStaffs.filter((e) => e.id === values.defaultSupervisor)[0],
    });
    console.log(res);
    switch (res.status) {
      // Success login
      case 201:
        props.onFinish(res.data);
        // dispatch(setLoading(false));
        break;

      default:
        // dispatch(setLoading(false));
        // message.error("Có lỗi xảy ra, thử lại sau ít phút!");
        break;
    }
    props.setModalVisible(false);
    props.setCustomValues(Object.assign(props.customValues, { client: values }));
  };

  return (
    <Form
      // submit_text="TẠO MỚI KẾ  HOẠCH"
      // type="create_schedule"

      layout="vertical"
      // size="large"
      // {...layout}
      form={form}
      name="create_schedule"
      onFinish={onFinish}
      // action={onSubmit}
      scrollToFirstError
      style={{ width: "100%" }}
      // labelCol={labelCol}
      // wrapperCol={wrapperCol}
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
