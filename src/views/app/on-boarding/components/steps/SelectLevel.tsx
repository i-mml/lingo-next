import React, { Dispatch, SetStateAction, useState } from "react";

import LanguageLevelIcon from "@/assets/language-level.svg";
import { ILanguageLevel, IOnboardData } from "@/types/on-boarding";
import OnBoardCard from "../OnBoardCard";
import BackIconComponent from "@/components/shared/BackIconComponent";
import LanguageLevelItem from "../LanguageLevelItem";
import OnBoardBottomNav from "../OnBoardBottomNav";

interface IProps {
  step: number;
  setOnBoardData: Dispatch<SetStateAction<IOnboardData>>;
  nextAction: () => void;
  prevAction: () => void;
  setStep: Dispatch<SetStateAction<number>>;
  languageId: number | undefined;
}

export const availabelLevels: ILanguageLevel[] = [
  {
    id: 1,
    englishLevel: "A1",
    translatedLevel: "مبتدی",
    disabled: false,
  },
  {
    id: 2,
    englishLevel: "A2",
    translatedLevel: "پیش متوسط",
    disabled: false,
  },
  {
    id: 3,
    englishLevel: "B1",
    translatedLevel: "متوسط",
    disabled: false,
  },
  {
    id: 4,
    englishLevel: "B2",
    translatedLevel: "بالاتر از متوسط",
    disabled: false,
  },
  {
    id: 5,
    englishLevel: "C1",
    translatedLevel: "مقدمه سطح پیشرفته",
    disabled: false,
  },
  {
    id: 6,
    englishLevel: "C2",
    translatedLevel: "پیشرفته",
    disabled: false,
  },
];

const SelectLevel = (props: IProps) => {
  const { step, setOnBoardData, nextAction, setStep, languageId } = props;
  const [selected, setSelected] = useState<any>();

  const handleNextAction = () => {
    nextAction();
  };

  const handlePrev = () => {
    if (languageId !== 2) {
      setStep(2);
      return;
    }
    setStep(3);
  };

  return (
    <OnBoardCard>
      <BackIconComponent
        className="absolute top-[-34px] z-[999]"
        clickHandler={handlePrev}
      />

      <div className="earth-icon">
        <LanguageLevelIcon className="w-[100%]" />
      </div>
      <div className="title text-main text-base md:text-xl font-semibold mt-6">
        سطح زبان خودتون رو چجوری می‌بینید؟
      </div>

      <div className="language-level-list w-full mt-5 mx-auto flex items-stretch justify-between flex-wrap min-h-[350px] md:min-h-[300px]">
        {availabelLevels?.map((item: ILanguageLevel) => (
          <LanguageLevelItem
            item={item}
            selected={selected}
            setSelected={(e: number) => {
              setSelected(e);
              setOnBoardData((prevData) => ({ ...prevData, level: e }));
            }}
            key={item?.id}
          />
        ))}
      </div>
      <OnBoardBottomNav
        selected={selected}
        step={step}
        handleNextAction={handleNextAction}
      />
    </OnBoardCard>
  );
};

export default SelectLevel;
