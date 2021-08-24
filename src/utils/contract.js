import React from "react";
import { initialContract } from "../configs/contract";
import { DatePicker, Select, Form, Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;

export const mergeContractToInitialContract = (contract) => {
  const newContract = Object.assign({}, initialContract)
  for (let key in newContract) {
    if (newContract.hasOwnProperty(key)) {
      newContract[key].value = contract[key];
    }
  }
  return newContract;
};

export const renderFormItemByInitalContract = (contract) => {
  let res = [];
  for (let key in contract) {
    if (contract.hasOwnProperty(key)) {
      switch (contract[key].type) {
        case DatePicker:
          res.push(
            <Form.Item label={contract[key].label} name={key} key={key}>
              <DatePicker
                format={"DD/MM/YYYY"}
                onChange={(date, dateString) => {
                  contract[key].value = dateString;
                }}
              />
            </Form.Item>
          );
          break;

        case File:
          res.push(
            <Form.Item label={contract[key].label} name={key} key={key} valuePropName="PDF">
              <Upload name="file" action="/upload.do" listType="pdf">
                <Button icon={<UploadOutlined />}>Tải lên file PDF hoặc Docx</Button>
              </Upload>
            </Form.Item>
          );
          break;

        case Select:
          res.push(
            <Form.Item initialValue="hn" label={contract[key].label} name={key} key={key}>
              <Select onChange={(val) => (contract[key].value = val)}>
                <Option value="hn">TP.Hà Nội</Option>
                <Option value="hcm">TP.Hồ Chí Minh</Option>
                <Option value="dn">TP.Đà Nẵng</Option>
                <Option value="hp">TP.Hải Phòng</Option>
                <Option value="mars">Sao Hỏa</Option>
              </Select>
            </Form.Item>
          );
          break;

        default:
          res.push(
            <Form.Item initialValue={contract[key].value} label={contract[key].label} name={key} key={key}>
              <Input onChange={(e) => (contract[key].value = e.target.value)} />
            </Form.Item>
          );
          break;
      }
    }
  }
  return res;
};
