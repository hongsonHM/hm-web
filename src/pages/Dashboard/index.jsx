import React, { useState, Fragment, useEffect } from "react";
import { Row, Col, Descriptions, Space, Select } from "antd";
import { StyledDashboardRow } from "./styled";
import { GlobalContent, GlobalDescriptions } from "../../configs/styled.global";
import { FieldTimeOutlined, FileSyncOutlined, FundViewOutlined, TeamOutlined, FileDoneOutlined, FileExclamationOutlined } from "@ant-design/icons";
import GlobalTitle from "../../components/GlobalTitle";
import { Line } from "react-chartjs-2";
import { getDashboard } from "../../apis/dashboard";
import { friendlyStringMoney } from "../../utils";

const { Option } = Select;

const Dashboard = (props) => {
  const [filter, setFilter] = useState("monthly");
  const [dataOverview, setDataOverview] = useState({});

  const getDataOverview = async () => {
    const res = await getDashboard();
    console.log(res);
    setDataOverview(res.data);
  };

  useEffect(() => {
    if (!dataOverview) getDataOverview();
  }, [dataOverview]);

  const overview = [
    {
      name: "Nhiệm vụ đang thực hiện",
      value: 8,
      icon: <FileSyncOutlined />,
      className: "processing",
    },
    {
      name: "Nhiệm vụ đã hoàn thành",
      value: 152,
      icon: <FileDoneOutlined />,
      className: "done",
    },
    {
      name: "Nhiệm vụ chậm tiến độ",
      value: 2,
      icon: <FieldTimeOutlined />,
      className: "timeout",
    },
  ];

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
      {
        label: "Nhân sự ( theo tháng )",
        data: [1, 2, 5, 3, 2, 3, 7, 7, 6, 7],
        fill: false,
        borderColor: "rgb(167, 179, 12)",
        tension: 0.1,
      },
      {
        label: "Hợp đồng đáo hạn ( theo tháng )",
        data: [4, 7, 3, 5, 3, 2, 5, 7, 7, 6],
        fill: false,
        borderColor: "rgb(202, 12, 12)",
        tension: 0.1,
      },
    ],
  };

  return (
    <GlobalContent key="dashboard">
      {/* Dashboard */}
      <GlobalTitle title="Thông tin chung" level={3} color="#3eb8f8" />
      <StyledDashboardRow justify="space-around" align="top" gutter={16}>
        {renderDashboardContent()}
      </StyledDashboardRow>

      <Fragment>
        <br />
        <GlobalTitle
          title="Thống kê"
          level={3}
          color="#3eb8f8"
          extra={
            <Select defaultValue="30days" onChange={(value) => {}}>
              <Option value="30days">theo tháng</Option>
              <Option value="60days">theo quý</Option>
            </Select>
          }
        />
        <br />
        <Row className="flex__between__center table_with_chart">
          <Col span={11}>
            <GlobalDescriptions bordered column={1} title={null}>
              <Descriptions.Item label="Tổng số hợp đồng">{dataOverview.totalContract}</Descriptions.Item>
              <Descriptions.Item label="Hợp đồng chuẩn bị đáo hạn">{dataOverview.totalContractWillBeEndIn3Month}</Descriptions.Item>
              <Descriptions.Item label="Hợp đồng đang nợ">2</Descriptions.Item>
              <Descriptions.Item label="Hợp đồng đã dừng">271</Descriptions.Item>
              <Descriptions.Item label="Số hợp đồng mới">{dataOverview.totalContractNew}</Descriptions.Item>
              <Descriptions.Item label="Tổng doanh thu">1010101</Descriptions.Item>
              <Descriptions.Item label="Tổng số nhân viên đang hoạt động">197</Descriptions.Item>
            </GlobalDescriptions>
          </Col>
          <Col span={12}>
            <Line height="350" width="700" data={data} />
          </Col>
        </Row>
      </Fragment>
    </GlobalContent>
  );
};

export default Dashboard;
