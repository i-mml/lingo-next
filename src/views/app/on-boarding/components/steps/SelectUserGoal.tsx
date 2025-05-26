import Lottie from "lottie-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import OnBoardCard from "../OnBoardCard";
import BackIconComponent from "@/components/shared/BackIconComponent";
import { IOnboardData } from "@/types/on-boarding";
import OnBoardBottomNav from "../OnBoardBottomNav";
import UserGoal from "@/assets/lotties/onboarding-user-goal.json";

import {
  BookOpen,
  Briefcase,
  Brain,
  Users,
  GraduationCap,
  Plane,
  MoreHorizontal,
} from "lucide-react";

interface IProps {
  step: number;
  setOnBoardData: Dispatch<SetStateAction<IOnboardData>>;
  nextAction: () => void;
  prevAction: () => void;
}

const userGoals = [
  {
    id: 1,
    label: "ارتقای شغلی",
    icon: <Briefcase className="w-6 h-6 text-primary mr-2" />,
  },
  {
    id: 2,
    label: "علاقه شخصی",
    icon: <Brain className="w-6 h-6 text-pink-500 mr-2" />,
  },
  {
    id: 3,
    label: "ارتباط بهتر با دیگران",
    icon: <Users className="w-6 h-6 text-yellow-500 mr-2" />,
  },
  {
    id: 4,
    label: "ارتقای تحصیلی",
    icon: <GraduationCap className="w-6 h-6 text-green-600 mr-2" />,
  },
  {
    id: 5,
    label: "مهاجرت",
    icon: <Plane className="w-6 h-6 text-blue-500 mr-2" />,
  },
  {
    id: 6,
    label: "دیگر موارد",
    icon: <MoreHorizontal className="w-6 h-6 text-gray-400 mr-2" />,
  },
];

const SelectUserGoal = (props: IProps) => {
  const { step, setOnBoardData, nextAction, prevAction } = props;
  const [selected, setSelected] = useState<number | null>(null);

  const handleNextAction = () => {
    setOnBoardData((prevData) => ({
      ...prevData,
      user_goal: selected,
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
          animationData={UserGoal}
          className="w-20 h-20 lg:w-24 lg:h-24 mx-auto"
        />
      </div>
      <div className="title text-main text-base md:text-xl font-semibold mt-6">
        مهمترین هدفت از یادگیری زبان چیه؟
      </div>
      <div className="w-full my-4 mx-auto flex flex-col gap-3 min-h-[250px]">
        {userGoals.map((item) => (
          <div
            key={item.id}
            className={`user-goal-item py-[14px] rounded-lg border border-borderMain bg-transparent pr-4 w-full cursor-pointer hover:border-gray400 transition-all duration-150 ${
              selected === item.id
                ? "selected-user-goal !bg-[#3a3a3a] text-white border-primary"
                : "bg-backgroundMain text-main"
            } flex items-center gap-3`}
            onClick={() => setSelected(item.id)}
          >
            <span className="font-medium text-sm md:text-base flex items-center gap-3">
              {item.icon}
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <OnBoardBottomNav
        selected={selected !== null ? String(selected) : undefined}
        step={step}
        handleNextAction={handleNextAction}
      />
    </OnBoardCard>
  );
};

export default SelectUserGoal;
