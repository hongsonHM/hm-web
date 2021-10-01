import React, { useState, useEffect, Fragment } from "react";
import { Input, Button, Form, DatePicker, Upload, Select, Checkbox, message, Steps, Row, Col, Descriptions } from "antd";
import { UploadOutlined, UserOutlined, SolutionOutlined, SendOutlined, FormatPainterOutlined, ProfileOutlined } from "@ant-design/icons";
import { StyledContractForm } from "./styled";
import Modal from "antd/lib/modal/Modal";
import AddClientForm from "./AddClientForm";
import FormContents from "./FormContents";
import moment from "moment";
import AddObjectStep from "./AddObjectStep";
import ConfirmContract from "./ConfirmContract";
import { GlobalDescriptions } from "../../configs/styled.global";
import { getPreviewSupplies } from "../../apis/contract";

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

const orgGroups = [
  {
      "id": 2,
      "name": "Phòng Nhân Sự"
  },
  {
      "id": 3,
      "name": "Phòng Kinh Doanh"
  },
  {
      "id": 4,
      "name": "Phòng Cung Ứng"
  },
  {
      "id": 5,
      "name": "Phòng Giám Sát"
  }
]

const plainOptions = ["Phòng Kinh Doanh", "Phòng Nhân Sự", "Phòng Cung Ứng", "Phòng Giám Sát"];
const defaultCheckedList = ["Phòng Kinh Doanh", "Phòng Nhân Sự", "Phòng Cung Ứng", "Phòng Giám Sát"];
const { Step } = Steps;

