import React, { useState } from "react";
import { Switch, message } from "antd";

function SwitchStatus(props) {
  const [checked, setChecked] = useState(props.checked);

  return <Switch checkedChildren="BẬT" unCheckedChildren="TẮT" checked={checked} onChange={(e) => {
    setChecked(e)
    message.success('Cập nhật kế hoạch thành công!')
  }} />;
}

export default SwitchStatus;
