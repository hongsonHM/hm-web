import { Table } from "antd";
import styled from "styled-components";

export const StyledTable = styled(Table)`
  .ant-table {
    background: transparent;
  }
  table {
    border-collapse: separate;
    border-spacing: 0 10px;
    .ant-table-thead > tr > th {
      text-align: left;
      text-transform: uppercase;
      height: 45px;
    }
    .ant-table-thead > tr > th:first-child {
      border-radius: 10px 0 0 10px;
    }
    .ant-table-thead > tr > th:last-child {
      border-radius: 0 10px 10px 0;
    }
    .ant-table-tbody > tr > td {
      border-top: 1px solid #f0f0f0;
      background: #fff;
    }
    .ant-table-tbody > tr > td:first-child {
      border-radius: 10px 0 0 10px;
    }
    .ant-table-tbody > tr > td:last-child {
      border-radius: 0 10px 10px 0;
    }

    .ant-table-row.ant-table-row-level-0 {
      background-color: #ffffff;
      color: #000;
      height: 80px;
      text-align: left;
      border-radius: 10px;
      border: 1px solid #00000020;
      margin-bottom: 10px;
      box-shadow: 0px 2px 4px #3eb8f850;
      transition: all 0.3s ease;
      cursor: pointer;
      &:hover {
        box-shadow: 0px 3px 6px #3eb8f880;
        background-color: #3eb8f820;
      }
    }

    .ant-table-thead th.ant-table-column-sort {
      background: #3eb8f890;
      &:hover {
        background: #3eb8f890;
      }
    }
    .ant-table-thead th.ant-table-column-has-sorters:hover {
      background: #3eb8f890;
    }

    .ant-table-filter-trigger.active {
      color: #bfbfbf;
    }
  }
`;
