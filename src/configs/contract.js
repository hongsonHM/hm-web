import { DatePicker, Select } from "antd";

export const initialContract = {
  documentId: {
    value: "",
    label: "Số văn bản",
    type: String,
    required: false,
  },
  appendicesNumber: {
    value: "",
    label: "Số phụ lục",
    type: String,
    required: false,
  },
  effectiveTimeFrom: {
    value: "",
    label: "Bắt đầu",
    type: DatePicker,
    required: true,
  },
  effectiveTimeTo: {
    value: "",
    label: "Kết thúc",
    type: DatePicker,
    required: true,
  },
  durationMonth: {
    value: "",
    label: "Thời lượng  ( Tháng )",
    type: Number,
    required: true,
  },
  value: {
    value: "",
    label: "Giá trị thực tế",
    type: String,
    required: true,
  },
  contractValue: {
    value: "",
    label: "Giá trị tổng hợp đồng",
    type: String,
    required: true,
  },
  humanResources: {
    value: "",
    label: "Nhân sự (nếu có)",
    type: String,
    required: false,
  },
  humanResourcesWeekend: {
    value: "",
    label: "Cuối tuần (nếu có)",
    type: String,
    required: false,
  },
  subDepartment: {
    value: "",
    label: "Tiểu bộ phận",
    type: String,
    required: false,
  },
  fileId: {
    value: "",
    label: "Quyển",
    type: String,
    required: false,
  },
  content: {
    value: "",
    label: "Nội dung",
    type: String,
    required: true,
  },
  subjectCount: {
    value: "",
    label: "Số đối tượng (đếm)",
    type: Number,
    required: false,
  },
  valuePerPerson: {
    value: "",
    label: "Giá trị người (chia)",
    type: String,
    required: false,
  },
  year: {
    value: "",
    label: "Năm",
    type: "Year",
    required: false,
  },
  file: {
    value: "",
    label: "File đính kèm",
    type: File,
    required: false,
  },
};
