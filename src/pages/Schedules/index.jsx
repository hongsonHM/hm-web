import React, { useState, useEffect } from "react";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent } from "../../configs/styled.global";
import { Select, Button, Empty, Descriptions, Typography, Modal, Divider, Drawer, Space, message, Tag, Breadcrumb } from "antd";
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
    message.success("???? ti???p nh???n k??? ho???ch!");
  };

  const renderStatus = (active, record) => {
    return ROLES === "SUPERVISOR" ? (
      <Space>
        <Button
          type="primary"
          onClick={(e) => {
            e.stopPropagation();
            onAcceptPlan(record);
          }}
        >
          X??c nh???n
        </Button>
        <Button
          type="primary"
          danger
          onClick={(e) => {
            e.stopPropagation();
            setModalVisible(true);
          }}
        >
          B??o c??o
        </Button>
      </Space>
    ) : (
      <Tag color="success">??ang ch???y</Tag>
    );
  };

  const columns = [
    {
      title: "T??n k??? ho???ch",
      dataIndex: "name",
      key: "name",
      render: (name) => (name ? name.toUpperCase() : "CH??A C?? D??? LI???U"),
    },
    {
      title: "Qu???n l?? d???ch v???",
      dataIndex: "serviceManager",
      key: "serviceManager",
      render: (serviceManager) => (serviceManager ? `${serviceManager.firstName} ${serviceManager.lastName}` : "CH??A C?? D??? LI???U"),
    },
    {
      title: "Gi??m s??t",
      dataIndex: "suppervisor",
      key: "suppervisor",
      render: (suppervisor) => (suppervisor ? `${suppervisor.firstName} ${suppervisor.lastName}` : "CH??A C?? D??? LI???U"),
    },
    {
      title: "H???p ?????ng s???",
      dataIndex: "contractId",
      key: "contractId",
      render: (contractId) => (contractId ? contractId : "CH??A C?? D??? LI???U"),
    },
    {
      title: "Tr???ng th??i",
      key: "active",
      dataIndex: "active",
      render: (active, record) => renderStatus(active, record),
    },
  ];

  const ButtonCreateSchedule = () => (
    <Button danger type="primary" onClick={() => history.push("/create_plans")}>
      + T???o m???i k??? ho???ch
    </Button>
  );

  return (
    <GlobalContent key="create_plan" className="site-drawer-render-in-current-wrapper">
      <GlobalTitle title="Qu???n l?? k??? ho???ch" level={3} color="#3eb8f8" extra={ROLES === "SUPERVISOR" ? null : <ButtonCreateSchedule />} />

      <Select
        showSearch
        placeholder="L???c k??? ho???ch theo h???p ?????ng"
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
      <Typography.Title level={5}>Danh s??ch k??? ho???ch ({schedules && schedules.length})</Typography.Title>
      {selectedContract && (
        <>
          <Divider />
          <Descriptions labelStyle={{ fontWeight: 600 }} column={2} title="Th??ng tin h???p ?????ng">
            <Descriptions.Item label="T??n kh??ch h??ng">{selectedContract.client.customerName}</Descriptions.Item>
            <Descriptions.Item label="?????a ch???">{selectedContract.client.address}</Descriptions.Item>
            <Descriptions.Item label="Ng??y b???t ?????u">{moment(selectedContract.effectiveTimeFrom).format("DD/MM/YYYY")}</Descriptions.Item>
            <Descriptions.Item label="Ng??y k???t th??c">{moment(selectedContract.effectiveTimeTo).format("DD/MM/YYYY")}</Descriptions.Item>
            <Descriptions.Item label="S??? l?????ng ?????i t?????ng">3 Ti???u b??? ph???n - 9 ?????i t?????ng</Descriptions.Item>
            <Descriptions.Item label="S??? l?????ng c??ng">320 c??ng</Descriptions.Item>
            {/* <Descriptions.Item label="N???i dung">{selectedContract.content}</Descriptions.Item> */}
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
              <p>Ch??a c?? k??? ho???ch n??o cho h???p ?????ng n??y!</p>
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
      <Modal footer={null} title="B??o c??o k??? ho???ch t???i QLDV" visible={modalVisible} onOk={() => setModalVisible(false)} onCancel={() => setModalVisible(false)}>
        <ReportPlanForm fetchSchedules={fetchSchedulesById} selectedPlan={selectedPlan} setModalVisible={setModalVisible} />
      </Modal>

      {/* Drawer list all Schedules Unit when selected a Schedule */}
      <Drawer
        title={
          <Breadcrumb>
            <Breadcrumb.Item>K??? ho???ch</Breadcrumb.Item>
            <Breadcrumb.Item>Danh s??ch nhi???m v???</Breadcrumb.Item>
          </Breadcrumb>
        }
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
