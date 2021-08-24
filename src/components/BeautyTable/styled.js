import styled from "styled-components";
import { Row } from "antd";

export const StyledBeautyTableHeader = styled(Row)`
  background-color: #3a6351;
  color: #fff;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  margin: 25px auto 10px;
`;
export const StyledBeautyTableBody = styled(Row)`
  background-color: #ffffff;
  color: #000;
  height: 80px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #00000020;
  margin-bottom: 10px;
  box-shadow: 0px 2px 4px #3a635150;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 3px 6px #3a635180;
    background-color: #3a635120;
  }
`;
