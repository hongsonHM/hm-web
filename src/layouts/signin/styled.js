import styled from "styled-components";
import { Row } from "antd";
import { GlobalButton } from "../../configs/styled.global";

export const StyledSignin = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: stretch;
  height: auto;
  width: 600px;
  background: #f9f9f9;
  box-shadow: 0 13px 17px 0 rgba(162, 162, 162, 0.2);

  .signin__content {
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    padding: 50px 10px;
    h1.ant-typography {
      color: #3eb8f8; // #3eb8f8
    }
    > span.ant-typography {
      margin-bottom: 15px;
    }

    .signin__gg {
      position: relative;
      padding: 0;

      .gg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: 0 !important;
        &:hover {
          opacity: 0;
        }
      }
    }

    .ant-btn {
      width: 100%;
    }
  }

  .signin__image {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #fff;
    padding: 0px 10px;
    img {
      width: 355px;
      height: auto;
      margin-bottom: 70px;
    }
  }
`;

export const StyledSigninButton = styled(GlobalButton)`
  width: 317px;
  height: 46px;
  border-radius: 10px;
  background: #ee2a2a !important;
  font-size: 14px;
  margin-bottom: 30px;
  .anticon {
    font-size: 22px;
    height: 22px;
    margin-right: 15px;
  }

  &:hover {
    opacity: 0.8;
  }

  > * {
    font-weight: 300;
  }
`;
