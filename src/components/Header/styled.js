import styled from "styled-components";
import { Layout } from "antd";

const { Header, Sider } = Layout;

export const StyledHeader = styled(Header)`
  background: #f4f7f2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
  padding-left: 20px;
  border-bottom: 1px solid rgba(82, 146, 32, 0.23);
  .username {
    font-weight: bold;
    font-size: 18px;
  }

  .ant-badge {
    cursor: pointer;
  }
`;
