import React from "react";
import { useTranslation } from "react-i18next";

import FalseMarkIcon from "@/assets/false_answer_mark.svg";
import RightMarkIcon from "@/assets/right_answer_mark.svg";
import Image from "next/image";
import PrimaryButton from "@/components/shared/PrimaryButton";

const QuizFinishedBox = ({
  answeredQuiz,
  handleReStartQuiz,
  quizResult,
  isPending,
}: {
  answeredQuiz: any;
  handleReStartQuiz: () => void;
  quizResult: any;
  isPending: boolean;
}) => {
  const { t: translate } = useTranslation();

  const rightAnswersCount = answeredQuiz?.filter(
    (node: any) => node?.is_correct
  )?.length;

  return (
    <section className="flex items-end gap-4 flex-col md:flex-row md:gap-[2.5%]">
      <div className="quiz-player-box w-full md:w-[28%]">
        <Image
          src={
            quizResult?.score > 88
              ? "/images/quiz_finish_cup.png"
              : "/images/quiz_well_cup.png"
          }
          className={`block mx-auto ${
            rightAnswersCount > 8
              ? "w-[130px] h-[120px] md:w-[192px] md:h-[178px]"
              : "w-[85px] h-[120px] md:w-[126px] md:h-[178px]"
          }`}
          alt="finished"
          width={rightAnswersCount > 8 ? 192 : 126}
          height={178}
        />
        <div className="well-done-title text-center text-[#fed702] text-lg font-bold leading-6 mt-3 md:mt-6">
          {translate("pages.quiz.Your_quiz_result", {
            right_answer_count: quizResult?.score,
          })}
        </div>
        <div className="well-done-title text-center text-[#fed702] text-lg font-bold leading-6 mt-3 md:mt-6">
          {quizResult?.score > 88
            ? translate("pages.quiz.Great_job")
            : translate("pages.quiz.Good_job")}
        </div>
        <div className="well-done-desc text-center mt-2 md:mt-3 text-gray400 text-sm leading-5 ">
          {translate("pages.quiz.You_answered_questions_great", {
            right_answer_count: rightAnswersCount,
          })}
        </div>
        <PrimaryButton
          onClick={handleReStartQuiz}
          className="hidden md:block resstart-quiz-button w-full md:mt-6"
          buttonProps={{
            disabled: isPending,
          }}
        >
          {isPending
            ? translate("pages.quiz.Preparing_new_quiz")
            : translate("pages.quiz.Restart_quiz")}
        </PrimaryButton>
      </div>
      <div className="question-content flex-1 flex items-center gap-4 md:gap-6 md:max-h-[350px] md:overflow-y-auto flex-wrap">
        {answeredQuiz?.map((node: any) => (
          <div
            className={`answer-item w-full md:w-[calc(50%-12px)] rounded-xl border border-borderMain text-main bg-transparent p-2 flex items-center gap-2 md:gap-4 cursor-pointer ${
              node?.isRight
                ? "right-answer-item text-[#225d1e]"
                : "false-answer-item text-[#a80929]"
            } `}
            key={node?.text}
          >
            <div className="answer-text-box flex items-center gap-3 flex-1">
              <span className="answer-translate-value text-main text-xs w-[48%]">
                {node?.correct_option?.text}
              </span>
              <span className="answer-text-divider w-[1px] h-3 block border border-borderMain"></span>
              <span className="answer-text-value text-left w-[48%] leading-4 text-sm text-main">
                {node?.text}
              </span>
            </div>
            {node?.is_correct ? <RightMarkIcon /> : <FalseMarkIcon />}
          </div>
        ))}
      </div>
      <PrimaryButton
        onClick={handleReStartQuiz}
        className="md:hidden resstart-quiz-button w-full md:mt-6"
        buttonProps={{
          disabled: isPending,
        }}
      >
        {isPending
          ? translate("pages.quiz.Preparing_new_quiz")
          : translate("pages.quiz.Restart_quiz")}
      </PrimaryButton>
    </section>
  );
};

export default QuizFinishedBox;
