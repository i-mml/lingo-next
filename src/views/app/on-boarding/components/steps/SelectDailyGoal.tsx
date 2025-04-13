import Lottie from "lottie-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import OnBoardCard from "../OnBoardCard";
import BackIconComponent from "@/components/shared/BackIconComponent";
import { IOnboardData } from "@/types/on-boarding";
import TimeClock from "@/assets/lotties/clock-time-linear.json";
import OnBoardBottomNav from "../OnBoardBottomNav";

interface IProps {
  step: number;
  setOnBoardData: Dispatch<SetStateAction<IOnboardData>>;
  nextAction: () => void;
  prevAction: () => void;
}
export const availableGoals = [
  {
    id: 1,
    timeTitle: "10 دقیقه / در روز",
    motiveTitle: "تفریحی",
    value: 10,
  },
  {
    id: 2,
    timeTitle: "20 دقیقه / در روز",
    motiveTitle: "معمولی",
    value: 20,
  },
  {
    id: 3,
    timeTitle: "30 دقیقه / در روز",
    motiveTitle: "هدفمند",
    value: 30,
  },
  {
    id: 4,
    timeTitle: "1 ساعت / در روز",
    motiveTitle: "پرقدرت",
    value: 60,
  },
  {
    id: 5,
    timeTitle: "بیش از 1 ساعت / در روز",
    motiveTitle: "بینظیر",
    value: 99,
  },
];

const SelectDailyGoal = (props: IProps) => {
  const { step, setOnBoardData, nextAction, prevAction } = props;

  const [selected, setSelected] = useState<any>(null);

  const handleNextAction = () => {
    setOnBoardData((prevData) => ({
      ...prevData,
      daily_goal: selected?.value,
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
      <div className="title">
        روزانه چقدر زمان برای یادگیری زبان میتونی بزاری؟{" "}
      </div>

      <div className="available-language-list w-full mt-10 mx-auto flex items-start justify-between flex-wrap min-h-[350px] md:min-h-[300px]">
        {availableGoals?.map((item) => (
          <div
            className={`w-full text-main rounded-lg flex items-center !justify-between py-2 px-[3%] shadow-md mb-2 lg:mb-0 cursor-pointer ${
              selected?.value === item?.value
                ? "bg-primary shadow-gray-300"
                : "bg-backgroundMain shadow-gray-500"
            }`}
            key={item?.id}
            onClick={() => setSelected(item)}
          >
            <span>{item?.timeTitle}</span>
            <span>{item?.motiveTitle}</span>
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

export default SelectDailyGoal;
