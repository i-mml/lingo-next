import Lottie from "lottie-react";
import React from "react";
import { useTranslation } from "react-i18next";
import ExamLottie from "@/assets/lotties/exam_lineal.json";
import PrimaryButton from "@/components/shared/PrimaryButton";

const QuizEmptyBox = ({
  clickAction,
  quizType,
}: {
  clickAction: () => void;
  quizType: "FLASHCARD" | "MOVIE" | "GRAMMAR" | "LESSON_WORDS" | "";
}) => {
  const { t: translate } = useTranslation();

  const emptyMessageByType: any = {
    MOVIE: "pages.quiz.Choose_Another_Movie",
    FLASHCARD: "pages.quiz.There_Is_No_Flashcard",
    GRAMMAR: "pages.quiz.Choose_Another_Grammar",
  };

  return (
    <div className="ready-box">
      <Lottie
        animationData={ExamLottie}
        className="w-24 h-24 lg:w-32 lg:h-32 rotate-[-20deg] mb-4"
      />
      <div className="are-you-ready">
        {translate("pages.quiz.There_Is_No_Flashcard_Title")}
      </div>

      <div className="are-you-ready-desc">
        {translate(emptyMessageByType?.[quizType])}
      </div>
      <PrimaryButton onClick={clickAction} className="start-quiz-button">
        {translate("defaults.container.Back Icon")}
      </PrimaryButton>
    </div>
  );
};

export default QuizEmptyBox;
