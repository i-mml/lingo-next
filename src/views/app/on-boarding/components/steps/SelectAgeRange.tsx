import Lottie from "lottie-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import OnBoardCard from "../OnBoardCard";
import BackIconComponent from "@/components/shared/BackIconComponent";
import { IOnboardData } from "@/types/on-boarding";
import OnBoardBottomNav from "../OnBoardBottomNav";
import { UserCircle } from "lucide-react";
import AgeRange from "@/assets/lotties/onboarding-calendar.json";

interface IProps {
  step: number;
  setOnBoardData: Dispatch<SetStateAction<IOnboardData>>;
  nextAction: () => void;
  prevAction: () => void;
}

const ageRanges = [
  {
    id: 1,
    label: "زیر ۱۲ سال",
    icon: <UserCircle className="w-6 h-6 text-primary" />,
  },
  {
    id: 2,
    label: "۱۳ تا ۱۸ سال",
    icon: <UserCircle className="w-6 h-6 text-primary" />,
  },
  {
    id: 3,
    label: "۱۹ تا ۲۵ سال",
    icon: <UserCircle className="w-6 h-6 text-primary" />,
  },
  {
    id: 4,
    label: "۲۶ تا ۴۰ سال",
    icon: <UserCircle className="w-6 h-6 text-primary" />,
  },
  {
    id: 5,
    label: "۴۱ سال به بالا",
    icon: <UserCircle className="w-6 h-6 text-primary" />,
  },
];

const SelectAgeRange = (props: IProps) => {
  const { step, setOnBoardData, nextAction, prevAction } = props;
  const [selected, setSelected] = useState<number | null>(null);

  const handleNextAction = () => {
    setOnBoardData((prevData) => ({
      ...prevData,
      age_range: selected,
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
          animationData={AgeRange}
          className="w-20 h-20 lg:w-24 lg:h-24 mx-auto"
        />
      </div>
      <div className="title text-main text-base md:text-xl font-semibold mt-6">
        بازه سنی خود را انتخاب کنید
      </div>
      <div className="w-full my-4 mx-auto flex flex-col gap-3 min-h-[250px]">
        {ageRanges.map((item) => (
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

export default SelectAgeRange;
