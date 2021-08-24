import React from "react";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent } from "../../configs/styled.global";

const Sale = (props) => {
  return (
    <GlobalContent key="sale">
      <GlobalTitle
        title="Quản lý kinh doanh"
        level={3}
        color="#3A6351"
      />
    </GlobalContent>
  );
};

export default Sale;
