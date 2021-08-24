import React from "react";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent } from "../../configs/styled.global";

const Personnel = (props) => {
  return (
    <GlobalContent key="personnel">
      <GlobalTitle
        title="Quản lý nhân sự"
        level={3}
        color="#3A6351"
      />
    </GlobalContent>
  );
};

export default Personnel;
