import React, { useEffect } from "react";
import Loading from "../../components/Loading";
import { Layout } from "antd";
import { StyledSider, StyledLayout } from "./styled";
import MenuByRoles from "../../components/MenuByRoles";
import { globalMessage } from "../../components/GlobalMessage";
import { useParams } from "react-router-dom";
import contents from "./contents";
import Header from "../../components/Header";
import hm_logo from "../../assets/images/hm_logo.png";

const App = (props) => {
  let { loading, msg } = props;

  let { param } = useParams();
  useEffect(() => {
    if (msg && msg.text) {
      globalMessage(msg);
    }
  }, [msg]);

  return (
    <Layout style={{ minHeight: "100vh", maxHeight: "100vh", width: "100vw" }}>
      {loading ? <Loading /> : null}
      <StyledSider width="250" collapsed={false}>
        <div className="logo flex__center__center flex__column">
          <img src={hm_logo} alt="logo" />
        </div>
        <MenuByRoles />
      </StyledSider>
      <StyledLayout className="site-layout flex__center__center">
        <Header />
        {contents.find((element) => element.param === param).component()}
      </StyledLayout>
      {/* <Loading /> */}
    </Layout>
  );
};

export default App;