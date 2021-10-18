import React, { useState, useEffect } from "react";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent } from "../../configs/styled.global";
import { Select, Button, Empty, Descriptions, Typography, Modal, Divider, Drawer, Space, message, Tag } from "antd";
import { getContractByStatus } from "../../apis/contract";
import { StyledTable } from "../../assets/styled/table.styled";
import { LoadingOutlined } from "@ant-design/icons";
import SwitchStatus from "./Components/SwitchStatus";
import moment from "moment";
import ReportPlanForm from "./Components/CreateScheduleForm";
import SchedulesUnit from "./Components/SchedulesUnit";
import { getAllSchedulesByContractId, getAllSchedules, updatePlan } from "../../apis/schedules";
import { useHistory } from "react-router-dom";

const { Option } = Select;
const ROLES = localStorage.roles;
const Schedules = (props) => {
  let history = useHistory();
  const [contracts, setContracts] = useState();
  const [selectedContract, setSelectedContract] = useState();
  const [schedules, setSchedules] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState();

  // Get all contract by status = SUCCESS
  const fetchContracts = async () => {
    const response = await getContractByStatus("SUCCESS");
    setContracts(response.data);
  };

  // get all schedules of a contract
  const fetchSchedulesById = async () => {
    const response = await getAllSchedulesByContractId(selectedContract.id);
    setSchedules(response.data);
  };

  // get all schedules of a contract
  const fetchSchedules = async () => {
    const response = await getAllSchedules();
    setSchedules(response.data);
  };

  useEffect(() => {
    if (!contracts) {
      fetchContracts();
    }
  }, [contracts]);

  useEffect(() => {
    if (selectedContract) {
      fetchSchedulesById();
    } else fetchSchedules();
  }, [selectedContract]);

  const onAcceptPlan = async (record) => {
    const response = await updatePlan(record.id, { id: record.id, active: true });
    record.active = true;
    message.success("Đã tiếp nhận kế hoạch!");
  };

  const renderStatus = (active, record) => { 
    // switch (active) {
    //   case 'SUCCESS':
        
    //     break;
    
    //   default:
    //     break;
    // }
    return ROLES === "SUPERVISOR" ? (
      <Space>
        <Button
          type="primary"
          onClick={(e) => {
            e.stopPropagation();
            onAcceptPlan(record);
          }}
        >
          Xác nhận
        </Button>
        <Button
          type="primary"
          danger
          onClick={(e) => {
            e.stopPropagation();
            setModalVisible(true);
          }}
        >
          Báo cáo
        </Button>
      </Space>
    ) : (
      <Tag color="success">Đang chạy</Tag>
    );
  }

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
      render: (serviceManager) => (serviceManager ? `${serviceManager.firstName} ${serviceManager.lastName}` : "CHƯA CÓ DỮ LIỆU"),
    },
    {
      title: "Giám sát",
      dataIndex: "suppervisor",
      key: "suppervisor",
      render: (suppervisor) => (suppervisor ? `${suppervisor.firstName} ${suppervisor.lastName}` : "CHƯA CÓ DỮ LIỆU"),
    },
    {
      title: "Hợp đồng số",
      dataIndex: "contractId",
      key: "contractId",
      render: (contractId) => (contractId ? contractId : "CHƯA CÓ DỮ LIỆU"),
    },
    {
      title: "Trạng thái",
      key: "active",
      dataIndex: "active",
      render: (active, record) => renderStatus(active, record) 
    },
  ];

  const ButtonCreateSchedule = () => (
    <Button danger type="primary" onClick={() => history.push("/create_plans")}>
      + Tạo mới kế hoạch
    </Button>
  );

  return (
    <GlobalContent key="create_plan" className="site-drawer-render-in-current-wrapper">
      <GlobalTitle title="Quản lý kế hoạch" level={3} color="#3eb8f8" extra={ROLES === "SUPERVISOR" ? null : <ButtonCreateSchedule />} />

      <Select
        showSearch
        placeholder="Lọc kế hoạch theo hợp đồng"
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
              {contract.client.customerName} - {contract.documentId}
            </Option>
          ))}
      </Select>

      <Divider />
      <Typography.Title level={5}>Danh sách kế hoạch ({schedules && schedules.length})</Typography.Title>
      {selectedContract && (
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
        </>
      )}
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
        rowKey="id"
        columns={columns}
        dataSource={schedules}
        locale={{
          emptyText: (
            <>
              <p>Chưa có kế hoạch nào cho hợp đồng này!</p>
              {ROLES === "SUPERVISOR" ? null : <ButtonCreateSchedule />}
            </>
          ),
        }}
        loading={{
          spinning: contracts ? false : true,
          indicator: <LoadingOutlined spin />,
        }}
      />

      {/* Modal add new Schedules */}
      <Modal footer={null} title="Báo cáo kế hoạch tới QLDV" visible={modalVisible} onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
        <ReportPlanForm fetchSchedules={fetchSchedulesById} selectedPlan={selectedPlan} setModalVisible={setModalVisible} />
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
