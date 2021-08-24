import styled from "styled-components";
import { Typography, Button } from "antd";

const { Title } = Typography 

export const StyledTitleButton = styled(Title)`
  position: relative;
  color: ${props => props.color + '!important'};
  height: 40px;
  margin: 10px auto;
  padding-left: 8px;
  border-left: 5px solid ${props => props.color};
  /* background-color: ${props => props.color+'10'} */
`