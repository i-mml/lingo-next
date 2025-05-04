import React, { useState, useRef } from "react";
import { ImageQuestionSingleChoiceTextAnswerActivity } from "../types";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useAudioPlayer } from "@/hooks/use-audio-player";

interface Props {
  activity: ImageQuestionSingleChoiceTextAnswerActivity;
  handleNext: () => void;
}

const ImageQuestionSingleChoiceTextAnswer: React.FC<Props> = ({
  activity,
  handleNext,
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [disabledIndexes, setDisabledIndexes] = useState<number[]>([]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);

  const { playAudio } = useAudioPlayer(activity.question.audio);

  const handleSelect = (idx: number) => {
    if (disabledIndexes.includes(idx) || correctIndex !== null) return;
    setSelected(idx);

    if (activity.answers[idx].correct) {
      setCorrectIndex(idx);
      playAudio();
      setTimeout(() => {
        handleNext();
        setSelected(null);
        setCorrectIndex(null);
        setDisabledIndexes([]);
      }, 1000);
    } else {
      setDisabledIndexes((prev) => [...prev, idx]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto pt-8 flex flex-col items-center">
      {/* Image */}
      <div className="flex flex-col items-center mb-8">
        <div className="rounded-full overflow-hidden w-36 h-36 md:w-44 md:h-44 flex items-center justify-center border-4 border-gray-200 shadow-lg mb-4 relative bg-white">
          <img
            src={activity.question.image}
            alt="question"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      {/* Answers */}
      <div className="grid grid-cols-3 gap-4 place-items-center mt-4 w-full">
        {activity.answers.map((ans, idx) => {
          const isCorrect = correctIndex === idx;
          const isDisabled =
            disabledIndexes.includes(idx) || correctIndex !== null;
          return (
            <button
              key={`${activity?.id}-${idx}`}
              className={`
                w-[100px] h-[100px] text-main rounded-full flex items-center justify-center text-xl font-bold
                transition-all shadow-lg
                ${
                  isCorrect
                    ? "border-4 border-green-500 shadow-green-300 bg-green-50 text-green-700"
                    : ""
                }
                ${
                  disabledIndexes.includes(idx)
                    ? "bg-backgroundDisabled text-gray400 border border-gray-200 cursor-not-allowed"
                    : "bg-backgroundMain border border-gray-200"
                }
                ${
                  !isCorrect && !disabledIndexes.includes(idx)
                    ? "hover:shadow-primary/40"
                    : ""
                }
              `}
              onClick={() => handleSelect(idx)}
              disabled={isDisabled}
              style={{
                boxShadow: isCorrect
                  ? "0 0 0 4px #22c55e, 0 4px 24px 0 rgba(34,197,94,0.2)"
                  : undefined,
              }}
            >
              {ans.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ImageQuestionSingleChoiceTextAnswer;
