import React from "react";
import { StyledLoading } from "./styled";
import { LoadingOutlined } from "@ant-design/icons";

function Loading(props) {

  const style = {
    fontSize: "36px",
    color: "#00c368",
  };
  return (
    <StyledLoading>
      <LoadingOutlined style={style} />
    </StyledLoading>
  );
}

export default Loading;
