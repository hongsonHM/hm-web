import React, { useState, useEffect } from "react";
import { StyledTable } from "../../assets/styled/table.styled";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent, GlobalDescriptions } from "../../configs/styled.global";
import { Modal, Button, Space, Tag, Tabs } from "antd";
import { friendlyStringMoney } from "../../utils";
import moment from "moment";
import {
  CloudUploadOutlined,
  EditOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  FieldTimeOutlined,
  ClockCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { mergeContractToInitialContract } from "../../utils/contract";
import Descriptions from "../../components/Descriptions";
import { useDispatch } from "react-redux";
import { setCurrentContract } from "../../stores/contractSlice";
import { useHistory } from "react-router-dom";
import { getAllContract } from "../../apis/contract";
import UploadXlsx from "../../components/UploadXlsx";

const { TabPane } = Tabs;

const Contract = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState();
  const [contracts, setContracts] = useState();

  useEffect(() => {
    if (contracts) {
    } else getContractList();
  }, [contracts]);

  const getContractList = async () => {
    const res = await getAllContract();
    console.log(res.data);
    res.data && setContracts(res.data);
  };

  // render status of contract
  // Expiry contract is a contract with 3 months left
  const renderStatus = (status) => {
    switch (status) {
      case "WORKING":
      case "SUCCESS":
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Đã phê duyệt
          </Tag>
        );
      case "PENDING":
        return (
          <Tag icon={<SyncOutlined spin />} color="processing">
            Chờ phê duyệt
          </Tag>
        );
      case "TIMEOUT":
        return (
          <Tag icon={<FieldTimeOutlined />} color="error">
            Sắp đáo hạn
          </Tag>
        );
      case "UNREQUEST":
        return (
          <Tag icon={<ClockCircleOutlined />} color="default">
            Chưa gửi yêu cầu
          </Tag>
        );

      default:
        break;
    }
  };

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "client",
      key: "client",
      render: (client) => (client ? client.customerName.toUpperCase() : "CHƯA CÓ DỮ LIỆU"),
    },
    {
      title: "Giá trị hợp đồng",
      dataIndex: "contractValue",
      key: "contractValue",
      render: (contractValue) => (contractValue ? friendlyStringMoney(contractValue) + " VNĐ" : "Chưa có dữ liệu"),
      sorter: (a, b) => a.contractValue - b.contractValue,
      showSorterTooltip: false,
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      render: (content) => (content ? content.toUpperCase() : "CHƯA CÓ DỮ LIỆU"),
    },
    {
      title: "Bắt đầu",
      dataIndex: "effectiveTimeFrom",
      key: "effectiveTimeFrom",
      render: (effectiveTimeFrom) => moment(effectiveTimeFrom).format("DD/MM/YYYY"),
      sorter: (a, b) => moment(a.effectiveTimeFrom).valueOf() - moment(b.effectiveTimeFrom).valueOf(),
      showSorterTooltip: false,
    },
    {
      title: "Kết thúc",
      dataIndex: "effectiveTimeTo",
      key: "effectiveTimeTo",
      render: (effectiveTimeTo) => moment(effectiveTimeTo).format("DD/MM/YYYY"),
      sorter: (a, b) => moment(a.effectiveTimeTo).valueOf() - moment(b.effectiveTimeTo).valueOf(),
      showSorterTooltip: false,
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status) => renderStatus(status),
      filters: [
        {
          text: "Đã phê duyệt",
          value: "SUCCESS",
        },
        {
          text: "Chờ phê duyệt",
          value: "PENDING",
        },
        {
          text: "Chưa gửi yêu cầu",
          value: "UNREQUEST",
        },
        {
          text: "Hợp đồng đáo hạn",
          value: "TIMEOUT",
        },
      ],
      onFilter: (value, record) => {
        return record.status === value;
      },
    },
    {
      title: "Hành động",
      key: "status",
      dataIndex: "status",
      render: (record, row) => (
        <Space>
          <Button
            onClick={(e) => {
              setSelectedContract(row);
              e.stopPropagation();
              dispatch(setCurrentContract(row));
              history.push(`/edit_contract?cid=${row.id}`);
            }}
            type="primary"
            icon={<EditOutlined />}
          />
          {row.status === "unrequest" && <Button type="primary">Y/C Phê duyệt</Button>}
        </Space>
      ),
    },
  ];

  const redirectToEditContract = () => {
    dispatch(setCurrentContract(selectedContract));
    history.push(`/edit_contract?cid=${selectedContract.id}`);
  };

  return (
    <GlobalContent key="contract">
      <GlobalTitle title="Danh Sách hợp đồng" level={3} color="#3eb8f8" extra={<UploadXlsx />} />

      <StyledTable
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setSelectedContract(record);
              setVisibleModal(true);
            }, // click row
          };
        }}
        columns={columns}
        dataSource={contracts}
        loading={{
          spinning: contracts ? false : true,
          indicator: <LoadingOutlined spin />,
        }}
      />

      {/* Modal
              Handle contents at renderModalContent func      
        */}
      <Modal
        width="80vw"
        title={null}
        visible={visibleModal}
        onOk={() => {
          setVisibleModal(false);
          redirectToEditContract();
        }}
        onCancel={() => setVisibleModal(false)}
        closable={false}
        okText={"Chỉnh sửa hợp đồng"}
        cancelText="Đóng"
        style={{ top: 20 }}
      >
        {selectedContract && selectedContract.client && (
          <GlobalDescriptions labelStyle={{ width: 300 }} bordered column={1} title={"Thông tin khách hàng"}>
            <Descriptions.Item label="Tên khách hàng">{selectedContract.client.customerName || "Chưa có thông tin"}</Descriptions.Item>
            <Descriptions.Item label="Tỉnh/Tp">{selectedContract.client.customerCity || "Chưa có thông tin"}</Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">{selectedContract.client.address || "Chưa có thông tin"}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{selectedContract.client.phoneNumber || "Chưa có thông tin"}</Descriptions.Item>
          </GlobalDescriptions>
        )}
        <br/>
        <Descriptions
          bordered
          column={1}
          title={"Thông tin chi tiết hợp đồng"}
          data={selectedContract && mergeContractToInitialContract(selectedContract)}
          labelStyle={{ width: 300 }}
        />
        <br/>
        {selectedContract && selectedContract.client && (
          <GlobalDescriptions labelStyle={{ width: 300 }} bordered column={1} title={"Chuyển tiếp thông tin"}>
            <Descriptions.Item label="Quản lý cao cấp">{selectedContract.approvedBy || "Chưa có thông tin"}</Descriptions.Item>
            <Descriptions.Item label="Quản lý dịch vụ">{selectedContract.service_manager || "Chưa có thông tin"}</Descriptions.Item>
            <Descriptions.Item label="Các bộ phận tiếp nhận thông tin">{selectedContract.transferTo || "Chưa có thông tin"}</Descriptions.Item>
          </GlobalDescriptions>
        )}
        <br />
      </Modal>
    </GlobalContent>
  );
};

export default Contract;
