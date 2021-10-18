import React, { useState } from "react";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent } from "../../configs/styled.global";
import { Card, Space, Tag, Typography, Select, Button } from "antd";
import { mock } from "./mock";
import { useHistory } from "react-router-dom";

const { Option } = Select;

const ReceiveInformation = (props) => {
  let history = useHistory();
  const [infomations, setInfomations] = useState(mock);
  const [filterMode, setFilterMode] = useState();
  function onChange(value) {
    setFilterMode(value);
    const result = mock.filter((info) => info.tags.includes(value));
    setInfomations([...result]);
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  return (
    <GlobalContent id="receive_information" key="receive_information">
      <GlobalTitle
        title="Tiếp nhận thông tin"
        level={3}
        color="#3eb8f8"
        extra={
          <Select
            showSearch
            placeholder="Bộ lọc"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Hợp đồng">Hợp đồng</Option>
            <Option value="Kế hoạch">Kế hoạch</Option>
            <Option value="Báo cáo">Báo cáo</Option>
          </Select>
        }
      />
      <br/>
      {filterMode && (
        <Space size="large" className="flex__start__center">
          <Typography.Text className="filter-result" italic>
            Hiển thị kết quả cho : <b>{filterMode}</b>
          </Typography.Text>
          <Button
            size="middle"
            type="ghost"
            danger
            onClick={() => {
              setFilterMode(null);
              setInfomations(mock);
            }}
          >
            {" "}
            Hủy
          </Button>
        </Space>
      )}
      {infomations &&
        infomations.map((m) => (
          <Card
            key={m.id}
            className={`information-items --${m.type}`}
            title={m.title}
            extra={
              <Button type="link" onClick={() => history.push(m.link)}>
                Chi tiết
              </Button>
            }
            style={{ width: "100%" }}
          >
            <Typography>{m.description}</Typography>
            <Space size="small">
              {m.tags.map((tag, index) => (
                <Tag key={index} color="processing">
                  {tag}
                </Tag>
              ))}
            </Space>
          </Card>
        ))}
    </GlobalContent>
  );
};

export default ReceiveInformation;
