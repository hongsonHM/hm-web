export const roles = {
  management: [
    {
      name: "Dashboard",
      key: "dashboard",
      path: "/dashboard",
    },
    {
      name: "Thông tin chung",
      key: "curriculum_manager",
      path: "/general",
      submenu: [
        {
          name: "Số lượng HĐ mở mới",
          key: "new_contracts",
          path: "/new_contracts",
        },
        {
          name: "Số lượng HĐ đã dừng",
          key: "stopped_contracts",
          path: "/stopped_contracts",
        },
        {
          name: "Doanh thu",
          key: "sales",
          path: "/sales",
        },
      ],
    },
    {
      name: "Giao nhiệm vụ",
      key: "assigned",
      path: "/assigned",
      submenu: [
        {
          name: "Bộ phận",
          key: "division",
          path: "/division",
        },
        {
          name: "Nhân viên",
          key: "staffs",
          path: "/staffs",
        },
        {
          name: "Khác",
          key: "other",
          path: "/other",
        },
      ]
    },
  ],
  admin: [
    {
      name: "Cập nhật thông tin",
      key: "update",
      path: "/update",
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
    }
  ],
  monitoring: [
    {
      name: "Dashboard",
      key: "dashboard",
      path: "/dashboard",
    },
  ],
  staff: [
    {
      name: "Dashboard",
      key: "dashboard",
      path: "/dashboard",
    },
    {
      name: "Giao dịch nội bộ",
      key: "insider_transaction",
      path: "/insider_transaction",
      submenu: [
        {
          name: "Hợp đồng",
          key: "contract",
          path: "/insider_transaction/contract",
        },
        // {
        //   name: "Chuyển thông tin tới Lãnh đạo, quản lý",
        //   key: "request_manager",
        //   path: "/request_manager",
        // },
        // {
        //   name: "Chuyển thông tin tới các bộ phận liên quan",
        //   key: "request_division",
        //   path: "/request_divssion",
        // },
      ]
    },
    {
      name: "Thông tin bộ phận",
      key: "division_info",
      path: "/division_info",
      submenu: [
        {
          name: "Nhân sự",
          key: "personnel",
          path: "/division_info/personnel",
        },
        {
          name: "Kinh doanh",
          key: "sales",
          path: "/division_info/sales",
        },
        {
          name: "Cung ứng",
          key: "supply",
          path: "/division_info/supply",
        },
        // {
        //   name: "Quản lý DV",
        //   key: "supply",
        //   path: "/supply",
        // },
        // {
        //   name: "Kế toán",
        //   key: "supply",
        //   path: "/supply",
        // },
      ]
    },
  ],
};
