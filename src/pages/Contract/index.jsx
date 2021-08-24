import React from "react";
import BeautyTable from "../../components/BeautyTable";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent } from "../../configs/styled.global";
import { Button, Space } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";

const Contract = (props) => {
  return (
    <GlobalContent key="contract">
      <GlobalTitle
        title="Danh Sách hợp đồng"
        level={3}
        color="#3A6351"
        extra={
          <Space>
            <Button size="large" type="primary">
              + Thêm mới
            </Button>
            <Button size="large" type="primary">
            <CloudUploadOutlined /> Upload file.xlsx
            </Button>
          </Space>
        }
      />

      <BeautyTable />
    </GlobalContent>
  );
};

export default Contract;