const ContractForm = (props) => {
  const { cid, customers, serviceManager, businessManager, client, contract } = props;
  const [form] = Form.useForm();
  const [current, setCurrent] = React.useState(0);
  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState();
  const [customValues, setCustomValues] = useState({
    status: "PENDING",
    ownerBy: {
      id: 1,
    },
  });
  const [formContent, setFormContent] = useState();
  const [previewSupplies, setPreviewSupplies] = useState();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const cleanSpendTaskDTO = (data) => {
    return data;
  };

  const onFinish = async (formData) => {
    let cloneObj = Object.assign(formData, customValues);
    delete cloneObj["svcSpendTaskForAreaDTOs"];
    const newData = {
      svcContractDTO: cloneObj,
      svcSpendTaskForAreaDTOs: cleanSpendTaskDTO(customValues.svcSpendTaskForAreaDTOs),
    };
    const res = await props.actions(
      cid,
      // Object.assign(formData, { durationMonth: caculatorMonths, client: selectedCustomer, status: status, approvedBy: approveBy, ownerBy: { id: 1 } })
      newData
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
    if (client) setSelectedClient(client);
  }, [client]);

  const steps = [
    {
      title: "Thông tin khách hàng",
      icon: <UserOutlined />,
      content: (
        <Fragment>
          <Form.Item label={"Chọn khách hàng"} name={"customerName"} key={"customerName"}>
            {/* <Input onChange={(e) => updateClient("customerName", e.target.value)} /> */}
            <Select
              showSearch
              placeholder="Chọn khách hàng"
              optionFilterProp="children"
              onChange={(e) => {
                const selected = customers.filter((c) => c.id === e)[0];
                setSelectedClient({ ...selected });
                setCustomValues({ ...Object.assign(customValues, { client: selected }) });
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
          {selectedClient && (
            <GlobalDescriptions style={{ width: "80%", margin: "0 auto 20px" }} labelStyle={{ width: 300 }} bordered column={1} title={"Thông tin khách hàng"}>
              <Descriptions.Item label="Tên khách hàng">{selectedClient.customerName || "Chưa có thông tin"}</Descriptions.Item>
              <Descriptions.Item label="Tỉnh/Tp">{selectedClient.customerCity || "Chưa có thông tin"}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">{selectedClient.address || "Chưa có thông tin"}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">{selectedClient.phoneNumber || "Chưa có thông tin"}</Descriptions.Item>
              <Descriptions.Item label="Mô hình">{selectedClient.type || "Chưa có thông tin"}</Descriptions.Item>
            </GlobalDescriptions>
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
      title: "Thêm tiểu bộ phận",
      icon: <FormatPainterOutlined />,
      content: <AddObjectStep customValues={customValues} setCustomValues={setCustomValues} />,
    },
    {
      title: "Xác nhận thông tin",
      icon: <ProfileOutlined />,
      content: (
        <ConfirmContract
          selectedClient={selectedClient}
          contract={props.contract}
          setCurrent={setCurrent}
          customValues={customValues}
          previewSupplies={previewSupplies}
        />
      ),
    },
    {
      title: "Chuyển tiếp thông tin",
      icon: <SendOutlined />,
      content: (
        <Fragment>
          <Form.Item label="Quản lý cao cấp phê duyệt" name="approveBy" valuePropName="checked">
            <CheckboxGroup
              onChange={(checkedValues) => {
                setCustomValues(Object.assign(customValues, { approveBy: businessManager.filter((manager) => checkedValues.includes(manager.id)) }));
                // console.log(customValues);
              }}
            >
              <Row gutter={[8, 16]}>
                {businessManager.map((c, i) => (
                  <Col span={8} key={c.id}>
                    <Checkbox value={c.id}>{c.internalUser.firstName + " " + c.internalUser.lastName}</Checkbox>
                  </Col>
                ))}
              </Row>
            </CheckboxGroup>
          </Form.Item>
          <Form.Item label="Quản lý dịch vụ" name="managerBy" valuePropName="checked">
            <CheckboxGroup
              onChange={(checkedValues) => {
                // setCheckedSubjectList(checkedValues);
                setCustomValues(Object.assign(customValues, { managerBy: serviceManager.filter((manager) => checkedValues.includes(manager.id)) }));
              }}
            >
              <Row gutter={[8, 16]}>
                {serviceManager.map((c, i) => (
                  <Col span={8} key={c.id}>
                    <Checkbox value={c.id}>{c.internalUser.firstName + " " + c.internalUser.lastName}</Checkbox>
                  </Col>
                ))}
              </Row>
            </CheckboxGroup>
          </Form.Item>
          <Form.Item label="Bộ phận tiếp nhận" name="notificationUnits" valuePropName="checked">
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              onChange={(list) => {
                setCustomValues(Object.assign(customValues, { notificationUnits: orgGroups.filter((group, index) => list.includes(group.name) ) }));
                setCheckedList(list);
              }}
            />
          </Form.Item>
        </Fragment>
      ),
    },
  ];

  const fetchPreviewSupplies = async () => {
    if (customValues.svcSpendTaskForAreaDTOs) {
      const data = await getPreviewSupplies({
        svcContractDTO: formContent,
        svcSpendTaskForAreaDTOs: customValues.svcSpendTaskForAreaDTOs,
      });

      setPreviewSupplies(data.data);
    }
  };

  return (
    <StyledContractForm>
      <Steps current={current}>
        {steps.map((item, index) => (
          <Step icon={item.icon} key={item.title} title={item.title} />
        ))}
      </Steps>
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 17 }}
        layout={"horizontal"}
        form={form}
        initialValues={{
          layout: "horizontal",
          effectiveTimeFrom:
            props.contract && props.contract["effectiveTimeFrom"].value ? moment(props.contract && props.contract["effectiveTimeFrom"].value) : null,
          effectiveTimeTo: props.contract && props.contract["effectiveTimeTo"].value ? moment(props.contract && props.contract["effectiveTimeTo"].value) : null,
        }}
        size="large"
        onFinish={onFinish}
        onFinishFailed={() => setCurrent(1)}
        onValuesChange={(e, formData) => setFormContent(formData)}
      >
        <FormContents
          fetchPreviewSupplies={fetchPreviewSupplies}
          customValues={customValues}
          setCustomValues={setCustomValues}
          steps={steps}
          current={current}
          next={next}
          prev={prev}
        />
      </Form>

      <Modal footer={null} title="Thêm mới khách hàng" visible={modalVisible} onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
        <AddClientForm customValues={customValues} setModalVisible={setModalVisible} setCustomValues={setCustomValues} />
      </Modal>
    </StyledContractForm>
  );
};

export default ContractForm;
