import styled from "styled-components";
import { Row } from "antd";

export const StyledDashboardRow = styled(Row)`
  .overview_item {
    height: 100px;
    width: 30%;
    border-radius: 10px;
    color: #efe7ef;
    box-shadow: 0 2px 4px #00000040;
    transition: all 0.4s ease;
    cursor: pointer;
    margin-top: 10px;
    margin-bottom: 20px;
    &:hover {
      box-shadow: 0 3px 6px #00000060;
    }

    .overview_icon {
      font-size: 55px;
      margin-right: 20px;
      padding-left: 15px;
    }
    .overview_number {
      font-size: 30px;
      font-weight: bold;
      line-height: 1;
    }

    &.processing {
      background-image: linear-gradient(45deg, #183ae2 0%, #6fa6ea 105%);
    }
    &.done {
      background-image: linear-gradient(45deg, #11998e 0%, #38ef7d 105%);
    }
    &.timeout {
      background-image: linear-gradient(45deg, #ee0979 0%, #ff6a00 105%);
    }
  }

  .ant-list-split .ant-list-item {
    border: 1px solid #3eb8f870;
    padding: 15px 10px;
    border-radius: 3px;
    margin-bottom: 10px;
  }
`;
