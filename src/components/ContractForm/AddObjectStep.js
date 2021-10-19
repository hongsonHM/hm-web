import React, { useState, useEffect } from "react";
import { Collapse, Modal, Checkbox, Button, Input, Empty } from "antd";
import { buildingObjName } from "./mock";
import CollapsePanel from "./CollapsePanel";
import ToggleEditInputStatus from "../ToggleEditInputStatus";
import { v4 as uuidv4 } from "uuid";
import { getCoreTasks } from "../../apis/contract";

// const plainOptions = buildingObjName();
const defaultCheckedList = [];

const { Panel } = Collapse;

function AddObjectStep(props) {
  const { customValues } = props;
  const [subDivisions, setSubDivisions] = useState([]);
  const [editTitle, setEditTitle] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [value, setValue] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [plainOptions, setPlainOptions] = useState();
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [coreTasks, setCoreTasks] = useState([]);

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

  let temp = {
    svcAreaDTO: {
      key: uuidv4(),
      name: "Chưa đặt tên",
    },
    svcSpendTaskDTOs: [],
  };

  const fetchCoreTasks = async () => {
    const res = await getCoreTasks();
    const planopts = buildingObjName(res.data);
    setCoreTasks(res.data);
    setPlainOptions([...new Set(planopts)]);
  };

  useEffect(() => {
    if (!plainOptions) {
      fetchCoreTasks();
    }
    console.log(plainOptions);
  }, [plainOptions]);

  const saveNameSubDivision = () => {
    setEditTitle(false);
    const selectetItem = subDivisions.filter((e) => e.svcAreaDTO.key === selectedId)[0];
    selectetItem.svcAreaDTO.name = value;
    setSubDivisions([...subDivisions]);
    setValue("");
  };

  return (
    <>
      <div className="flex__end__center">
        <Button
          size="middle"
          type="primary"
          onClick={() => {
            subDivisions.push(temp);
            setSubDivisions([...subDivisions]);
          }}
        >
          + THÊM
        </Button>
      </div>
      <br />
      {subDivisions ? (
        <Collapse className="contract__objects" bordered={false}>
          {subDivisions.map((sub, index) => (
            <Panel
              header={
                <>
                  Tiểu bộ phận:{" "}
                  {editTitle && selectedId === sub.svcAreaDTO.key ? (
                    <Input
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                      size="middle"
                      style={{ width: 200 }}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      onPressEnter={(e) => saveNameSubDivision()}
                    />
                  ) : (
                    sub.svcAreaDTO.name
                  )}{" "}
                  <ToggleEditInputStatus
                    condition={editTitle && selectedId === sub.svcAreaDTO.key}
                    onOk={() => saveNameSubDivision()}
                    onCancel={() => {
                      setEditTitle(false);
                    }}
                    actions={() => {
                      setEditTitle(!editTitle);
                      setSelectedId(sub.svcAreaDTO.key);
                      setValue(sub.name);
                    }}
                  />
                </>
              }
              key={index}
            >
              <CollapsePanel
                subDivisions={subDivisions}
                setSubDivisions={setSubDivisions}
                setCheckedList={setCheckedList}
                setSelectedId={setSelectedId}
                setIsModalVisible={setIsModalVisible}
                sub={sub}
              />
            </Panel>
          ))}
        </Collapse>
      ) : (
        <Empty description="Chưa có tiểu bộ phận nào được tạo." />
      )}

      <Modal
        width="80vw"
        title={
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} value={1}>
            Chọn tất cả ({plainOptions && plainOptions.length} đối tượng)
          </Checkbox>
        }
        visible={isModalVisible}
        onOk={async () => {
          const selectetItem = subDivisions.filter((e) => e.svcAreaDTO.key === selectedId)[0];
          const selectedTasks = coreTasks.filter((task) => checkedList.includes(task.name));
          console.log(coreTasks);
          await selectedTasks.forEach((task) => (task.coreTask = { id: task.id }));

          selectetItem.svcSpendTaskDTOs = selectedTasks;
          setSubDivisions([...subDivisions]);
          props.setCustomValues(Object.assign(customValues, { svcSpendTaskForAreaDTOs: subDivisions }));
          setIsModalVisible(false);
          setCheckedList([]);
          selectedTasks.forEach((d) => {
            delete d["id"];
          });
        }}
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
