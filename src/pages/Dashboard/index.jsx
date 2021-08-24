import React, { useState, Fragment } from "react";
import { Row, Col, Descriptions, Space, Select } from "antd";
import { StyledDashboardRow } from "./styled";
import { GlobalContent, GlobalDescriptions } from "../../configs/styled.global";
import { FieldTimeOutlined, FileSyncOutlined, FundViewOutlined, TeamOutlined, DollarCircleOutlined, FileExclamationOutlined } from "@ant-design/icons";
import GlobalTitle from "../../components/GlobalTitle";
import { Line } from "react-chartjs-2";
import { dashboardByTimes } from "../../configs/mock";
const { Option } = Select;

const Dashboard = (props) => {
  const [employee, setEmployee] = useState(dashboardByTimes["7days"].employee);
  const [turnover, setTurnover] = useState(dashboardByTimes["7days"].turnover);
  const [expire, setExpire] = useState(dashboardByTimes["7days"].expire);
  const overview = [
    // {
    //   name: "Nhiệm vụ đang thực hiện",
    //   value: 8,
    //   icon: <FileSyncOutlined />,
    //   className: "processing",
    // },
    // {
    //   name: "Nhiệm vụ đã hoàn thành",
    //   value: 152,
    //   icon: <FileDoneOutlined />,
    //   className: "done",
    // },
    // {
    //   name: "Nhiệm vụ chậm tiến độ",
    //   value: 2,
    //   icon: <FieldTimeOutlined />,
    //   className: "timeout",
    // },
    {
      name: "Số nhân công đang hoạt động",
      value: employee,
      icon: <TeamOutlined />,
      className: "processing",
    },
    {
      name: "Tổng doanh thu",
      value: turnover,
      icon: <DollarCircleOutlined />,
      className: "done",
    },
    {
      name: "Số hợp đồng đáo hạn",
      value: expire,
      icon: <FieldTimeOutlined />,
      className: "timeout",
    },
  ];

  const handleChangeDashboard = (value) => {
    setEmployee(dashboardByTimes[value].employee);
    setTurnover(dashboardByTimes[value].turnover);
    setExpire(dashboardByTimes[value].expire);
  };

  const renderDashboardContent = () => {
    return overview.map((item, index) => (
      <Col className={`overview_item flex__start__center ${item.className}`} span={7} key={index}>
        <div className="overview_icon">{item.icon}</div>
        <div className="overview_content">
          <div className="overview_number">
            {/* <CountUp delay={0.5} start={0} end={item.value} /> */}
            <span>{item.value}</span>
          </div>
          <div className="overview_name">{item.name}</div>
        </div>
      </Col>
    ));
  };

  const data = {
    labels: ["10/2020", "11/2020", "12/2020", "1/2021", "2/2021", "3/2021", "4/2021", "5/2021", "6/2021", "7/2021"],
    datasets: [
      {
        label: "Số hợp đồng đã kí ( theo tháng )",
        data: [3, 4, 5, 5, 4, 6, 7, 6, 8, 9],
        fill: false,
        borderColor: "rgb(8, 127, 196)",
        tension: 0.1,
      },
      {
        label: "Số hợp đồng đã hoàn thành ( theo tháng )",
        data: [2, 3, 3, 4, 5, 4, 5, 7, 5, 6],
        fill: false,
        borderColor: "rgb(12, 133, 62)",
        tension: 0.1,
      },
    ],
  };

  return (
    <GlobalContent key="dashboard">
      {/* Dashboard */}
      <GlobalTitle
        title="Thông tin chung"
        level={3}
        color="#3A6351"
        extra={
          <Select defaultValue="7days" onChange={(value) => handleChangeDashboard(value)}>
            <Option value="7days">7 ngày trước</Option>
            <Option value="30days">30 ngày trước</Option>
            <Option value="60days">60 ngày trước</Option>
            <Option value="90days">90 ngày trước</Option>
          </Select>
        }
      />
      <StyledDashboardRow justify="space-around" align="top" gutter={16}>
        {renderDashboardContent()}
      </StyledDashboardRow>
      <br />
      <GlobalTitle title="Thống kê" level={3} color="#3A6351" />
      <br />
      <Row className="flex__between__center table_with_chart">
        <Col span={12}>
          <GlobalDescriptions
            bordered
            column={1}
            title={<Fragment>
              <FundViewOutlined /> Thống kê hợp đồng
            </Fragment>}
          >
            <Descriptions.Item label="Tổng số hợp đồng">71</Descriptions.Item>
            <Descriptions.Item label="Hợp đồng chuẩn bị đáo hạn">4</Descriptions.Item>
            <Descriptions.Item label="Hợp đồng đang nợ">2</Descriptions.Item>
            <Descriptions.Item label="Hợp đồng đã dừng">271</Descriptions.Item>
            <Descriptions.Item label="Số hợp đồng mới">89</Descriptions.Item>
            <Descriptions.Item label="Tổng doanh thu">1.334.881.000 VNĐ</Descriptions.Item>
          </GlobalDescriptions>
        </Col>
        <Col span={12}>
          <Line height="350" width="700" data={data} />
        </Col>
      </Row>
      <br />
      <Space className="flex__start__start">
        <GlobalDescriptions bordered column={1} title={<Fragment>
              <TeamOutlined /> Thống kê nhân công
            </Fragment>}>
          <Descriptions.Item label="Tổng số nhân công">205</Descriptions.Item>
          <Descriptions.Item label="Tổng số nhân công đang hoạt động">166</Descriptions.Item>
        </GlobalDescriptions>
      </Space>
    </GlobalContent>
  );
};

export default Dashboard;
