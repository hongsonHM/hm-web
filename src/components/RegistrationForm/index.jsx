import React from "react";
import { Form, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../stores/authSlice";
import { setLoading } from "../../stores/commonSlice";
import { userLogin } from "../../apis/auth";
import { createClient } from "../../apis/contract";
import Cookies from "js-cookie";

const RegistrationForm = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { data, type, large, size, layout, labelCol, wrapperCol, offsetButton } = props;
  const onFinish = (values) => {
    submits[type].actions(values);
  };

  // handle Actions
  const submits = {
    signin: {
      actions: async (values) => {
        dispatch(setLoading(true));
        const res = await userLogin(Object.assign(values, { rememberMe: true }));
        switch (res.status) {
          // Success login
          case 200:
            dispatch(setCurrentUser(res.data));
            Cookies.set("token", res.data.token);
            localStorage.roles = res.data.roles[0];
            message.success("Đăng nhập thành công!");
            dispatch(setLoading(false));
            setTimeout(() => {
              window.location.pathname = "/";
            }, 2000);
            break;

          // Success login
          case 401:
            dispatch(setLoading(false));
            message.error("Thông tin đăng nhập không chính xác!");
            break;

          default:
            break;
        }
      },
    },
    create_client: {
      actions: async (values) => {
        dispatch(setLoading(true));
        const res = await createClient(values);
        switch (res.status) {
          // Success login
          case 201:
            message.success("Đăng nhập thành công");
            props.onFinish(res.data);
            dispatch(setLoading(false));
            break;

          default:
            dispatch(setLoading(false));
            message.error("Có lỗi xảy ra, thử lại sau ít phút!");
            break;
        }
      },
    },
  };

  return (
    <Form
      layout={layout || "vertical"}
      size={size}
      {...layout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      style={{ width: "100%" }}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
    >
      {props.contents}
      {props.submit_text && (
        <Form.Item className="flex__center__center" wrapperCol={{ ...wrapperCol, ...offsetButton }}>
          <Button style={{ height: 50 }} type="primary" htmlType="submit" size={large ? "large" : ""}>
            {props.submit_text}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default RegistrationForm;
