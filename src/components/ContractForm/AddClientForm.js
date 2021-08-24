import React, { Fragment } from "react";
import { locale } from "../../configs/local";
import { Input, Form, Select } from "antd";
import RegistrationForm from "../RegistrationForm";

const { Option } = Select;

const typeOptions = [
  {
    key: "building",
    label: "Tòa nhà (C.Cư, Tòa VP)",
  },
  {
    key: "hospital",
    label: "Bệnh viện",
  },
  {
    key: "school",
    label: "Trường học",
  },
  {
    key: "industrial_area",
    label: "Khu công nghiệp",
  },
  {
    key: "other",
    label: "Khác",
  },
];

function AddClientForm(props) {
  return (
    <RegistrationForm
      submit_text="Tạo mới khách hàng"
      contents={
        <Fragment>
          <Form.Item
            name="customerName"
            label="Tên khách hàng"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input size="large" placeholder="Tên khách hàng" />
          </Form.Item>
          <Form.Item
            name="customerCity"
            label="Tỉnh/TP"
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
              placeholder="Chọn Tỉnh/TP"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {locale.map((c, i) => (
                <Option key={i} value={c}>
                  {c}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input size="large" placeholder="Địa chỉ" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input size="large" placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Mô hình"
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
              placeholder="Chọn mô hình"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {typeOptions.map((c, i) => (
                <Option key={c.key} value={c.key}>
                  {c.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Fragment>
      }
      type="create_client"
      large
      onFinish={(res) => {
        props.setModalVisible(false);
        props.setCustomValues(Object.assign(props.customValues, { client: res }));
      }}
    />
  );
}
export default AddClientForm;
