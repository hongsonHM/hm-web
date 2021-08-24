import React from "react";
import { Descriptions } from "antd";
import { GlobalDescriptions } from "../../configs/styled.global";
import { friendlyStringMoney } from "../../utils";
function Descripstions(props) {
  const { data, column, title, extra, labelStyle } = props;
  // render all key and value of a contract
  const renderDescriptionsContract = () => {
    let res = [];
    if (data)
      for (var key in data) {
        res.push(
          <Descriptions.Item key={key} label={data[key].label}>
            {key === "contractValue" ? friendlyStringMoney(data[key].value ? data[key].value : "0") + " VNĐ" : data[key].value}
          </Descriptions.Item>
        );
      }
    return res;
  };

  return (
    <GlobalDescriptions labelStyle={labelStyle} bordered extra={extra} column={column} title={title}>
      {renderDescriptionsContract()}
    </GlobalDescriptions>
  );
}

export default Descripstions;
