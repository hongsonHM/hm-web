import styled from "styled-components";
import { Menu } from "antd";

export const StyledMenuItem = styled(Menu.Item)`
  padding-left: 16px !important;
  .ant-btn {
    /* width: 100%; */
    opacity: 0.7;
    border: 0;

    &:hover {
      opacity: 1;
      background-color: #fafafa;
      color: #333;
    }
  }
  /* background: #3eb8f8; */

  &.ant-menu-item-selected {
    .ant-btn {
      opacity: 1;
      background-color: #fafafa;
      color: #333;
    }
  }
`;
