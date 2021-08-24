import styled from "styled-components";
import { Layout } from "antd";

const { Header, Sider } = Layout;

export const StyledSider = styled(Sider)`
  background: #3a6351;

  .ant-menu-inline-collapsed > .ant-menu-item .anticon {
    font-size: 20px;
  }
  .ant-layout-sider-children {
    align-items: center;
    display: flex;
    flex-direction: column;

    .ant-menu-item {
      text-align: left;
      padding-left: 24px;
    }
  }
  .ant-menu-vertical .ant-menu-item,
  .ant-menu-vertical-left .ant-menu-item,
  .ant-menu-vertical-right .ant-menu-item,
  .ant-menu-inline .ant-menu-item,
  .ant-menu-vertical .ant-menu-submenu-title,
  .ant-menu-vertical-left .ant-menu-submenu-title,
  .ant-menu-vertical-right .ant-menu-submenu-title,
  .ant-menu-inline .ant-menu-submenu-title {
    margin: 0;
    height: 50px;
    line-height: 50px;
  }

  .ant-menu-submenu-open, .ant-menu-submenu-open .ant-menu-inline.ant-menu-sub, .ant-menu-submenu-open li  {
    background-color: rgba(0, 195, 104, 0.2);
  }

  .logo {
    height: 64px;
    font-size: 30px;
    color: #fff;
  }
`;

export const StyledLayout = styled(Layout)`
  background: #3a635120;
  position: relative;
  .ant-layout-content {
    background: #f4f7f2;
    margin-top: 64px;
    max-height: 100vh;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 10px;
      height: 100%;
      background: #f4f7f2;
    }
    ::-webkit-scrollbar-thumb {
      background: #3a6351;
      border-radius: 2px;
    }

    .site-layout-background {
      margin: 0px;
      padding: 10px;
    }
  }
`;
