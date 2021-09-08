export const roles = {
  SERVICE_MANAGER: [
    {
      name: "Dashboard",
      key: "dashboard",
      path: "/dashboard",
    },
    {
      name: "Kế hoạch",
      key: "schedules_record",
      path: "/schedules_record",
    },
    // {
    //   name: "Thêm người dùng",
    //   key: "add_user",
    //   path: "/add_user",
    // },
    // {
    //   name: "Xóa người dùng",
    //   key: "del_user",
    //   path: "/del_user",
    // },
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
      name: "Thêm người dùng",
      key: "add_user",
      path: "/add_user",
    },
    {
      name: "Xóa người dùng",
      key: "del_user",
      path: "/del_user",
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
    {
      name: "Lên kế hoạch",
      key: "schedules",
      path: "/schedules",
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
};

// ["management", "admin", "staff", "monitoring"]
