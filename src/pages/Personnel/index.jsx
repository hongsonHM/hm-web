import React from "react";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent } from "../../configs/styled.global";

const Personnel = (props) => {
  return (
    <GlobalContent key="personnel">
      <GlobalTitle
        title="Quản lý nhân sự"
        level={3}
        color="#3eb8f8"
      />
    </GlobalContent>
  );
};

export default Personnel;
