import Lottie from "lottie-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import OnBoardCard from "../OnBoardCard";
import BackIconComponent from "@/components/shared/BackIconComponent";
import { IOnboardData } from "@/types/on-boarding";
import OnBoardBottomNav from "../OnBoardBottomNav";
import { BookOpen, Users2, UserCog } from "lucide-react";
import LearningPreference from "@/assets/lotties/onboarding-how-learn-better.json";

interface IProps {
  step: number;
  setOnBoardData: Dispatch<SetStateAction<IOnboardData>>;
  nextAction: () => void;
  prevAction: () => void;
}

const preferences = [
  {
    id: 1,
    label: "به صورت خودآموز و فردی",
    icon: <BookOpen className="w-6 h-6 text-blue-500" />,
  },
  {
    id: 2,
    label: "به صورت گروهی و با تعامل دیگران",
    icon: <Users2 className="w-6 h-6 text-orange-500" />,
  },
  {
    id: 3,
    label: "با نظارت و راهنمایی یک مربی خصوصی",
    icon: <UserCog className="w-6 h-6 text-green-600" />,
  },
];

const SelectLearningPreference = (props: IProps) => {
  const { step, setOnBoardData, nextAction, prevAction } = props;
  const [selected, setSelected] = useState<number | null>(null);

  const handleNextAction = () => {
    setOnBoardData((prevData) => ({
      ...prevData,
      learning_preference: selected,
    }));
    nextAction();
  };

  return (
    <OnBoardCard>
      <BackIconComponent
        className="absolute top-[-34px] z-[999]"
        clickHandler={prevAction}
      />
      <div className="earth-icon flex justify-center items-center">
        <Lottie
          animationData={LearningPreference}
          className="w-20 h-20 lg:w-24 lg:h-24 mx-auto"
        />
      </div>
      <div className="title text-main text-base md:text-xl font-semibold mt-6">
        چطوری بهتر یاد میگیری؟
      </div>
      <div className="w-full my-4 mx-auto flex flex-col gap-3 min-h-[250px]">
        {preferences.map((item) => (
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

export default SelectLearningPreference;
