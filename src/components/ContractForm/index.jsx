import React, { useState, useEffect, Fragment } from "react";
import { Input, Button, Form, DatePicker, Upload, Select, Checkbox, message, Steps, Row, Col } from "antd";
import { UploadOutlined, UserOutlined, SolutionOutlined, SendOutlined, FormatPainterOutlined } from "@ant-design/icons";
import { StyledContractForm } from "./styled";
import Modal from "antd/lib/modal/Modal";
import AddClientForm from "./AddClientForm";
import FormContents from "./FormContents";
import moment from "moment";

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

const plainOptions = ["Nhân viên cung ứng", "Nhân sự"];
const defaultCheckedList = ["Nhân viên cung ứng", "Nhân sự"];
const subjectOptions = ["Bồn rửa mặt", "Bồn cầu", "Gương", "Sàn nhà", "Cửa kính", "Quạt trần", "Cây cảnh"];
const defaultSubjectCheckedList = [];
const { Step } = Steps;

const ContractForm = (props) => {
  const { cid, customers, serviceManager, businessManager } = props;
  const [form] = Form.useForm();
  const [client, setClient] = useState();
  const [current, setCurrent] = React.useState(0);
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [checkedSubjectList, setCheckedSubjectList] = useState(defaultSubjectCheckedList);
  const [modalVisible, setModalVisible] = useState(false);
  const [customValues, setCustomValues] = useState({
    status: "PENDING",
    ownerBy: {
      id: 1,
    },
  });

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = async (formData) => {
    const keyToDelete = ["address", "customerCity", "customerName", "phoneNumber", "type"];
    keyToDelete.forEach((key) => delete formData[key]);
    console.log(formData);
    const res = await props.actions(
      cid,
      // Object.assign(formData, { durationMonth: caculatorMonths, client: selectedCustomer, status: status, approvedBy: approveBy, ownerBy: { id: 1 } })
      Object.assign(formData, customValues)
    );
    switch (res.status) {
      case 200:
      case 201:
        {
          message.success("Tạo hợp đồng thành công!");
        }
        break;

      default:
        message.error("Vui lòng điền đầy đủ thông tin!");
        break;
    }
  };

  const renderFormItemByInitalContract = () => {
    let res = [];
    for (let key in props.contract) {
      if (props.contract.hasOwnProperty(key)) {
        switch (props.contract[key].type) {
          case DatePicker:
            res.push(
              <Form.Item
                label={props.contract[key].label}
                name={key}
                key={key}
                rules={[
                  {
                    required: props.contract[key].required,
                    message: "Trường này không được để trống",
                  },
                ]}
              >
                <DatePicker
                  format={"YYYY/MM/DD"}
                  onChange={(date, dateString) => {
                    props.contract[key].value = dateString;
                    const time_from = props.contract["effectiveTimeFrom"].value;
                    const time_to = props.contract["effectiveTimeTo"].value;
                    if (time_from && time_to) {
                      console.log(time_from);
                      setCustomValues(
                        Object.assign(customValues, { durationMonth: moment(time_to).diff(moment(time_from), "months"), year: time_from.split("/")[0] })
                      );
                    }
                  }}
                />
              </Form.Item>
            );
            break;

          case File:
            res.push(
              <Form.Item label={props.contract[key].label} name={key} key={key} valuePropName="PDF">
                <Upload name="file" action="/upload.do" listType="pdf">
                  <Button icon={<UploadOutlined />}>Tải lên file PDF hoặc Docx</Button>
                </Upload>
              </Form.Item>
            );
            break;

          case Number:
          case "Year":
            break;

          default:
            res.push(
              <Form.Item
                initialValue={props.contract[key].value}
                label={props.contract[key].label}
                name={key}
                key={key}
                rules={[
                  {
                    required: props.contract[key].required,
                    message: "Trường này không được để trống",
                  },
                ]}
              >
                <Input onChange={(e) => (props.contract[key].value = e.target.value)} />
              </Form.Item>
            );
            break;
        }
      }
    }
    return res;
  };

  useEffect(() => {
    if (props.client) setClient(props.client);
  }, [props]);

  // useEffect(() => {
  //   // console.log(customValues);
  // }, [customValues]);

  const steps = [
    {
      title: "Thông tin khách hàng",
      icon: <UserOutlined />,
      content: client && (
        <Fragment>
          <Form.Item label={"Chọn khách hàng"} name={"customerName"} key={"customerName"}>
            {/* <Input onChange={(e) => updateClient("customerName", e.target.value)} /> */}
            <Select
              showSearch
              placeholder="Chọn khách hàng"
              optionFilterProp="children"
              onChange={(e) => {
                const newObj = Object.assign(customValues, { client: customers.filter((c) => c.id === e)[0] });
                setCustomValues({ ...newObj });
              }}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {customers.map((c, i) => (
                <Option key={c.id} value={c.id}>
                  {c.customerName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {customValues.client && (
            <Fragment>
              <Form.Item initialValue={customValues.client.customerCity} label={"Tỉnh/TP"} name={"customerCity"} key={"customerCity"}>
                <Input disabled />
              </Form.Item>
              <Form.Item initialValue={customValues.client.address} label={"Địa chỉ"} name={"address"} key={"address"}>
                <Input disabled />
              </Form.Item>
              <Form.Item initialValue={customValues.client.phoneNumber} label={"Số điện thoại"} name={"phoneNumber"} key={"phoneNumber"}>
                <Input disabled />
              </Form.Item>
              <Form.Item initialValue={customValues.client.type} label={"Mô hình"} name={"type"} key={"type"}>
                <Input disabled />
              </Form.Item>
            </Fragment>
          )}
          <div className="flex__center__center">
            <Button type="primary" onClick={() => setModalVisible(true)}>
              + Tạo mới khách hàng
            </Button>
          </div>
          <br />
        </Fragment>
      ),
    },
    {
      title: "Thông tin hợp đồng",
      icon: <SolutionOutlined />,
      content: renderFormItemByInitalContract(),
    },
    {
      title: "Thêm vật tư/đối tượng",
      icon: <FormatPainterOutlined />,
      content: (
        <Fragment>
          <Form.Item label="Chọn danh sách vật tư" name="list_subject" valuePropName="checked">
            <CheckboxGroup
              options={subjectOptions}
              value={checkedSubjectList}
              onChange={(list) => {
                setCheckedSubjectList(list);
              }}
            />
          </Form.Item>
        </Fragment>
      ),
    },
    {
      title: "Chuyển tiếp thông tin",
      icon: <SendOutlined />,
      content: (
        <Fragment>
          <Form.Item label="Quản lý cao cấp phê duyệt" name="request_admin" valuePropName="checked">
            <CheckboxGroup
              onChange={(checkedValues) => {
                setCustomValues(Object.assign(customValues, { approveBy: serviceManager.filter((manager) => checkedValues.includes(manager.id)) }));
                // console.log(customValues);
              }}
            >
              <Row gutter={[8, 16]}>
                {serviceManager.map((c, i) => (
                  <Col span={8} key={c.id}>
                    <Checkbox value={c.id}>{c.deviceId}</Checkbox>
                  </Col>
                ))}
              </Row>
            </CheckboxGroup>
          </Form.Item>
          <Form.Item label="Quản lý dịch vụ" name="request_admin" valuePropName="checked">
            <CheckboxGroup
              onChange={(checkedValues) => {
                setCheckedSubjectList(checkedValues);
              }}
            >
              <Row gutter={[8, 16]}>
                {serviceManager.map((c, i) => (
                  <Col span={8} key={c.id}>
                    <Checkbox value={c.id}>{c.deviceId}</Checkbox>
                  </Col>
                ))}
              </Row>
            </CheckboxGroup>
          </Form.Item>
          <Form.Item label="Bộ phận tiếp nhận" name="request_admin" valuePropName="checked">
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              onChange={(list) => {
                setCustomValues(Object.assign(customValues, { staff_relation: list }));
                setCheckedList(list);
              }}
            />
          </Form.Item>
        </Fragment>
      ),
    },
  ];

  return (
    <StyledContractForm>
      <Steps current={current}>
        {steps.map((item, index) => (
          <Step onClick={() => setCurrent(index)} icon={item.icon} key={item.title} title={item.title} />
        ))}
      </Steps>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 17 }}
        layout={"horizontal"}
        form={form}
        initialValues={{ layout: "horizontal" }}
        size="large"
        onFinish={onFinish}
        onFinishFailed={() => setCurrent(1)}
        // onValuesChange={onFormLayoutChange} // not working :D ????
      >
        <FormContents steps={steps} current={current} next={next} prev={prev} />
      </Form>

      <Modal footer={null} title="Thêm mới khách hàng" visible={modalVisible} onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
        <AddClientForm customValues={customValues} setModalVisible={setModalVisible} setCustomValues={setCustomValues} />
      </Modal>
    </StyledContractForm>
  );
};

export default ContractForm;
