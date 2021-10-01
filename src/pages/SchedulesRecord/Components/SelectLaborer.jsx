import React from "react";

function SelectLaborer(props) {
  return (
    <div>
      <Select
        size="large"
        showSearch
        placeholder="Chọn một nhân công"
        optionFilterProp="children"
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {mockLaborer &&
          mockLaborer.map((laborer, i) => (
            <Option key={i} value={laborer.id}>
              {laborer.name + " - " + laborer.phone}
            </Option>
          ))}
      </Select>
    </div>
  );
}

export default SelectLaborer;
