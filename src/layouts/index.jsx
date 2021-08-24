import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { checkObjEmpty } from "../utils";
import routes from "../configs/routes";
import { getUser, setCurrentUser } from "../stores/authSlice";
import { getLoading, setLoading } from "../stores/commonSlice";
import { getUserProfile } from "../apis/user";
import Loading from "../components/Loading";
import Cookies from "js-cookie";

const customHistory = createBrowserHistory();

const Layouts = (props) => {
  const currentUser = useSelector(getUser) || {};
  const LOADING = useSelector(getLoading);
  const [retries, setRetries] = useState(3);
  const dispatch = useDispatch();
  const routesToPages = () => {
    let result;
    if (routes) result = routes.map((r, i) => <Route key={i} path={r.path} exact={r.exact} component={r.component} />);

    return <Switch>{result}</Switch>;
  };

  const getUserLoggedIn = async () => {
    dispatch(setLoading(true));
    const res = await getUserProfile();
    res && dispatch(setCurrentUser(res.data || {}));
    dispatch(setLoading(false));
  };

  useEffect(() => {
    if (checkObjEmpty(currentUser)) {
      // getUserLoggedIn()
    } else if (Cookies.get("token")) {
      setRetries(retries - 1);
      retries && getUserLoggedIn();
    }else {
      window.location.pathname !== '/dang-nhap' && (window.location.pathname = '/dang-nhap')
    }
  }, [currentUser]);

  return (
    <Router history={customHistory}>
      <Layout className="flex__center__center" style={{ minHeight: "100vh", maxHeight: "100vh" }}>
        {routesToPages()}
        {LOADING && <Loading />}
      </Layout>
    </Router>
  );
};

export default Layouts;
