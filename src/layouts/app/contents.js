import React from 'react'
import Contract from "../../pages/Contract"
import Personnel from "../../pages/Personnel"
import Dashboard from '../../pages/Dashboard'
import Sale from '../../pages/Sale'
import Supply from '../../pages/Supply'
import AddContract from '../../pages/AddContract'
import RequestAdmin from '../../pages/RequestAdmin'
import ApproveContract from '../../pages/ApproveContract'
import AddNewUser from '../../pages/AddNewUser'
import RemoveUser from '../../pages/RemoveUser'
import ContractDetails from '../../pages/ContractDetails'
import EditContract from '../../pages/EditContract'
import Schedules from '../../pages/Schedules'
import SchedulesRecord from '../../pages/SchedulesRecord'

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
  {
    param: "add_contract",
    component: () => <AddContract />
  },
  {
    param: "request_admin",
    component: () => <RequestAdmin />
  },
  {
    param: "approve_contract",
    component: () => <ApproveContract />
  },
  {
    param: "add_user",
    component: () => <AddNewUser />
  },
  {
    param: "del_user",
    component: () => <RemoveUser />
  },
  {
    param: "contract_details",
    component: () => <ContractDetails />
  },
  {
    param: "edit_contract",
    component: () => <EditContract />
  },
  {
    param: "division_info",
    component: () => <Dashboard />
  },
  {
    param: "schedules",
    component: () => <Schedules />
  },
  {
    param: "schedules_record",
    component: () => <SchedulesRecord />
  }
]

export default contents