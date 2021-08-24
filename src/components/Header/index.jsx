import React, { useEffect } from "react";
import { getUser } from "../../stores/authSlice";
import { StyledHeader } from "./styled";
import { useSelector } from "react-redux";
import { Avatar, Space, Dropdown, Menu } from "antd";
import { LogoutOutlined, UserOutlined, NotificationOutlined } from "@ant-design/icons";

function Header(props) {
  const currentUser = useSelector(getUser) || {};
  const menu = (
    <Menu>
      <Menu.Item key="info_user">
        <UserOutlined /> Thông tin cá nhân
      </Menu.Item>
      <Menu.Item key="info_user">
        <NotificationOutlined /> Thông báo
      </Menu.Item>
      <Menu.Item
        key="logout"
        onClick={() => {
          localStorage.removeItem("loggedin");
          window.location.pathname = "/dang-nhap";
        }}
      >
        <LogoutOutlined /> Đăng xuất
      </Menu.Item>
    </Menu>
  );
  return (
    <StyledHeader className="site-layout-background flex__end__center">
      <Space>
        {currentUser.username || "MONOCHROME - Nhân viên kinh doanh"}
        <Dropdown overlay={menu}>
          <Avatar size="large" style={{ color: "#f0f0f0", backgroundColor: "#3A6351" }}>
            M
          </Avatar>
        </Dropdown>
      </Space>
    </StyledHeader>
  );
}

export default Header;
