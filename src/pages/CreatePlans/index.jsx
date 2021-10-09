import React, { useState, useEffect } from "react";
import GlobalTitle from "../../components/GlobalTitle";
import { GlobalContent } from "../../configs/styled.global";
import { Steps, Button, message } from "antd";
import SelectContract from "./Steps/SelectContract";
import CreatePlan from "./Steps/CreatePlan";
import CreatePlanUnits from "./Steps/CreatePlanUnits";
import { FileSearchOutlined, FileAddOutlined, ProfileOutlined, SendOutlined } from "@ant-design/icons";
import { createPlan } from "../../apis/schedules";

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
        if (!selectedPlan) {
          message.error("Vui lòng chọn một kế hoạch hoặc tạo mới !");
        } else nextSteps();
        break;
      case 2:
        if (!selectedPlan) message.error("Chưa có tiểu bộ phận nào được thêm !");
        else {
          props.fetchPreviewSupplies();
        }
        break;
      default:
        nextSteps();
        break;
    }
  };

  const onFinish = async () => {
    const svcPlanDTO = {
      contractId: selectedContract.id,
      defaultSuppervisorId: selectedSupervisor.id,
      defaultSuppervisorName: `${selectedSupervisor.internalUser.firstName} ${selectedSupervisor.internalUser.lastName}`,
      name: planName,
      serviceManagerId: selectedManager.id,
      serviceManagerName: `${selectedManager.internalUser.firstName} ${selectedManager.internalUser.lastName}`,
      status: true,
    };
    let a = [];
    selectedPlan.forEach((plan) => {
      let obj = {
        frequency: plan.frequency,
        startAt: '2021-10-06',
        endAt: plan.endAt,
        suppervisorId: selectedSupervisor.id,
        svcPlanPartDTOList: [plan.mon, plan.tue, plan.wed, plan.thu, plan.fri, plan.sat, plan.sun]
          .filter((p) => {
            if (p * 1) return true;
            else return false;
          })
          .map((p, index) => {
            return {
              periodic: p,
              workOnDays: day[index],
            };
          }),
      };
      a.push(obj);
    });
    // const svcPlanUnitDTOList = {
    //   suppervisorId: selectedSupervisor.id,
    //   svcPlanPartDTOList: a,
    // };
    const dataToCreatePlan = {
      svcPlanDTO: svcPlanDTO,
      svcPlanUnitDTOList: a,
    };
    const response = await createPlan(dataToCreatePlan)
    console.log(dataToCreatePlan);
    console.log(response);
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
      icon: <FileAddOutlined />,
      content: <CreatePlanUnits selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />,
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
          <Button onClick={onFinish} size="large" type="primary">
            Tạo hợp đồng
          </Button>
        )}
      </div>
    </GlobalContent>
  );
};

export default CreatePlans;
