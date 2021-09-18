import React, { useState, useEffect } from "react";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent } from "../../configs/styled.global";
import { Select, Button, Empty, Descriptions, Typography, Modal, Divider, Drawer, Space } from "antd";
import { getAllContract } from "../../apis/contract";
import { StyledTable } from "../../assets/styled/table.styled";
import { LoadingOutlined } from "@ant-design/icons";
import { mockSchedules } from "./mock";
import SwitchStatus from "./Components/SwitchStatus";
import moment from "moment";
import CreateScheduleForm from "./Components/CreateScheduleForm";
import SchedulesUnit from "./Components/SchedulesUnit";
import { getAllSchedulesByContractId } from "../../apis/schedules";

const { Option } = Select;
const Schedules = (props) => {
  const [contracts, setContracts] = useState();
  const [selectedContract, setSelectedContract] = useState();
  const [schedules, setSchedules] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState();

  // Get all contract by status = SUCCESS
  const fetchContracts = async () => {
    const response = await getAllContract();
    setContracts(response.data);
  };

  // get all schedules of a contract
  const fetchSchedules = async () => {
    const response = await getAllSchedulesByContractId(selectedContract.id);
    setSchedules(response.data);
  };

  useEffect(() => {
    if (!contracts) {
      fetchContracts();
    }
  }, [contracts]);

  useEffect(() => {
    if (selectedContract) {
      fetchSchedules();
    }
  }, [selectedContract]);

  const columns = [
    {
      title: "Tên kế hoạch",
      dataIndex: "name",
      key: "name",
      render: (name) => (name ? name.toUpperCase() : "CHƯA CÓ DỮ LIỆU"),
    },
    {
      title: "Quản lý dịch vụ",
      dataIndex: "serviceManager",
      key: "serviceManager",
      render: (serviceManager) => (serviceManager ? serviceManager.name.toUpperCase() : "CHƯA CÓ DỮ LIỆU"),
    },
    {
      title: "Giám sát",
      dataIndex: "defaultSupervisor",
      key: "defaultSupervisor",
      render: (defaultSupervisor) => (defaultSupervisor ? defaultSupervisor.name.toUpperCase() : "CHƯA CÓ DỮ LIỆU"),
    },
    {
      title: "Trạng thái",
      key: "active",
      dataIndex: "active",
      render: (active) => {
        return <SwitchStatus checked={active} />;
      },
      filters: [
        {
          text: "Đang hoạt động",
          value: true,
        },
        {
          text: "Không hoạt động",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        return record.active === value;
      },
    },
  ];

  const ButtonCreateSchedule = () => (
    <Button danger type="primary" disabled={selectedContract ? false : true} onClick={() => setModalVisible(true)}>
      + Tạo mới kế hoạch
    </Button>
  );

  return (
    <GlobalContent key="create_plan" className="site-drawer-render-in-current-wrapper">
      <GlobalTitle title="Quản lý kế hoạch" level={3} color="#3eb8f8" extra={<ButtonCreateSchedule />} />

      {/* Search and select Contract before create plan */}
      <Select
        showSearch
        placeholder="Chọn 1 hợp đồng"
        optionFilterProp="children"
        onChange={(e) => {
          setSelectedContract(contracts.filter((c) => c.id === e)[0]);
          // console.log(contracts.filter((c) => c.id === e)[0]);
        }}
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        size="large"
        style={{ width: "100%" }}
      >
        {contracts &&
          contracts.map((contract, i) => (
            <Option key={contract.id} value={contract.id}>
              {contract.client.customerName}
            </Option>
          ))}
      </Select>
      {selectedContract ? (
        <>
          <Divider />
          <Descriptions labelStyle={{ fontWeight: 600 }} column={2} title="Thông tin hợp đồng">
            <Descriptions.Item label="Tên khách hàng">{selectedContract.client.customerName}</Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">{selectedContract.client.address}</Descriptions.Item>
            <Descriptions.Item label="Ngày bắt đầu">{moment(selectedContract.effectiveTimeFrom).format("DD/MM/YYYY")}</Descriptions.Item>
            <Descriptions.Item label="Ngày kết thúc">{moment(selectedContract.effectiveTimeTo).format("DD/MM/YYYY")}</Descriptions.Item>
            <Descriptions.Item label="Số lượng đối tượng">3 Tiểu bộ phận - 9 đối tượng</Descriptions.Item>
            <Descriptions.Item label="Số lượng công">320 công</Descriptions.Item>
            {/* <Descriptions.Item label="Nội dung">{selectedContract.content}</Descriptions.Item> */}
          </Descriptions>
          <Divider />
          <Typography.Title level={5}>Danh sách kế hoạch ({schedules && schedules.length})</Typography.Title>
          <StyledTable
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setSelectedPlan(record);
                  // setSelectedContract(record);
                  setDrawerVisible(true);
                }, // click row
              };
            }}
            columns={columns}
            dataSource={schedules}
            locale={{
              emptyText: (
                <>
                  <p>Chưa có kế hoạch nào cho hợp đồng này!</p>
                  <ButtonCreateSchedule />
                </>
              ),
            }}
            loading={{
              spinning: contracts ? false : true,
              indicator: <LoadingOutlined spin />,
            }}
          />
        </>
      ) : (
        <Empty description="Chọn một hợp đồng để bắt đầu" />
      )}

      {/* Modal add new Schedules */}
      <Modal footer={null} title="Thêm mới kế hoạch" visible={modalVisible} onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
        <CreateScheduleForm fetchSchedules={fetchSchedules} selectedContract={selectedContract} setModalVisible={setModalVisible} />
      </Modal>

      {/* Drawer list all Schedules Unit when selected a Schedule */}
      <Drawer
        title="Danh sách nhiệm vụ"
        placement="right"
        closable={true}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        getContainer={false}
        style={{ position: "absolute" }}
        width={"100%"}
      >
        {selectedPlan && <SchedulesUnit selectedPlan={selectedPlan} />}
      </Drawer>
    </GlobalContent>
  );
};

export default Schedules;
