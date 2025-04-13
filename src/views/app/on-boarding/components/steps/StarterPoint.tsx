"use client";

import Diversity2Icon from "@mui/icons-material/Diversity2";
import Lottie from "lottie-react";
import React, { Dispatch, SetStateAction } from "react";
import OnBoardCard from "../OnBoardCard";
import Welcome from "@/assets/lotties/welcome-lineal.json";
import { IOnboardData } from "@/types/on-boarding";
import OnBoardBottomNav from "../OnBoardBottomNav";
import InputWithIcon from "@/components/shared/InputWithIcon";

interface IProps {
  step: number;
  setOnBoardData: Dispatch<SetStateAction<IOnboardData>>;
  nextAction: () => void;
  prevAction: () => void;
  onBoardData: any;
}

const StarterPoint = (props: IProps) => {
  const { step, setOnBoardData, nextAction, prevAction, onBoardData } = props;

  const handleNextAction = () => {
    nextAction();
  };

  return (
    <OnBoardCard>
      <div className="earth-icon">
        <Lottie
          animationData={Welcome}
          className="w-20 h-20 lg:w-22 lg:h-22 mx-auto"
        />
      </div>
      <div className="title text-base md:text-xl font-semibold mt-6 !text-primary">
        به زبانو خوش اومدی
      </div>

      <div className="w-[91%] mx-auto ">
        <div className="text-center text-main mb-6 mt-2 text-sm lg:text-[16px]">
          برای اینکه بهترین کمک در پیشرفت زبانت رو دریافت کنی، لطفا سوالاتی که
          توی قدم‌های بعدی هستند رو پاسخ بده
        </div>
        <div className="text-right  text-sm lg:text-[16px] font-medium mb-1 mt-10 text-gray-300">
          کد معرف {"(اختیاری)"}
        </div>
        <div className="text-right text-gray400 text-[12px] lg:text-sm mb-2">
          با وارد کردن کد معرف دوستت، 5 روز{" "}
          <span className="text-primary font-medium">اشتراک رایگان</span> بهش
          هدیه کن.
          <br />
          کد معرف خودت هم در صفحه پروفایلت میتونی ببینی.
        </div>
        <InputWithIcon
          icon={<Diversity2Icon className="text-main" />}
          className="mt-3 mb-5"
          inputProps={{
            placeholder: "کد معرف دوستتان را وارد کنید",
            value: onBoardData?.referral_code || "",
            className: "placeholder:text-sm",
            onChange: (e) =>
              setOnBoardData((prevData) => ({
                ...prevData,
                referral_code: e.target.value,
              })),
          }}
        />
      </div>

      <OnBoardBottomNav
        selected={" "}
        step={step}
        handleNextAction={handleNextAction}
      />
    </OnBoardCard>
  );
};

export default StarterPoint;
