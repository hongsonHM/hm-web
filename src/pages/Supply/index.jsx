import React from "react";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent } from "../../configs/styled.global";

const Supply = (props) => {
  return (
    <GlobalContent key="supply">
      <GlobalTitle
        title="Quản lý Vật tư"
        level={3}
        color="#3eb8f8"
      />
    </GlobalContent>
  );
};

export default Supply;
