import React from "react";
import { Upload, message, Button } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

function UploadXlsx(props) {
  const prop = {
    name: "file",
    action: "https://dvvs.overnetcontact.com/api/svc-contracts/excel",
    headers: {
      authorization: `Bearer ${Cookies.get("token")}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload listType={null} {...prop}>
      <Button type="primary" icon={<CloudUploadOutlined />}>
        Upload file.xlsx
      </Button>
    </Upload>
  );
}

export default UploadXlsx;
