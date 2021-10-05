import React, { Fragment } from "react";
import { Button, message } from "antd";

function FormContents(props) {
  const { steps, current, customValues, selectedClient, formContent } = props;

  const nextSteps = () => {
    props.setCustomValues(Object.assign({}, customValues));
    props.next();
  };

  const handleNextSteps = (index) => {
    switch (index) {
      case 0:
        if (!selectedClient.customerName) {
          message.error("Vui lòng chọn khách hàng để tiếp tục");
        } else nextSteps();
        break;
      case 1:
        if (!formContent.effectiveTimeFrom || !formContent.effectiveTimeTo || !formContent.contractValue || !formContent.content || !formContent.value) {
          message.error("Vui lòng điền các trường còn thiếu");
        } else nextSteps();
        break;
      case 2:
        if (!customValues.svcSpendTaskForAreaDTOs ) message.error("Chưa có tiểu bộ phận nào được thêm !");
        else {
          props.fetchPreviewSupplies()
        }
        break;
      default:
        nextSteps()
        break;
    }
  };

  return (
    <Fragment>
      {steps.map((item, index) => (
        <div key={index} className={`steps-content ${current === index ? "active" : "hidden"}`}>
          {steps[index].content}
        </div>
      ))}
      <div className="steps-action flex__center__center">
        {current > 0 && (
          <Button size="large" style={{ margin: "0 8px" }} onClick={() => props.prev()}>
            Quay lại
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button size="large" type="primary" onClick={() => handleNextSteps(current)}>
            Tiếp theo
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button htmlType="submit" size="large" type="primary">
            Tạo hợp đồng
          </Button>
        )}
      </div>
    </Fragment>
  );
}

export default FormContents;
