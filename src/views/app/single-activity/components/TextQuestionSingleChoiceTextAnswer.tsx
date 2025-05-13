import React, { useState } from "react";

interface Props {
  activity: {
    id: string;
    text: string;
    type: "textQuestionSingleChoiceTextAnswer";
    answers: {
      text: string;
      correct: boolean;
    }[];
    feedback?: string | null;
    required?: boolean;
    statement?: string | null;
    translation?: string | null;
  };
  handleNext: () => void;
}

const TextQuestionSingleChoiceTextAnswer: React.FC<Props> = ({
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
      <div className="mb-8 text-2xl font-bold text-center text-main" dir="ltr">
        {activity.text}
      </div>
      <div className="grid grid-cols-1 gap-4 place-items-center mt-4 w-full">
        {activity.answers.map((ans, idx) => {
          const isCorrect = correctIndex === idx;
          const isSelected = selected === idx;
          const isDisabled =
            disabledIndexes.includes(idx) || correctIndex !== null;
          return (
            <button
              key={`${activity.id}-${idx}`}
              className={`w-full max-w-md py-4 rounded-full text-lg font-bold transition-all shadow
                ${
                  isCorrect
                    ? "border-2 border-green-500 bg-green-50 !text-green-700 shadow-green-200"
                    : ""
                }
                ${
                  isSelected && !isCorrect
                    ? "border-2 border-red-500 bg-red-50 text-red-700 shadow-red-200"
                    : ""
                }
                ${
                  isDisabled && !isSelected
                    ? "bg-backgroundLayout text-gray-400 border border-backgroundDisabled cursor-not-allowed"
                    : "bg-backgroundMain border border-gray-200 text-main"
                }
                ${
                  !isCorrect && !isSelected && !isDisabled
                    ? "hover:shadow-primary/40"
                    : ""
                }
              `}
              onClick={() => handleSelect(idx)}
              disabled={isDisabled}
              dir="ltr"
            >
              {ans.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TextQuestionSingleChoiceTextAnswer;
