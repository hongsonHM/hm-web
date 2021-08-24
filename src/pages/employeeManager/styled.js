import styled from "styled-components";
import { Col, Avatar  } from "antd";

export const StyledDashboard = styled(Col)`
  height: 105px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
  padding: 20px;
  transition: all 0.4s ease;
  border: 1px solid transparent;
  margin-bottom: 20px;
  &:hover {
    box-shadow: 0 4px 8px ${s => `${s.color}30`};
    background: ${s => `${s.color}03`};
    border: 1px solid ${s => `${s.color}70`};
  }

  .dashboard_items__content {
    .text {
      font-size: 13px;
      color: #898989;
      font-weight: 500;
    }
    .number {
      font-size: 52px;
      color: #000;
      line-height: 52px;
      margin: 0;
      font-weight: 700;
    }
  }
`;

export const StyledAvatar = styled(Avatar)`
  height: 50px;
  width: 50px;
  border-radius: 999px;
  border: 1px solid;
  border-color: ${s => `${s.color}`};
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${s => `${s.color}10`};
  margin-right: 20px;
`;

export const StyledTabsSearch = styled.div`
  position: relative;
`

export const StyledSearch = styled.div`
  position: absolute;
  width: 50%;
  display: flex;
  height: 50px;
  justify-content: flex-end;
  align-items: center;
  top: 0;
  right: 0;
`