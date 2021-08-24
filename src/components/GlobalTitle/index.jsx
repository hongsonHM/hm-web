import React from "react";
import { Button } from "antd";
import { StyledTitleButton } from './styled'

function GlobalTitle(props) {
  const { level, title, extra, color } = props;

  return (
    <StyledTitleButton color={color} level={level} className="flex__between__center">
      {title}
      {extra}
    </StyledTitleButton>
  );
}

export default GlobalTitle;
