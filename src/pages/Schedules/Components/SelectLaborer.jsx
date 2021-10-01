import React from "react";
import { mockLaborer } from "../mock";
import { Select, Checkbox, Row, Col } from "antd";

const { Option } = Select;

function SelectLaborer(props) {
  return (
    <div>
      <Checkbox.Group style={{ width: "100%" }} onChange={() => {}} >
        <Row>
          {
            mockLaborer.map((labor) => <Col span={8}>
            <Checkbox value={labor.id}>{`${labor.name} [${labor.phone}]`}</Checkbox>
          </Col>)
          }
        </Row>
      </Checkbox.Group>
    </div>
  );
}

export default SelectLaborer;
