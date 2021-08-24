import React, { useState, useEffect } from "react";
import { Input } from "antd";

function HandleInput(props) {
  const { editContractMode } = props;
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return <Input onChange={(e) => setValue(e.target.value)} className={`${editContractMode ? "input_editing" : "input_disabled"}`} value={value} />;
}

export default HandleInput;
