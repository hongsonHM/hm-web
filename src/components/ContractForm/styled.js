import styled from "styled-components";

export const StyledContractForm = styled.div`
  margin-bottom: 50px;
  .ant-steps {
    padding: 0 25px;
    .ant-steps-item {
      cursor: pointer;
    }
  }
  .steps-content.hidden {
    overflow: hidden;
    height: 0px;
  }

  .ant-form {
    margin: 25px 10px;
    min-height: 300px;
  }

  .ant-checkbox {
    transform: scale(1.5);
    .ant-checkbox-inner {
      border-radius: 3px;
    }
  }
`;
