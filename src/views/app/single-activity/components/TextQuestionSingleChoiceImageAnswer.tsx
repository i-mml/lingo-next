import React, { useState } from "react";
import { TextQuestionSingleChoiceImageAnswerActivity } from "../types";

interface Props {
  activity: TextQuestionSingleChoiceImageAnswerActivity;
  handleNext: () => void;
}

const TextQuestionSingleChoiceImageAnswer: React.FC<Props> = ({
  activity,
  handleNext,
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [disabledIndexes, setDisabledIndexes] = useState<number[]>([]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    if (disabledIndexes.includes(idx) || correctIndex !== null) return;
    setSelected(idx);
    if (activity.answers[idx].correct) {
      setCorrectIndex(idx);
      setTimeout(() => {
        setSelected(null);
        setCorrectIndex(null);
        setDisabledIndexes([]);
        handleNext();
      }, 1000);
    } else {
      setDisabledIndexes((prev) => [...prev, idx]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pt-8 flex flex-col items-center">
      <div className="mb-12 flex items-center justify-center">
        <div className="flex items-center justify-center w-40 h-40 rounded-full border-2 border-dashed border-primary">
          <span className="text-2xl font-bold text-main">
            {activity.question.text}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-12 items-center justify-center w-full">
        {activity.answers.map((ans, idx) => {
          const isCorrect = correctIndex === idx;
          const isSelected = selected === idx;
          const isDisabled =
            disabledIndexes.includes(idx) || correctIndex !== null;
          return (
            <button
              key={ans.image}
              className={`w-44 h-44 rounded-full overflow-hidden flex items-center justify-center shadow-lg transition-all
                ${isCorrect ? "border-4 border-green-500" : ""}
                ${
                  isSelected && !isCorrect
                    ? "border-4 border-red-500 opacity-50"
                    : ""
                }
                ${
                  isDisabled && !isCorrect
                    ? "opacity-50 cursor-not-allowed border-2 border-gray-200"
                    : "border-2 border-transparent"
                }
                ${
                  !isCorrect && !isSelected && !isDisabled
                    ? "hover:shadow-primary/40"
                    : ""
                }
              `}
              onClick={() => handleSelect(idx)}
              disabled={isDisabled}
              style={{
                boxShadow: isCorrect
                  ? "0 0 0 4px #22c55e, 0 4px 24px 0 rgba(34,197,94,0.2)"
                  : isSelected && !isCorrect
                  ? "0 0 0 4px #ef4444, 0 4px 24px 0 rgba(239,68,68,0.2)"
                  : undefined,
              }}
            >
              <img
                src={ans.image}
                alt="answer"
                className="w-36 h-36 object-cover rounded-full"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TextQuestionSingleChoiceImageAnswer;
