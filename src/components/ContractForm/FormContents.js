import React, { Fragment } from "react";
import { Button } from 'antd'

function FormContents(props) {
  const { steps, current, customValues } = props;
  
  return (
    <Fragment>
      {steps.map((item, index) => (
        <div className={`steps-content ${current === index ? "active" : "hidden"}`}>{steps[index].content}</div>
      ))}
      <div className="steps-action flex__center__center">
        {current > 0 && (
          <Button size="large" style={{ margin: "0 8px" }} onClick={() => props.prev()}>
            Quay lại
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button size="large" type="primary" onClick={() => {
            props.next()
            props.setCustomValues(Object.assign({}, customValues))
          }}>
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
