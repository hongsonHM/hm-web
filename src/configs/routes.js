import React from 'react'
import Signin from "../layouts/signin"
import App from "../layouts/app"
import NotFound from "../layouts/notfound"
const routes = [
  {
    path: "/dang-nhap",
    exact: true,
    component: () => <Signin />
  },
  {
    path: "/dashboard",
    exact: true,
    component: () => <App />
  },
  {
    path: "/",
    exact: true,
    component: () => <App />
  },
  {
    path: "/insider_transaction/:param",
    exact: true,
    component: () => <App />
  },
  {
    path: "/division_info/:param",
    exact: true,
    component: () => <App />
  },
  {
    path: "/:param",
    exact: true,
    component: () => <App />
  }
]

export default routes