import React, { Fragment, useEffect, useState } from "react";
import { message, Form, Select, DatePicker, Button } from "antd";
import { createPlanUnit } from "../../../apis/schedules";

const { TimeRanges } = DatePicker;
const { Option } = Select;

function CreateScheduleUnitForm(props) {
  const [form] = Form.useForm();

  const onFinish = async (value) => {
    // dispatch(setLoading(true));
    const res = await createPlanUnit(Object.assign(value, { svcPlan: props.selectedPlan }));
    switch (res.status) {
      case 201:
        message.success("Tạo nhiệm vụ thành công!");
        props.fetchPlanUnits();
        break;

      default:
        message.error("Có lỗi xảy ra, thử lại sau ít phút!");
        break;
    }
    props.setModalVisible(false);
  };

  return (
    <Form layout="vertical" form={form} name="create_schedule" onFinish={onFinish} scrollToFirstError style={{ width: "100%" }}>
      <Form.Item
        name="startAt"
        label="Thời gian bắt đầu"
        rules={[
          {
            required: true,
            message: "",
          },
        ]}
      >
        <DatePicker showTime={{ format: "HH:mm" }} format="DD/MM/YYYY HH:mm" onChange={() => {}} onOk={() => {}} size="large" />
      </Form.Item>
      <Form.Item className="flex__center__center">
        <Button style={{ width: "100%" }} size="large" type="primary" htmlType="submit">
          Thêm Nhiệm Vụ
        </Button>
      </Form.Item>
    </Form>
  );
}
export default CreateScheduleUnitForm;
