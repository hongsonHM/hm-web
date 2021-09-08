import React, { Fragment, useEffect, useState } from "react";
import { Input, Form, Select, DatePicker } from "antd";
import RegistrationForm from "../../../components/RegistrationForm";
import { getUserByRole } from "../../../apis/auth";
import { mockLaborer } from '../mock'

const { RangePicker } = DatePicker;
const { Option } = Select;

function CreateScheduleUnitForm(props) {
  const [serviceManager, setServiceManager] = useState();

  const getServiceManager = async () => {
    const res = await getUserByRole("SERVICE_MANAGER");
    setServiceManager(res.data);
  };

  useEffect(() => {
    if (!serviceManager) getServiceManager();
  }, [serviceManager]);

  return (
    <RegistrationForm
      submit_text="TẠO MỚI KẾ  HOẠCH"
      contents={
        <Fragment>
          <Form.Item
            name="start_at"
            label="Thời gian"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <RangePicker showTime={{ format: "HH:mm" }} format="DD/MM/YYYY HH:mm" onChange={() => {}} onOk={() => {}} />
          </Form.Item>
          <Form.Item
            name="laborer"
            label="Nhân công"
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
              placeholder="Chọn một nhân công"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {mockLaborer && mockLaborer.map((laborer, i) => (
                <Option key={i} value={laborer.id}>
                  {laborer.name + " - " + laborer.phone}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Fragment>
      }
      type="create_schedule_unit"
      onFinish={(res) => {
        props.setModalVisible(false);
        props.setCustomValues(Object.assign(props.customValues, { client: res }));
      }}
    />
  );
}
export default CreateScheduleUnitForm;
