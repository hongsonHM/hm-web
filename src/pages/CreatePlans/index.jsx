import React, { useState, useEffect } from "react";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent } from "../../configs/styled.global";
import { Steps, Button, message } from "antd";
import SelectContract from "./Steps/SelectContract";
import CreatePlan from "./Steps/CreatePlan";
import CreatePlanUnits from "./Steps/CreatePlanUnits";
import { FileSearchOutlined, FileAddOutlined, ApartmentOutlined, MonitorOutlined, SendOutlined } from "@ant-design/icons";
import { createPlan } from "../../apis/schedules";
import PreviewPlan from "./Steps/PreviewPlan";
import TransferTo from "./Steps/TransferTo";

const day = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const { Step } = Steps;

const CreatePlans = (props) => {
  const [current, setCurrent] = React.useState(0);
  const [selectedContract, setSelectedContract] = useState();
  const [selectedPlan, setSelectedPlan] = useState();
  const [selectedManager, setSelectedManager] = useState();
  const [selectedSupervisor, setSelectedSupervisor] = useState();
  const [planName, setPlanName] = useState();

  const nextSteps = () => {
    setCurrent(current + 1);
  };

  const handleNextSteps = () => {
    switch (current) {
      case 0:
        if (!selectedContract) {
          message.error("Vui lòng chọn một hợp đồng để tiếp tục !");
        } else nextSteps();

        break;
      case 1:
        if (!selectedPlan || !planName) {
          message.error("Vui lòng chọn một kế hoạch và Tên kế hoạch !");
        } else nextSteps();
        break;
      case 2:
        if (!selectedPlan) message.error("Chưa có tiểu bộ phận nào được thêm !");
        else nextSteps();
        break;
      default:
        nextSteps();
        break;
    }
  };

  const onFinish = async () => {
    const svcPlanDTO = {
      contractId: selectedContract.id,
      // defaultSuppervisorId: selectedSupervisor.id,
      // defaultSuppervisorName: `${selectedSupervisor.internalUser.firstName} ${selectedSupervisor.internalUser.lastName}`,
      serviceManager: {
        id: selectedManager.id,
      },
      suppervisor: {
        id: selectedSupervisor.id,
      },
      name: planName,
      // serviceManagerId: selectedManager.id,
      // serviceManagerName: `${selectedManager.internalUser.firstName} ${selectedManager.internalUser.lastName}`,
      status: true,
    };
    let a = [];
    selectedPlan.forEach((plan) => {
      const workOnDays = []; //
      [plan.mon, plan.tue, plan.wed, plan.thu, plan.fri, plan.sat, plan.sun].forEach((p, index) => {
        if (p * 1) workOnDays.push([day[index], p]);
      });
      let obj = {
        frequency: plan.frequency,
        // suppervisorId: selectedSupervisor.id,
        svcPlanPartDTOList: [
          {
            svcSpendTask: {
              id: plan.id,
            },
            startAt: plan.startAt,
            endAt: plan.endAt,
            periodic: 1,
            workOnDays: workOnDays.map((work) => work.join("-")).join(","),
          },
        ],
      };
      a.push(obj);
    });
    const dataToCreatePlan = {
      svcPlanDTO: svcPlanDTO,
      svcPlanUnitDTOList: a,
    };
    const response = await createPlan(dataToCreatePlan);
    if (response.status === 201) message.success("Tạo kế hoạch thành công !");
    else message.error("Tạo kế hoạch thất bại!");
  };

  const steps = [
    {
      title: "Chọn hợp đồng",
      icon: <FileSearchOutlined />,
      content: <SelectContract selectedContract={selectedContract} setSelectedContract={setSelectedContract} selectedPlan={selectedPlan} />,
    },
    {
      title: "Khởi tạo kế hoạch",
      icon: <FileAddOutlined />,
      content: (
        <CreatePlan
          setSelectedManager={setSelectedManager}
          setSelectedSupervisor={setSelectedSupervisor}
          setPlanName={setPlanName}
          selectedContract={selectedContract}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          setCurrent={setCurrent}
        />
      ),
    },
    {
      title: "Lịch làm việc",
      icon: <ApartmentOutlined />,
      content: <CreatePlanUnits selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />,
    },
    {
      title: "Xác nhận thông tin",
      icon: <MonitorOutlined />,
      content: <PreviewPlan selectedContract={selectedContract} selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />,
    },
    {
      title: "Chuyển tiếp thông tin",
      icon: <SendOutlined />,
      content: <TransferTo setSelectedManager={setSelectedManager} setSelectedSupervisor={setSelectedSupervisor} />,
    },
  ];

  return (
    <GlobalContent key="plans">
      <GlobalTitle title="Quản lý kế hoạch" level={3} color="#3eb8f8" />
      <br />
      <Steps current={current}>
        {steps.map((item, index) => (
          <Step icon={item.icon} key={item.title} title={item.title} />
        ))}
      </Steps>
      <br />

      <div className="steps-content">{steps[current].content}</div>

      {/* Step button and actions */}
      <div className="steps-action flex__center__center" style={{ padding: 15 }}>
        {current > 0 && (
          <Button size="large" style={{ margin: "0 8px" }} onClick={() => setCurrent(current - 1)}>
            Quay lại
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button size="large" type="primary" onClick={() => handleNextSteps()}>
            Tiếp theo
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            onClick={() => {
              if (selectedManager && selectedSupervisor) {
                onFinish();
              } else message.error("Vui lòng chọn bộ phận tiếp nhận !");
            }}
            size="large"
            type="primary"
          >
            Tạo hợp đồng
          </Button>
        )}
      </div>
    </GlobalContent>
  );
};

export default CreatePlans;
