import React from "react";
import { Layout, Breadcrumb } from "antd";
import { connect } from "react-redux";

const { Content } = Layout;

const NotFound = (props) => {
  return (
    <Content  key="1">
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>404</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        Not Found Params
      </div>
    </Content>
  );
};

export default connect(
  (state) => ({
    loading: state.commonReducers.loading,
  }),
  null
)(NotFound);
