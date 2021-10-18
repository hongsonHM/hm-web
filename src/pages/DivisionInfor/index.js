import React, { useState, Fragment, useEffect } from "react";
import { Row, Col, Descriptions, List, Select, Button, Input, Card, Modal, Typography } from "antd";
import { StyledDashboardRow } from "./styled";
import { GlobalContent, GlobalDescriptions } from "../../configs/styled.global";
import { FieldTimeOutlined, FileSyncOutlined, FileTextOutlined, FileDoneOutlined } from "@ant-design/icons";
import GlobalTitle from "../../components/GlobalTitle";
import { Line } from "react-chartjs-2";
import { getDashboard } from "../../apis/dashboard";
import { friendlyStringMoney } from "../../utils";

const { TextArea } = Input;
const { Option } = Select;

const reports = [
  {
    id: 1,
    title: "Báo cáo kế hoạch hoạt động tháng 7",
    sender: "Phòng kinh doanh",
  },
  {
    id: 2,
    title: "Báo cáo doanh thu tháng 7",
    sender: "Phòng kinh doanh",
  },
  {
    id: 3,
    title: "Báo cáo kế hoạch hoạt động tháng 6",
    sender: "Phòng kinh doanh",
  },
];

const mock = [
  {
    id: 1,
    title: "Tái ký hợp đồng Argibank",
    time: "03/10/2021 - 17/10/2021",
    content:
      "Làm việc với Agribank Trung Hòa về việc gia hạn hợp đồng từ 25/10. Mời khách hàng tham gia ký theo phương thức mới. Hẹn lịch đo lường khối lượng đối lượng  thực tế chuyển cho QLDV.",
    partner: "NNTH - NH Đầu tư phát triển Argibank",
    type: "Tái ký",
  },
  {
    id: 2,
    title: "Tái ký hợp đồng Techcombank",
    time: "29/10/2021 - 05/11/2021",
    content:
      "Làm việc với Tech NT Thập về việc gia hạn hợp đồng từ 29/10. Mời khách hàng tham gia ký theo phương thức mới. Hẹn lịch đo lường khối lượng đối lượng  thực tế chuyển cho QLDV.",
    partner: "NNCT - NH TMCP Techcombank",
    type: "Tái ký",
  },
  {
    id: 3,
    title: "Kiểm tra lịch làm việc với Vietcombank",
    time: "22/10/2021",
    content: "VCB Láng Hạ mới ký 11/10. QLDV Hương gửi lại để kiểm tra kế hoạch phân bổ nhiệm vụ.",
    partner: "QLDV - Hương",
    type: "Triển khai",
  },
];


const Dashboard = (props) => {
  const [filter, setFilter] = useState("monthly");
  const [dataOverview, setDataOverview] = useState({});
  const [visibleModal, setVisibleModal] = useState(false);

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
      <Col className={`overview_item flex__start__center ${item.className}`} span={7} key={index} onClick={() => setVisibleModal(true)}>
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
      <br />
      <StyledDashboardRow className="flex__between__start ">
        <Col span={16}>
          <GlobalTitle
            title="Tổng hợp báo cáo"
            level={3}
            color="#3eb8f8"
            extra={
              <Select defaultValue="30days" onChange={(value) => {}}>
                <Option value="30days">theo tháng</Option>
                <Option value="60days">theo quý</Option>
              </Select>
            }
          />
          <List
            header={null}
            footer={null}
            dataSource={reports}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <FileTextOutlined /> {item.title}{" "}
                <Button type="link" size="small" className="btn--right">
                  Chi tiết
                </Button>
                <br />
                <i>Người gửi: {item.sender}</i>
              </List.Item>
            )}
          />
        </Col>
        <Col span={7}>
          <GlobalTitle title="Tạo báo cáo" level={4} color="#3eb8f8" />
          <Select
            size="large"
            showSearch
            style={{ width: "100%", marginBottom: 15 }}
            placeholder="Chọn một vấn đề"
            optionFilterProp="children"
            onChange={() => {}}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="1">Tăng doanh thu</Option>
            <Option value="2">Giảm doanh thu</Option>
            <Option value="3">Tăng số hợp đồng</Option>
            <Option value="4">Giảm số hợp đồng</Option>
            <Option value="5">Tăng nhân công</Option>
            <Option value="6">Giảm nhân công</Option>
          </Select>
          <TextArea rows={5} size="large" placeholder="Nội dung báo cáo" />
          <br />
          <Button type="primary" size="large" style={{ width: "100%", marginTop: 15 }}>
            Tạo báo cáo
          </Button>
        </Col>
      </StyledDashboardRow>
      <br />
      <br />
      <br />
      
      <Modal
        className="task-list"
        width="70vw"
        title="Danh sách nhiệm vụ"
        visible={visibleModal}
        onOk={() => setVisibleModal(false)}
        onCancel={() => setVisibleModal(false)}
      >
        <List
          header={null}
          footer={null}
          bordered={false}
          dataSource={mock}
          renderItem={(item) => (
            <List.Item>
              <Card
                style={{ width: "100%" }}
                size="small"
                className="card-task-items"
                title={
                  <div className="flex__between__center">
                    {item.title + "  -  "  + item.type}
                    <Typography.Text italic type="success">
                      {item.time}
                    </Typography.Text>
                  </div>
                }
              >
                <Typography.Text>{item.content}</Typography.Text>
                <br />
                <Typography.Text>Phối hợp: {item.partner}</Typography.Text>
              </Card>
            </List.Item>
          )}
        />
      </Modal>
    </GlobalContent>
  );
};

export default Dashboard;
