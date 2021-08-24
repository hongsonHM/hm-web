import styled from "styled-components";
import { Menu } from "antd";

export const StyledMenuItem = styled(Menu.Item)`
  background: #3a6351;

  &:hover,
  &.ant-menu-item-selected {
    background: #00c368 !important;
  }
`;
