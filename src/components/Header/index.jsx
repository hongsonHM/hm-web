import React, { Fragment, useState, useEffect } from "react";
import { getUser } from "../../stores/authSlice";
import { StyledHeader } from "./styled";
import { useSelector } from "react-redux";
import { Avatar, Space, Dropdown, Menu, Drawer, Badge, Popover } from "antd";
import { LogoutOutlined, UserOutlined, NotificationOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { getNotification } from "../../apis/notifications";

const notiList = {
  BUSINESS_STAFF: [
    {
      key: 1,
      title: "Hợp đồng đã được phê duyệt",
      desc: `Hợp đồng số "03/04HM" đã được ADMIN phê duyệt!`,
      readed: false,
      create_at: "3 giây trước",
      status: "success",
    },
    {
      key: 2,
      title: "Hợp đồng đã được phê duyệt",
      desc: `Hợp đồng số "11/234HM" đã được ADMIN phê duyệt!`,
      readed: true,
      create_at: "1 ngày trước",
      status: "success",
    },
    {
      key: 3,
      title: "Hợp đồng bị từ chối",
      desc: 'Hợp đồnh số "55/HM21" đã bị từ chối!',
      readed: true,
      create_at: "1 ngày trước",
      status: "error",
    },
    {
      key: 4,
      title: "Hợp đồng sắp đáo hạn !",
      desc: 'Hợp đồnh số "107/12HM" sắp đáo hạn!',
      readed: true,
      create_at: "4 ngày trước",
      status: "warning",
    },
  ],
  admin: [
    {
      key: 1,
      title: "Hợp đồng cần được phê duyệt",
      desc: `Hợp đồng số "03/04HM" cần được phê duyệt, hãy kiểm tra ngay!`,
      readed: false,
      create_at: "3 giây trước",
      status: "process",
    },
    {
      key: 2,
      title: "Hợp đồng cần được phê duyệt",
      desc: `Hợp đồng số "11/234HM" cần được phê duyệt, hãy kiểm tra ngay!`,
      readed: true,
      create_at: "1 ngày trước",
      status: "process",
    },
  ],
};

const roleToText = {
  SERVICE_MANAGER: "Quản lý dịch vụ",
  BUSINESS_STAFF: "Nhân viên kinh doanh",
  HUMANRESOURCE_STAFF: "Nhân sự",
  SUPPLY_STAFF: "Nhân viên cung ứng",
  BUSINESS_MANAGER: "Quản lý kinh doanh",
};

function Header(props) {
  const currentUser = useSelector(getUser);
  let history = useHistory();
  const [noti, setNoti] = useState();
  const [visible, setVisible] = useState(false);

  const fetchNotifications = async () => {
    const res = await getNotification();
    setNoti(res.data);
  };

  useEffect(() => {
    if (!noti) {
      fetchNotifications();
    }
  }, [noti]);

  const menu = (
    <Menu>
      <Menu.Item key="info_user">
        <UserOutlined /> Thông tin cá nhân
      </Menu.Item>
      {/* <Menu.Item key="notice" onClick={() => setVisible(true)}>
        <NotificationOutlined /> Thông báo <Badge count={noti.length} />
      </Menu.Item> */}
      <Menu.Item
        key="logout"
        onClick={() => {
          Cookies.remove("token");
          window.location.pathname = "/dang-nhap";
        }}
      >
        <LogoutOutlined /> Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const renderNotification = () => {
    if (noti)
      return noti.map((item, index) => (
        <div
          onClick={() => history.push(`/contract_details?cid=${item.key}`)}
          className={`notification_item flex__start__center ${item.status} ${item.isRead ? "" : "unread"}`}
          key={index}
        >
          <div className="notification_content">
            <div className="notification_name">{item.title}</div>
            <div className="notification_number">{item.desc}</div>
            <small>{item.create_at}</small>
          </div>
        </div>
      ));
  };

  return (
    <StyledHeader className="site-layout-background flex__between__center">
      <span className="username" level={5}>
        {currentUser.username || `${currentUser.lastName + " " + currentUser.firstName} - ${roleToText[currentUser.authorities && currentUser.authorities[0]]}`}
      </span>
      <Space size="large">
        <Popover
          trigger="click"
          placement="bottomRight"
          content={
            <Fragment>
              <h3>Thông báo ( {noti && noti.filter((p) => !p.isRead).length} chưa đọc )</h3>
              {renderNotification()}
            </Fragment>
          }
        >
          <Badge count={noti && noti.filter((p) => !p.isRead).length}>
            <Avatar size="large" style={{ color: "#ffffff", backgroundColor: "#ffbb00" }}>
              <NotificationOutlined />
            </Avatar>
          </Badge>
        </Popover>

        <Dropdown overlay={menu}>
          <Avatar size="large" style={{ color: "#f0f0f0", backgroundColor: "#3eb8f8" }}>
            M
          </Avatar>
        </Dropdown>
      </Space>
      <Drawer width="500" title="Thông báo" placement="right" closable={false} onClose={() => setVisible(false)} visible={visible}>
        {renderNotification()}
      </Drawer>
    </StyledHeader>
  );
}

export default Header;
