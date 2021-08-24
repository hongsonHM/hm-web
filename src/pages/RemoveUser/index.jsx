import React from "react";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent } from "../../configs/styled.global";

const RemoveUser = (props) => {
  return (
    <GlobalContent key="RemoveUser">
      <GlobalTitle
        title="Xóa nhân viên khỏi hệ thống"
        level={3}
        color="#3eb8f8"
      />
    </GlobalContent>
  );
};

export default RemoveUser;
