import React, { useState, useEffect } from "react";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent, GlobalDescriptions } from "../../configs/styled.global";
import { Button, Descriptions, Divider, message, Typography, Collapse, Table } from "antd";
import { getContractById, getPreviewSupplies } from "../../apis/contract";
import { initialContract } from "../../configs/contract";

const { Panel } = Collapse;

const ContractDetails = (props) => {
  const cid = new URLSearchParams(window.location.search).get("cid");
  const [contract, setContract] = useState();
  const [subAreas, setSubAreas] = useState();
  const [client, setClient] = useState();
  const [supplies, setSupplies] = useState();

  const fetchPreview = async (data) => {
    const response = await getPreviewSupplies(data);
    setSupplies(response.data);
  };

  const fetchContract = async () => {
    const response = await getContractById(cid);
    if (response.status === 201) {
      setContract(response.data.svcContractDTO);
      setSubAreas(response.data.svcSpendTaskForAreaDTOs);
      setClient(response.data.svcContractDTO.client);
      fetchPreview(response.data);
    } else message.error("Không có hợp đồng này, vui lòng thử lại!");
  };

  useEffect(() => {
    if (cid) fetchContract();
  }, [cid]);

  const columns = [
    {
      title: "Tên đối tượng",
      dataIndex: "coreTask",
      key: "coreTask",
      render: (value) => value.name,
    },
    {
      title: "Khối lượng",
      dataIndex: "mass",
      key: "mass",
    },
    {
      title: "Đơn vị",
      dataIndex: "coreTask",
      key: "coreTask",
      render: (value) => value.unit,
    },
    {
      title: "Tần suất",
      dataIndex: "frequency",
      key: "frequency",
      render: (value) => `${value.split("/")[0]} lần / ${value.split("/")[1]}`,
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
    },
  ];

  const columnSuplies = [
    {
      title: "TT",
      dataIndex: "index",
      key: "index",
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Tên vật tư/hóa chất",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Khối lượng",
      dataIndex: "effort",
      key: "effort",
    },
  ];

  return (
    <GlobalContent key="contract_details">
      <GlobalTitle title="Thông tin hợp đồng" level={3} color="#3eb8f8" />
      <br />
      <div>
        {client && (
          <GlobalDescriptions labelStyle={{ width: 300 }} bordered column={1} title="Thông tin khách hàng">
            <Descriptions.Item label="Tên khách hàng">{client.customerName || "Chưa có thông tin"}</Descriptions.Item>
            <Descriptions.Item label="Tỉnh/Tp">{client.customerCity || "Chưa có thông tin"}</Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">{client.address || "Chưa có thông tin"}</Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">{client.phoneNumber || "Chưa có thông tin"}</Descriptions.Item>
            <Descriptions.Item label="Mô hình">{client.type || "Chưa có thông tin"}</Descriptions.Item>
          </GlobalDescriptions>
        )}
        <Divider />

        {contract && (
          <GlobalDescriptions labelStyle={{ width: 300 }} bordered column={1} title="Thông tin hợp đồng">
            {Object.keys(initialContract).map((item, index) => (
              <Descriptions.Item key={index} label={initialContract[item].label}>
                {contract[item] || (
                  <Typography.Text type="danger" italic>
                    Chưa có thông tin
                  </Typography.Text>
                )}
              </Descriptions.Item>
            ))}
          </GlobalDescriptions>
        )}

        <Divider />
        <GlobalDescriptions labelStyle={{ width: 300 }} bordered column={1} title="Danh sách tiểu bộ phận"></GlobalDescriptions>
        {subAreas &&
          subAreas.map((area) => (
            <Collapse style={{ marginBottom: 15 }} onChange={() => {}}>
              <Panel header={area.svcAreaDTO.name} key="1">
                <Table
                  bordered
                  pagination={false}
                  dataSource={area.svcSpendTaskDTOs}
                  columns={columns}
                  locale={{
                    emptyText: <span>Vui lòng chọn các đối tượng có trong khu vực!</span>,
                  }}
                />
              </Panel>
            </Collapse>
          ))}

        <Divider />
        <GlobalDescriptions labelStyle={{ width: 300 }} bordered column={1} title="Danh sách hao phí vật tư"></GlobalDescriptions>
        {supplies && (
          <Table
            pagination={false}
            dataSource={supplies}
            columns={columnSuplies}
            locale={{
              emptyText: <span>Chưa có dữ liệu!</span>,
            }}
          />
        )}

        <Divider />
        {contract && (
          <GlobalDescriptions labelStyle={{ width: 300 }} bordered column={1} title="Bộ phận tiếp nhận">
            <Descriptions.Item label="Quản lý cao cấp">
              {contract.approveBy[0].firstName} {contract.approveBy[0].lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Quản lý dịch vụ">
              {contract.managerBy[0].firstName} {contract.managerBy[0].lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Bộ phận tiếp nhận">Phòng kinh doanh - Phòng cung ứng - Phòng nhân sự</Descriptions.Item>
            <Descriptions.Item label="Người tạo">
              {contract.ownerBy.firstName} {contract.ownerBy.lastName}
            </Descriptions.Item>
          </GlobalDescriptions>
        )}
      </div>

      <br/>
      <div className="flex__center__center">
        <Button type="primary" size="large">Chỉnh sửa hợp đồng</Button>
      </div>
      
      <br/>
    </GlobalContent>
  );
};

export default React.memo(ContractDetails);
