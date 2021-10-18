import React from "react";
import { Form, Input, Button, message, Select } from "antd";

const reportOptions = [
  {
    label: "Tăng/Giảm nhân sự",
    value: "1",
  },
  {
    label: "Nhân sự báo ốm/vắng",
    value: "2",
  },
  {
    label: "Phát sinh công việc",
    value: "3",
  },
  {
    label: "Báo hỏng, bổ sung CCDC, MM, HC",
    value: "4",
  },
  {
    label: "Điều chỉnh kế hoạch, cách làm",
    value: "5",
  },
  {
    label: "Công, Lương, Chế độ nghiệm thu",
    value: "6",
  },
];

const { Option } = Select;

function ReportPlanForm(props) {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    message.success("Gửi phản hồi thành công!");
    props.setModalVisible(false);
  };

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  return (
    <Form layout="vertical" form={form} name="create_schedule" onFinish={onFinish} scrollToFirstError style={{ width: "100%" }}>
      <Form.Item
        name="reportName"
        label="Chọn vấn đề"
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
          style={{ width: "100%" }}
          placeholder="Chọn 1 vấn đề cần báo cáo"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {reportOptions.map((report) => (
            <Option key={report.value} value={report.value}>
              {report.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="reportContent"
        label="Nội dung"
        rules={[
          {
            required: true,
            message: "",
          },
        ]}
      >
        <Input.TextArea size="large" rows={4} />
      </Form.Item>

      <Form.Item className="flex__center__center">
        <Button style={{ width: "100%" }} size="large" type="primary" htmlType="submit">
          Gửi phản hồi
        </Button>
      </Form.Item>
    </Form>
  );
}
export default ReportPlanForm;
