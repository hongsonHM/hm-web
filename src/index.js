import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "./index.less";
import Layouts from "./layouts";
import { store } from './stores'

ReactDOM.render(
  <Provider store={store}>
      <Layouts />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
