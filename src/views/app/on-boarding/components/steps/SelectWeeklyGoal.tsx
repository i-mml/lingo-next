import Lottie from "lottie-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import OnBoardCard from "../OnBoardCard";
import BackIconComponent from "@/components/shared/BackIconComponent";
import { IOnboardData } from "@/types/on-boarding";
import TimeClock from "@/assets/lotties/clock-time-linear.json";
import OnBoardBottomNav from "../OnBoardBottomNav";
import { Clock } from "lucide-react";

interface IProps {
  step: number;
  setOnBoardData: Dispatch<SetStateAction<IOnboardData>>;
  nextAction: () => void;
  prevAction: () => void;
}

export const availableWeeklyGoals = [
  {
    id: 1,
    timeTitle: "1-2 ساعت / در هفته",
    motiveTitle: "تفریحی",
    value: 1,
    icon: <Clock className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    timeTitle: "3-4 ساعت / در هفته",
    motiveTitle: "معمولی",
    value: 2,
    icon: <Clock className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    timeTitle: "5-7 ساعت / در هفته",
    motiveTitle: "هدفمند",
    value: 3,
    icon: <Clock className="w-6 h-6 text-primary" />,
  },
  {
    id: 4,
    timeTitle: "8-10 ساعت / در هفته",
    motiveTitle: "پرقدرت",
    value: 4,
    icon: <Clock className="w-6 h-6 text-primary" />,
  },
  {
    id: 5,
    timeTitle: "بیش از 10 ساعت / در هفته",
    motiveTitle: "بینظیر",
    value: 5,
    icon: <Clock className="w-6 h-6 text-primary" />,
  },
];

const SelectWeeklyGoal = (props: IProps) => {
  const { step, setOnBoardData, nextAction, prevAction } = props;
  const [selected, setSelected] = useState<any>(null);

  const handleNextAction = () => {
    setOnBoardData((prevData) => ({
      ...prevData,
      weekly_time: selected?.value,
    }));
    nextAction();
  };

  return (
    <OnBoardCard>
      <BackIconComponent
        className="absolute top-[-34px] z-[999]"
        clickHandler={prevAction}
      />
      <div className="earth-icon">
        <Lottie
          animationData={TimeClock}
          className="w-20 h-20 lg:w-24 lg:h-24 mx-auto"
        />
      </div>
      <div className="title text-main text-base md:text-xl font-semibold mt-6">
        هفتگی چقدر زمان برای یادگیری زبان میتونی بزاری؟
      </div>
      <div className="w-full my-4 mx-auto flex flex-col gap-3 min-h-[250px]">
        {availableWeeklyGoals?.map((item) => (
          <div
            key={item.id}
            className={`user-goal-item py-[14px] rounded-lg border border-borderMain bg-transparent pr-4 w-full cursor-pointer hover:border-gray400 transition-all duration-150 ${
              selected?.value === item.value
                ? "selected-user-goal !bg-[#3a3a3a] text-white border-primary"
                : "bg-backgroundMain text-main"
            } flex items-center gap-3`}
            onClick={() => setSelected(item)}
          >
            <span className="font-medium text-sm md:text-base flex items-center gap-3">
              {item.icon}
              {item.timeTitle}
              <span className="text-xs text-gray-400">{item.motiveTitle}</span>
            </span>
          </div>
        ))}
      </div>
      <OnBoardBottomNav
        selected={selected?.value}
        step={step}
        handleNextAction={handleNextAction}
      />
    </OnBoardCard>
  );
};

export default SelectWeeklyGoal;
