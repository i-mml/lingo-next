import { PlayerBox } from "@/components/shared/PlayerBox";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { useTextToAudio } from "@/hooks/use-text-to-audio";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SpeakerIcon from "@/assets//speaker.svg";
import PrimaryButton from "@/components/shared/PrimaryButton";

interface QuizBoxProps {
  handleMovieNextQuestion: (
    question: any,
    isRight: boolean,
    selected_option: any
  ) => void;
  currentQuestion: number;
  question: any;
  isLast: boolean;
  disabled: boolean;
}

const QuizBox = ({
  handleMovieNextQuestion,
  question,
  isLast = false,
  disabled,
}: QuizBoxProps) => {
  const { t: translate } = useTranslation();
  const { playAudio: playSuccess } = useAudioPlayer("/assets/correct.mp3");
  const { playAudio: playWrong } = useAudioPlayer("/assets/wrong.mp3");

  const [selectedAnswer, setSelectedAnswer] = useState<number | any>(null);
  const [options, setOptions] = useState<any>(question?.options);

  const playerRef = useRef(null);

  const onClickNext = () => {
    const selectedOption = question?.options?.find(
      (node: { id: number }) => node?.id === selectedAnswer
    );
    handleMovieNextQuestion(
      question,
      selectedOption?.is_answer,
      selectedAnswer
    );
    setSelectedAnswer(null);
    setOptions(null);
  };

  const handleSelectAnswer = (id: number) => {
    const selectedOption = question?.options?.find(
      (node: { id: number }) => node?.id === id
    );

    const isCorrent = selectedOption?.is_answer;
    if (isCorrent) {
      playSuccess();
    } else {
      playWrong();
    }
    setSelectedAnswer(id);
  };

  const { handleTextToSpeech } = useTextToAudio();

  useEffect(() => {
    setTimeout(() => {
      setOptions(question?.options);
    }, 100);
  }, [question]);

  return (
    <section className="flex items-start gap-4 md:gap-[2.5%] flex-col md:flex-row">
      {question?.flashcard?.file && (
        <div className="quiz-player-box w-full min-h-[125px] max-h-[200px] md:w-[49%]">
          <PlayerBox
            playerRef={playerRef}
            height="unset"
            file={question?.flashcard?.file}
            handleAction={() => console.log("")}
            withControlled={false}
            playerState
          />
        </div>
      )}
      <div className="question-content flex-1 w-full pt-4">
        <div className="quiz-text-box flex items-start gap-2">
          <div onClick={() => handleTextToSpeech({ text: question?.text })}>
            <SpeakerIcon />
          </div>
          <span className="quiz-text-value text-primary text-lg md:text-[22px] font-semibold leading-7">
            {question?.text}
          </span>
        </div>
        <div className="select-right-choice text-gray400 text-xs md:text-sm leading-5 mt-2 md:mt-3 mb-4 md:mr-6">
          {translate("pages.quiz.Select_right_choice")}
        </div>
        <div className="question-options-box flex-col md:flex-row flex-wrap w-full flex items-stretch gap-3 mb-3 md:mb-6 min-h-[204px] md:min-h-[186px]">
          {options?.map(
            (
              node: { id: number; text: string; is_answer: boolean },
              index: number
            ) => (
              <div
                onClick={
                  selectedAnswer === null
                    ? () => handleSelectAnswer(node?.id)
                    : () => {}
                }
                className={`question-options-item w-full md:w-[calc(50%-12px)] rounded-xl border p-2 flex items-center gap-4 cursor-pointer transition-colors duration-200
                  ${
                    selectedAnswer === null
                      ? "border-borderMain text-main bg-transparent hover:bg-backgroundMain/50"
                      : selectedAnswer === node?.id
                      ? node?.is_answer
                        ? "border-green-500 bg-[#0a2a09] text-[#97e590]"
                        : "border-red-500 bg-[#500111] text-[#ff9fa4]"
                      : node?.is_answer
                      ? "border-green-500 text-[#97e590]"
                      : "border-borderMain text-main opacity-50"
                  }
                  ${selectedAnswer !== null && "cursor-not-allowed"}
                `}
                key={node?.text}
              >
                <span
                  className={`question-option-number p-2 md:p-[14px] rounded-lg text-center transition-colors duration-200
                    ${
                      selectedAnswer === null
                        ? "border border-borderMain text-main"
                        : selectedAnswer === node?.id
                        ? node?.is_answer
                          ? "border border-green-500 text-[#97e590]"
                          : "border border-red-500 text-[#ff9fa4]"
                        : node?.is_answer
                        ? "border border-green-500 text-[#97e590]"
                        : "border border-borderMain text-main opacity-50"
                    }
                  `}
                >
                  {index + 1}
                </span>
                {node?.text}
              </div>
            )
          )}
        </div>

        <div>
          {!isLast ? (
            <PrimaryButton
              className="question-next-button flex justify-center items-center gap-2 w-full md:w-fit min-w-[160px] mr-auto flex-row-reverse"
              buttonProps={{
                type: "button",
                disabled: selectedAnswer === null || disabled,
              }}
              onClick={onClickNext}
            >
              {/* <LeftArrow /> */}
              {translate("pages.quiz.Next_quiz")}
            </PrimaryButton>
          ) : (
            <PrimaryButton
              className="question-next-button flex justify-center items-center gap-2 w-full md:w-fit min-w-[160px] mr-auto flex-row-reverse"
              buttonProps={{ type: "button", disabled: disabled }}
              onClick={onClickNext}
            >
              {translate("pages.quiz.Finish_quiz")}
            </PrimaryButton>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizBox;
