import React from "react";
import { Button } from "antd";
import { FormOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

function ToggleEditInputStatus(props) {
  const { condition } = props;
  return condition ? (
    <>
      <Button
        size="small"
        type="primary"
        icon={<CheckCircleOutlined />}
        onClick={(event) => {
          event.stopPropagation();
          props.onOk();
        }}
      />
      &nbsp;
      <Button
        size="small"
        type="primary"
        icon={<CloseCircleOutlined />}
        onClick={(event) => {
          event.stopPropagation();
          props.onCancel();
        }}
        danger
      />
    </>
  ) : (
    <FormOutlined
      onClick={(event) => {
        event.stopPropagation();
        props.actions();
      }}
    />
  );
}

export default ToggleEditInputStatus;
