export const roles = {
  SERVICE_MANAGER: [
    {
      name: "Dashboard",
      key: "dashboard",
      path: "/dashboard",
    },
    {
      name: "Danh sách hợp đồng",
      key: "contract",
      path: "/insider_transaction/contract",
    },
    {
      name: "Kế hoạch",
      key: "schedules",
      path: "/schedules",
    },
    {
      name: "Lên kế hoạch",
      key: "create_plans",
      path: "/create_plans",
    },
    {
      name: "Tiếp nhận thông tin",
      key: "receive_information",
      path: "/receive_information",
    },
    {
      name: "Thông tin bộ phận",
      key: "division_info",
      path: "/division_info",
    },
  ],
  BUSINESS_MANAGER: [
    {
      name: "Dashboard",
      key: "dashboard",
      path: "/dashboard",
    },
    {
      name: "Danh sách hợp đồng",
      key: "contract",
      path: "/insider_transaction/contract",
    },
    {
      name: "Phê duyệt hợp đồng",
      key: "approve_contract",
      path: "/approve_contract",
    },
    {
      name: "Thông tin bộ phận",
      key: "division_info",
      path: "/division_info",
    },
  ],
  SUPPLY_STAFF: [
    {
      name: "Dashboard",
      key: "dashboard",
      path: "/dashboard",
    },
    // {
    //   name: "Giao dịch nội bộ",
    //   key: "insider_transaction",
    //   path: "/insider_transaction",
    //   submenu: [
    //     {
    //       name: "Danh sách hợp đồng",
    //       key: "contract",
    //       path: "/insider_transaction/contract",
    //     },
    //   ],
    // },
    // {
    //   name: "Thông tin bộ phận",
    //   key: "division_info",
    //   path: "/division_info",
    // },
  ],
  BUSINESS_STAFF: [
    {
      name: "Dashboard",
      key: "dashboard",
      path: "/dashboard",
    },
    {
      name: "Danh sách hợp đồng",
      key: "contract",
      path: "/insider_transaction/contract",
    },
    {
      name: "Thêm hợp đồng",
      key: "add_contract",
      path: "/insider_transaction/add_contract",
    },
    {
      name: "Yêu cầu phê duyệt",
      key: "request_admin",
      path: "/insider_transaction/request_admin",
    },
    // {
    //   name: "Giao dịch nội bộ",
    //   key: "insider_transaction",
    //   path: "/insider_transaction",
    //   submenu: [
    //   ],
    // },
    {
      name: "Thông tin bộ phận",
      key: "division_info",
      path: "/division_info",
    },
  ],
  HUMANRESOURCE_STAFF: [
    {
      name: "Dashboard",
      key: "dashboard",
      path: "/dashboard",
    },
  ],
  SUPERVISOR: [
    {
      name: "Dashboard",
      key: "dashboard",
      path: "/dashboard",
    },
    {
      name: "Kế hoạch",
      key: "schedules",
      path: "/schedules",
    },
    {
      name: "Tiếp nhận kế hoạch",
      key: "receive_information",
      path: "/receive_information",
    },
    {
      name: "Thông tin bộ phận",
      key: "division_info",
      path: "/division_info",
    },
  ],
};

// ["management", "admin", "staff", "monitoring"]
