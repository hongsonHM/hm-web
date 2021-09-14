import React, { useState } from "react";
import { Collapse, Modal, Checkbox, Button, Input } from "antd";
import { mockSubDivision, buildingObjName } from "./mock";
import CollapsePanel from "./CollapsePanel";
import ToggleEditInputStatus from "../ToggleEditInputStatus";

const plainOptions = buildingObjName();
const defaultCheckedList = buildingObjName();

const { Panel } = Collapse;

function AddObjectStep(props) {
  const [subDivisions, setSubDivisions] = useState(mockSubDivision);
  const [editTitle, setEditTitle] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [value, setValue] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <>
      <Collapse className="contract__objects" bordered={false} onChange={() => {}}>
        <div className="flex__end__center">
          <Button
            size="middle"
            type="primary"
            onClick={() => {
              mockSubDivision.push({
                id: subDivisions.length + 1,
                name: "Chưa đặt têm ",
                objects: [],
              });
              setSubDivisions([...mockSubDivision]);
            }}
          >
            + THÊM
          </Button>
        </div>
        <br />
        {subDivisions.map((sub, index) => (
          <Panel
            header={
              <>
                Tiểu bộ phận:{" "}
                {editTitle && selectedId === sub.id ? (
                  <Input
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    size="middle"
                    style={{ width: 200 }}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                ) : (
                  sub.name
                )}{" "}
                <ToggleEditInputStatus
                  condition={editTitle && selectedId === sub.id}
                  onOk={() => {
                    setEditTitle(false);
                    setSelectedId(null);
                    setValue("");
                  }}
                  onCancel={() => {
                    setEditTitle(false);
                    setSelectedId(null);
                    setValue("");
                  }}
                  actions={() => {
                    setEditTitle(!editTitle);
                    setSelectedId(sub.id);
                    setValue(sub.name);
                  }}
                />
              </>
            }
            key={sub.id}
          >
            <CollapsePanel setIsModalVisible={setIsModalVisible} sub={sub} />
          </Panel>
        ))}
      </Collapse>
      <Modal
        width="80vw"
        title={
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} value={1}>
            Chọn tất cả đối tượng
          </Checkbox>
        }
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
      >
        <Checkbox.Group
          className="flex__between__center flex__wrap list_objects_contract"
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
          style={{ width: "100%" }}
        />
      </Modal>
    </>
  );
}

export default React.memo(AddObjectStep);
