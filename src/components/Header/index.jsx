import React, { Fragment, useState, useEffect } from "react";
import { getUser } from "../../stores/authSlice";
import { StyledHeader } from "./styled";
import { useSelector } from "react-redux";
import { Avatar, Space, Dropdown, Menu, Drawer, Badge, Popover } from "antd";
import { LogoutOutlined, UserOutlined, NotificationOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { getNotification } from "../../apis/notifications";
import { checkObjEmpty } from "../../utils";

const roleToText = {
  SERVICE_MANAGER: "Quản lý dịch vụ",
  BUSINESS_STAFF: "Nhân viên kinh doanh",
  HUMANRESOURCE_STAFF: "Nhân sự",
  SUPPLY_STAFF: "Nhân viên cung ứng",
  BUSINESS_MANAGER: "Quản lý cao cấp",
};

function Header(props) {
  const currentUser = useSelector(getUser);
  let history = useHistory();
  const [noti, setNoti] = useState();
  const [visible, setVisible] = useState(false);
  const fetchNotifications = async () => {
    const res = await getNotification(currentUser.id);
    setNoti(res.data);
  };

  useEffect(() => {
    if (!noti) {
      if (checkObjEmpty(currentUser)) fetchNotifications();
    }
  }, [noti, currentUser]);

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
          onClick={() => {
            console.log(item, JSON.parse(item.data));
            history.push(`/contract_details?cid=${JSON.parse(item.data)}`)
          }}
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
