import React from "react";
import { Form, Button } from "antd";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../stores/authSlice";
import { userLogin } from "../../apis/auth";
import Cookies from "js-cookie";
import { globalMessage } from "../GlobalMessage";

const MOCK_MODE = true;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const RegistrationForm = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { data, type, large } = props;
  const onFinish = (values) => {
    console.log(values);
    submits[type].actions(values);
  };

  // handle Actions
  const submits = {
    signin: {
      actions: async (values) => {
        if (!MOCK_MODE) {
          const res = await userLogin(values);
          switch (res.status) {
            // Success login
            case "S0000":
              dispatch(setCurrentUser(res.data.user));
              Cookies.set("token", res.data.access_token);
              Cookies.set("refresh_token", res.data.refresh_token);
              globalMessage({
                type: "success",
                text: "Đăng nhập thành công",
              });
              setTimeout(() => {
                window.location.pathname = "/";
              }, 2000);
              break;

            // Success login
            case "UR0001":
              break;

            default:
              break;
          }
        } else {
          if (values.username === "mono.staff" && values.password === "123456789") {
            localStorage.loggedin = true
            dispatch(
              setCurrentUser({
                uid: 10101,
                username: "MONOCHROME_STAFFS",
                roles: "staff",
                phone: "0353119808",
              })
            );
            globalMessage({
              type: "success",
              text: "Đăng nhập thành công",
            });
            setTimeout(() => {
              window.location.pathname = "/";
            }, 2000);
          } else {
            globalMessage({
              type: "error",
              text: "Thông tin đăng nhập không chính xác",
            });
          }
        }
      },
    },
  };

  return (
    <Form {...layout} form={form} name="register" onFinish={onFinish} initialValues={{}} scrollToFirstError style={{ width: "100%" }}>
      {props.contents}
      {props.submit_text && (
        <Form.Item>
          <Button style={{ height: 50 }} type="primary" htmlType="submit" size={large ? "large" : ""}>
            {props.submit_text}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default RegistrationForm;
