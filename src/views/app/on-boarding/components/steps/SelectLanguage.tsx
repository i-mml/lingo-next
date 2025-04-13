"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import ChinaFlag from "@/assets/cn.svg";
import GermanyFlag from "@/assets/de.svg";
import EarthIcon from "@/assets/earth.svg";
import EnglishFlag from "@/assets/english-flag.svg";
import SpainFlag from "@/assets/es.svg";
import FranceFlag from "@/assets/fr.svg";
import ItalyFlag from "@/assets/it.svg";
import { IAvailableLanguage, IOnboardData } from "@/types/on-boarding";
import OnBoardCard from "../OnBoardCard";
import AvailableLanguageItem from "../AvailableLanguageItem";
import OnBoardBottomNav from "../OnBoardBottomNav";
import BackIconComponent from "@/components/shared/BackIconComponent";

export const availableLanguage: IAvailableLanguage[] = [
  {
    id: 2,
    icon: <EnglishFlag />,
    name: "انگلیسی",
    disabled: false,
  },
  {
    id: 5,
    icon: <GermanyFlag />,
    name: "آلمانی",
    disabled: false,
  },
  {
    id: 3,
    icon: <SpainFlag />,
    name: "اسپانیایی",
    disabled: true,
  },
  {
    id: 4,
    icon: <FranceFlag />,
    name: "فرانسوی",
    disabled: true,
  },
  {
    id: 6,
    icon: <ItalyFlag />,
    name: "ایتالیایی",
    disabled: true,
  },
  {
    id: 7,
    icon: <ChinaFlag />,
    name: "چینی",
    disabled: true,
  },
];

interface IProps {
  step: number;
  setOnBoardData: Dispatch<SetStateAction<IOnboardData>>;
  nextAction: () => void;
  setStep: Dispatch<SetStateAction<number>>;
  prevAction: () => void;
}

const SelectLanguage = (props: IProps) => {
  const { step, setOnBoardData, setStep, prevAction } = props;

  const [selected, setSelected] = useState<any>(null);
  console.log(selected);

  const handleNextAction = () => {
    setOnBoardData((prevData) => ({ ...prevData, language: selected }));
    if (selected?.id !== 2) {
      setStep(4);
      return;
    }
    setStep(3);
  };

  return (
    <OnBoardCard>
      <BackIconComponent
        className="absolute top-[-34px] z-[999]"
        clickHandler={prevAction}
      />
      <div className="earth-icon">
        <EarthIcon className="w-[100%]" />
      </div>
      <div className="title text-main text-base md:text-xl font-semibold mt-6">
        چه زبانی رو می‌خوای یاد بگیری؟
      </div>

      <div className="available-language-list w-full mt-10 mx-auto flex items-start justify-between flex-wrap min-h-[350px] md:min-h-[300px]">
        {availableLanguage?.map((item: IAvailableLanguage) => (
          <AvailableLanguageItem
            item={item}
            selected={selected}
            key={item?.id}
            setSelected={setSelected}
          />
        ))}
      </div>
      <OnBoardBottomNav
        selected={selected?.id}
        step={step}
        handleNextAction={handleNextAction}
      />
    </OnBoardCard>
  );
};

export default SelectLanguage;
