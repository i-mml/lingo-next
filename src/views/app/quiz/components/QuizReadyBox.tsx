import Lottie from "lottie-react";
import React from "react";
import { useTranslation } from "react-i18next";
import ExamLottie from "@/assets/lotties/exam_lineal.json";
import PrimaryButton from "@/components/shared/PrimaryButton";

const QuizReadyBox = ({ handleStartQuiz }: { handleStartQuiz: () => void }) => {
  const { t: translate } = useTranslation();

  return (
    <div className="ready-box flex items-center justify-center flex-col">
      <Lottie
        animationData={ExamLottie}
        className="w-24 h-24 lg:w-32 lg:h-32 rotate-[-20deg] mb-4"
      />
      <div className="are-you-ready text-main text-sm md:text-base mt-8 md:mt-2 mb-4 font-semibold leading-5">
        {translate("pages.quiz.Are_you_ready_title")}
      </div>
      <div className="are-you-ready-desc desc text-xs md:text-sm text-gray400 w-full md:w-[40%] text-center">
        {translate("pages.quiz.Are_you_ready_description")}
      </div>
      <PrimaryButton
        onClick={handleStartQuiz}
        className="start-quiz-button w-full md:w-[212px] mt-8"
      >
        {translate("pages.quiz.Start_quiz")}
      </PrimaryButton>
    </div>
  );
};

export default QuizReadyBox;
