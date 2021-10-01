import React, { useState, useEffect } from "react";
import { StyledTable } from "../../assets/styled/table.styled";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent, GlobalDescriptions } from "../../configs/styled.global";
import { Modal, Button, message } from "antd";
import { friendlyStringMoney } from "../../utils";
import moment from "moment";
import Descriptions from "../../components/Descriptions";
import { mergeContractToInitialContract } from "../../utils/contract";
import { getAllContract, partialUpdateSvcContract } from "../../apis/contract";
import { LoadingOutlined } from "@ant-design/icons";

const approvedBy = {
  id: 2,
};

const RequestAdmin = (props) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState();
  const [contracts, setContracts] = useState();

  useEffect(() => {
    if (!contracts) {
      getContractList();
    }
  }, [contracts]);

  const getContractList = async () => {
    const res = await getAllContract();
    setContracts(res.data.filter((r) => r.status === "UNREQUEST"));
  };

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Giá trị hợp đồng",
      dataIndex: "contractValue",
      key: "contractValue",
      render: (contractValue) => contractValue && friendlyStringMoney(contractValue) + " VNĐ",
      sorter: (a, b) => a.contractValue - b.contractValue,
      showSorterTooltip: false,
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Bắt đầu",
      dataIndex: "effectiveTimeFrom",
      key: "effectiveTimeFrom",
      render: (effectiveTimeFrom) => moment(effectiveTimeFrom).format("DD/MM/YYYY"),
      sorter: (a, b) => a.effectiveTimeFrom - b.effectiveTimeFrom,
      showSorterTooltip: false,
    },
    {
      title: "Kết thúc",
      dataIndex: "effectiveTimeTo",
      key: "effectiveTimeTo",
      render: (effectiveTimeTo) => moment(effectiveTimeTo).format("DD/MM/YYYY"),
      sorter: (a, b) => a.effectiveTimeTo - b.effectiveTimeTo,
      showSorterTooltip: false,
    },
    {
      title: "Hành động",
      key: "actions",
      dataIndex: "actions",
      render: (status, row) => (
        <Button
          onClick={async (e) => {
            e.stopPropagation();
            console.log(row);
            console.log(Object.assign(row, { approvedBy: approvedBy, status: "PENDING" }));
            const res = await partialUpdateSvcContract(row.id, Object.assign(row, { approvedBy: approvedBy, status: "PENDING" }));
            console.log(res);
            switch (res.status) {
              case 200:
              case 201:
                message.success("Gửi yêu cầu phê duyệt thành công!");
                getContractList();
                break;

              default:
                message.error("Bạn không có quyền thực hiện hành động này!");
                break;
            }
          }}
          type="primary"
        >
          Yêu cầu phê duyệt
        </Button>
      ),
    },
  ];

  return (
    <GlobalContent key="request_admin">
      <GlobalTitle title="Yêu cầu phê duyệt hợp đồng" level={3} color="#3eb8f8" />
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
        width="70vw"
        title={null}
        visible={visibleModal}
        onOk={async () => {
          const res = await partialUpdateSvcContract(selectedContract.id, Object.assign(selectedContract, { approvedBy: approvedBy, status: "PENDING" }));
          switch (res.status) {
            case 200:
            case 201:
              message.success("Gửi yêu cầu phê duyệt thành công!");
              getContractList();
              break;

            default:
              message.error("Bạn không có quyền thực hiện hành động này!");
              break;
          }

          setVisibleModal(false);
        }}
        onCancel={() => setVisibleModal(false)}
        closable={false}
        okText={"Gửi yêu cầu"}
        cancelText="Hủy"
        style={{ top: 20 }}
      >
        {selectedContract && selectedContract.client && (
          <GlobalDescriptions bordered column={2} title={"Thông tin khách hàng"}>
            <Descriptions.Item label="Tên khách hàng">{selectedContract.client.customerName || "Chưa có thông tin"}</Descriptions.Item>
            <Descriptions.Item label="Tỉnh/Tp">{selectedContract.client.customerCity || "Chưa có thông tin"}</Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">{selectedContract.client.address || "Chưa có thông tin"}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{selectedContract.client.phoneNumber || "Chưa có thông tin"}</Descriptions.Item>
          </GlobalDescriptions>
        )}
        <br />
        <Descriptions
          size="default"
          column={2}
          title={"Thông tin chi tiết hợp đồng"}
          data={selectedContract && mergeContractToInitialContract(selectedContract)}
        />
      </Modal>
    </GlobalContent>
  );
};

export default RequestAdmin;
