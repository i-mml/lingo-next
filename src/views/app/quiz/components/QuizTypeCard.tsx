"use client";

import Lottie from "lottie-react";
import React from "react";

interface IProps {
  onClick: () => void;
  lottieFile: any;
  title: string;
}

const QuizTypeCard = (props: IProps) => {
  const { lottieFile, onClick, title } = props;
  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-center items-center bg-main w-[90%]
       py-3 md:py-12 rounded-lg cards-md-box-shadow cursor-pointer"
    >
      <Lottie
        animationData={lottieFile}
        className="w-24 h-24 md:w-40 md:h-40"
      />
      <div className="text-[16px] md:text-lg mt-2 font-medium text-main">
        {title || ""}
      </div>
    </div>
  );
};

export default QuizTypeCard;
