import React from 'react'
import Contract from "../../pages/Contract"
import Personnel from "../../pages/Personnel"
import Dashboard from '../../pages/Dashboard'
import Sale from '../../pages/Sale'
import Supply from '../../pages/Supply'

const contents = [
  {
    param: undefined,
    component: () => <Dashboard />
  },
  {
    param: "dashboard",
    component: () => <Dashboard />
  },
  {
    param: "contract",
    component: () => <Contract />
  },
  {
    param: "personnel",
    component: () => <Personnel />
  },
  {
    param: "sales",
    component: () => <Sale />
  },
  {
    param: "supply",
    component: () => <Supply />
  },
]

export default contents