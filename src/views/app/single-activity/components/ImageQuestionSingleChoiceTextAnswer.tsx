import React, { useState } from "react";
import {
  ImageQuestionSingleChoiceTextAnswerActivity,
  TextQuestionSingleChoiceImageAnswerActivity,
} from "../types";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useAudioPlayer } from "@/hooks/use-audio-player";

interface Props {
  activity:
    | ImageQuestionSingleChoiceTextAnswerActivity
    | TextQuestionSingleChoiceImageAnswerActivity;
  handleNext: () => void;
}

const ImageQuestionSingleChoiceTextAnswer: React.FC<Props> = ({
  activity,
  handleNext,
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [disabledIndexes, setDisabledIndexes] = useState<number[]>([]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);

  const { playAudio } = useAudioPlayer(activity?.question?.audio || "");

  const handleSelect = (idx: number) => {
    if (disabledIndexes.includes(idx) || correctIndex !== null) return;
    setSelected(idx);

    const isCorrect =
      activity?.type === "imageQuestionSingleChoiceTextAnswer"
        ? (activity?.answers[idx] as { text: string; correct: boolean })
            ?.correct
        : (activity?.answers[idx] as { image: string; correct: boolean })
            ?.correct;

    if (isCorrect) {
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

  // Render for image-to-text
  if (activity?.type === "imageQuestionSingleChoiceTextAnswer") {
    return (
      <div className="w-full max-w-3xl mx-auto pt-8 flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
          <div className="rounded-full overflow-hidden w-36 h-36 md:w-44 md:h-44 flex items-center justify-center border-4 border-gray-200 shadow-lg mb-4 relative bg-white">
            <img
              src={activity?.question?.image}
              alt="question"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 place-items-center mt-4 w-full">
          {activity?.answers?.map((ans, idx) => {
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
                {(ans as { text: string }).text}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Render for text-to-image
  if (activity?.type === "textQuestionSingleChoiceImageAnswer") {
    return (
      <div className="w-full max-w-3xl mx-auto pt-8 flex flex-col items-center">
        <div className="mb-8 text-2xl font-bold text-center text-main">
          {activity?.question?.text}
        </div>

        <div className="grid grid-cols-3 gap-4 place-items-center mt-4 w-full">
          {activity?.answers?.map((ans, idx) => {
            const isCorrect = correctIndex === idx;
            const isDisabled =
              disabledIndexes.includes(idx) || correctIndex !== null;
            return (
              <button
                key={`${activity?.id}-${idx}`}
                className={`
                  w-[100px] h-[100px] rounded-full flex items-center justify-center
                  transition-all shadow-lg
                  ${
                    isCorrect
                      ? "border-4 border-green-500 shadow-green-300 bg-green-50"
                      : ""
                  }
                  ${
                    disabledIndexes.includes(idx)
                      ? "bg-backgroundDisabled border border-gray-200 cursor-not-allowed"
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
                <img
                  src={(ans as { image: string }).image}
                  alt={`option-${idx}`}
                  className="object-cover w-20 h-20 rounded-full"
                />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};

export default ImageQuestionSingleChoiceTextAnswer;
