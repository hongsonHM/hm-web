import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser, setCurrentUser } from "../stores/authSlice";
import { checkObjEmpty } from "../utils";
import routes from "../configs/routes";
import { getUserProfile } from '../apis/user'

const customHistory = createBrowserHistory();
const MOCK_MODE = true;

const Layouts = (props) => {
  const currentUser = useSelector(getUser) || {};
  const dispatch = useDispatch();
  console.log('Re-render');
  const routesToPages = () => {
    let result;
    if (routes) result = routes.map((r, i) => <Route key={i} path={r.path} exact={r.exact} component={r.component} />);

    return <Switch>{result}</Switch>;
  };

  const getUserLoggedIn = async () => {
    const res = await getUserProfile()
    res && dispatch(setCurrentUser(res.data))
  }

  useEffect(() => {
    if (checkObjEmpty(currentUser)) {
      // 
    } else !MOCK_MODE && getUserLoggedIn()
  }, [currentUser]);

  return (
    <Router history={customHistory}>
      <Layout className="flex__center__center" style={{ minHeight: "100vh", maxHeight: "100vh" }}>
        {routesToPages()}
      </Layout>
    </Router>
  );
};

export default Layouts;
