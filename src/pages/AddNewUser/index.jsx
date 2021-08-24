import React from "react";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent } from "../../configs/styled.global";

const AddNewUser = (props) => {
  return (
    <GlobalContent key="AddNewUser">
      <GlobalTitle
        title="Thêm mới nhân viên"
        level={3}
        color="#3eb8f8"
      />
    </GlobalContent>
  );
};

export default AddNewUser;
