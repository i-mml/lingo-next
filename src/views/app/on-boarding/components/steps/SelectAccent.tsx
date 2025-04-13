"use client";

import { GetUserPreferencesAccents } from "@/api/services/user-preferences";
import EnglishFlag from "@/assets/english-flag.svg";
import UsaFlag from "@/assets/us.svg";
import { IAvailableLanguage, IOnboardData } from "@/types/on-boarding";
import { useQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useState } from "react";
import OnBoardCard from "../OnBoardCard";
import BackIconComponent from "@/components/shared/BackIconComponent";

import AccentIcon from "@/assets/accent.svg";
import { CircularProgress } from "@mui/material";
import AvailableAccentItem from "../AvailableAccentItem";
import OnBoardBottomNav from "../OnBoardBottomNav";

interface IProps {
  step: number;
  setOnBoardData: Dispatch<SetStateAction<IOnboardData>>;
  nextAction: () => void;
  prevAction: () => void;
  languageId: number | undefined;
}

export const availableLanguageAccent: IAvailableLanguage[] = [
  {
    id: 1,
    icon: <UsaFlag />,
    name: "American",
    disabled: false,
  },
  {
    id: 2,
    icon: <EnglishFlag />,
    name: "British",
    disabled: false,
  },
];
const SelectAccent = (props: IProps) => {
  const { step, setOnBoardData, nextAction, prevAction, languageId } = props;

  const [selected, setSelected] = useState<any>(null);

  const { isLoading } = useQuery({
    queryKey: ["get-accents-list"],
    queryFn: () => GetUserPreferencesAccents(Number(languageId)),
  });

  const handleNextAction = () => {
    setOnBoardData((prevData) => ({ ...prevData, accent: selected?.id }));
    nextAction();
  };

  return (
    <OnBoardCard>
      <BackIconComponent
        className="absolute top-[-34px] z-[999]"
        clickHandler={prevAction}
      />

      <div className="earth-icon">
        <AccentIcon className="w-[100%]" />
      </div>
      <div className="title text-main text-base md:text-xl font-semibold mt-6">
        چه لهجه‌ای رو ترجیح می‌دی؟
      </div>

      {isLoading ? (
        <CircularProgress className="circular-spinner" />
      ) : (
        <div className="available-accent-list w-[80%] md:w-full mx-auto min-h-[350px] md:min-h-60 md:min-w-[280px] mt-8 flex items-stretch justify-between flex-wrap">
          {availableLanguageAccent?.map((item: any) => (
            <AvailableAccentItem
              item={item}
              selected={selected}
              setSelected={setSelected}
              key={item?.id}
            />
          ))}
        </div>
      )}
      <OnBoardBottomNav
        selected={selected}
        step={step}
        handleNextAction={handleNextAction}
      />
    </OnBoardCard>
  );
};

export default SelectAccent;
