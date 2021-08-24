import styled from "styled-components";
import { Button, Descriptions, Layout } from "antd";
const { Content } = Layout;

export const GlobalButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    box-shadow: 0 2px 6px rgba(0, 195, 104, 0.5);
  }
`;

export const GlobalContent = styled(Content)`
  width: 100%;
  padding: 0 10px;
`;

export const GlobalDescriptions = styled(Descriptions)`
  .ant-descriptions-view {
    background-color: white;
  }
  .ant-descriptions-item-label {
    /* background-color: #3A6351; */
    /* color: #ffffff */
  }

`;
