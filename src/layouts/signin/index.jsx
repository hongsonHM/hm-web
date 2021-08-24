import React, { useState, Fragment, useEffect } from "react";
import { StyledSignin } from "./styled";
import { Col, Typography, Form, Input } from "antd";
import RegistrationForm from "../../components/RegistrationForm";
import { useSelector, useDispatch } from "react-redux";
import { login, getUser } from "../../stores/authSlice";
const { Text, Title } = Typography;

const Signin = (props) => {
  const [user, setUser] = useState({});
  const currentUser = useSelector(getUser) 
  useEffect(() => {
    if(currentUser) {
      setUser(currentUser)
    }
  }, [currentUser]);

  return (
    <StyledSignin>
      <Col className="signin__content" span={22}>
        <Title>Đăng nhập hệ thống</Title>
        <RegistrationForm
          submit_text="Đăng Nhập"
          contents={
            <Fragment>
              <Form.Item
                name="username"
                label="Tên đăng nhập"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Input size="large" placeholder="username" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa nhập mật khẩu!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || value.length >= 8) {
                        return Promise.resolve();
                      }

                      return Promise.reject("Mật khẩu phải chứa ít nhất 8 kí tự!");
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password size="large" placeholder="8+ characters" />
              </Form.Item>
            </Fragment>
          }
          setUser={setUser}
          data={user}
          type="signin"
          large
        />
      </Col>
    </StyledSignin>
  );
};

export default Signin;
