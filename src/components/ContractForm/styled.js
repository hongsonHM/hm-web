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

  .ant-collapse-borderless {
    background-color: transparent;
  }
  .ant-collapse-item {
    border-bottom: none;
    margin-bottom: 15px;
    background-color: #3eb8f830;
    border: 1px solid transparent;
    transition: all 0.35s ease;
    &.ant-collapse-item-active, &:hover {
      border: 1px solid #3eb8f850;
      background-color: #3eb8f850;
    }
  }

  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    font-weight: 600;
  }
  .contract__objects {
    .ant-input[disabled] {
      border: none;
      background: transparent;
      padding-left: 0;
    }
  }

  .ant-checkbox-group {
    width: 100%;
  }
`;
