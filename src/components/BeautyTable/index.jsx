import React, { Fragment, useState } from "react";
import { Button, Col, Space, Modal, Descriptions, Input } from "antd";
import { StyledBeautyTableHeader, StyledBeautyTableBody } from "./styled";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { mockContracts } from "../../configs/mock";
import HandleInput from "../HandleInput";

const { confirm } = Modal;

function BeautyTable(props) {
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState({});
  const [editContractMode, setEditContractMode] = useState(false);

  // handle render content for Modal
  // toggle render between view contract info and delete modal
  const renderModalContent = (contract) => {
    setSelectedContract(contract);
    setVisibleModal(true);
    setEditContractMode(false)
  };

  const renderContents = () => {
    return mockContracts.map((contract) => (
      <StyledBeautyTableBody key={contract.uid} onClick={() => renderModalContent(contract)} justify="center" align="middle">
        <Col span={1}>{contract.uid}</Col>
        <Col span={5}>{contract.customer_name}</Col>
        <Col span={2}>{contract.province}</Col>
        <Col span={4}>{contract.address}</Col>
        <Col span={4} className="flex__center__center flex__column">
          <span>Bắt đầu: {contract.start_at}</span>
          <span>Kết thúc: {contract.end_at}</span>
        </Col>
        <Col span={3}>{contract.total_contract_value}</Col>
        <Col span={3}>{contract.content}</Col>
        <Col span={2}>
          <Space>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedContract(contract)
                setVisibleModal(true)
                setEditContractMode(true)
              }}
              type="primary"
              icon={<EditOutlined />}
            />
          </Space>
        </Col>
      </StyledBeautyTableBody>
    ));
  };

  // render all key and value of a contract
  const renderDescriptionsContract = () => {
    let res = [];
    if (selectedContract)
      for (var key in selectedContract) {
        res.push(
          <Descriptions.Item key={key} label={key}>
            <HandleInput key={selectedContract.uid} editContractMode={editContractMode} value={selectedContract[key]} />
          </Descriptions.Item>
        );
      }
    return res;
  };

  const showDeleteConfirm = (contract) => {
    confirm({
      title: `Xóa Hợp đồng ${contract.customer_name}`,
      icon: <ExclamationCircleOutlined />,
      content: "Hợp đồng này sẽ bị xóa khỏi hệ thống. Vì vậy hãy cân nhắc kĩ khi thực hiện hành động này!",
      okText: "Xác nhận xóa",
      okType: "danger",
      cancelText: "Hủy",
      width: "600px",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <Fragment>
      {/* Default Header table */}
      <StyledBeautyTableHeader>
        <Col span={1}>No. </Col>
        <Col span={5}>Tên KH</Col>
        <Col span={2}>Tỉnh/TP</Col>
        <Col span={4}>Địa chỉ</Col>
        <Col span={4}>Thời gian</Col>
        <Col span={3}>Giá trị hợp đồng</Col>
        <Col span={3}>Nội dung</Col>
        <Col span={2}>Hành động</Col>
      </StyledBeautyTableHeader>
      {renderContents()}

      {/* Modal
            Handle contents at renderModalContent func      
      */}
      <Modal
        width="70vw"
        title={null}
        visible={visibleModal}
        onOk={() => setVisibleModal(false)}
        onCancel={() => setVisibleModal(false)}
        closable={false}
        okText={"Đóng"}
      >
        <Descriptions
          size="default"
          bordered
          column={2}
          title={"Thông tin chi tiết hợp đồng"}
          extra={
            <Space>
              {editContractMode ? (
                <Fragment>
                  <Button type="primary" onClick={() => setEditContractMode(false)}>
                    Lưu thay đổi
                  </Button>
                  <Button danger type="primary" onClick={() => setEditContractMode(false)}>
                    Hủy
                  </Button>
                </Fragment>
              ) : (
                <Button type="primary" onClick={() => setEditContractMode(true)}>
                  <EditOutlined /> Chỉnh sửa hợp đồng
                </Button>
              )}
            </Space>
          }
        >
          {renderDescriptionsContract()}
        </Descriptions>
      </Modal>
    </Fragment>
  );
}

export default BeautyTable;
