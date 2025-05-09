import React, { useState } from "react";
import { FillTheGapsActivity } from "../types";
import { useAudioPlayer } from "@/hooks/use-audio-player";

interface Props {
  activity: FillTheGapsActivity;
  handleNext: () => void;
}

const FillTheGaps: React.FC<Props> = ({ activity, handleNext }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [disabledIndexes, setDisabledIndexes] = useState<number[]>([]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);

  const { playAudio: playSuccess } = useAudioPlayer("/assets/correct.mp3");
  const { playAudio: playWrong } = useAudioPlayer("/assets/wrong.mp3");

  const gapIndex = activity.gapPosition;
  const words = activity.text.split(" ");
  const beforeGap = words.slice(0, gapIndex - 1).join(" ");
  const afterGap = words.slice(gapIndex - 1).join(" ");

  const handleSelect = (idx: number) => {
    if (disabledIndexes.includes(idx) || correctIndex !== null) return;
    setSelected(idx);
    if (activity.answers[idx].correct) {
      setCorrectIndex(idx);
      playSuccess();
      setTimeout(() => {
        setSelected(null);
        setCorrectIndex(null);
        setDisabledIndexes([]);
        handleNext();
      }, 1000);
    } else {
      setDisabledIndexes((prev) => [...prev, idx]);
      playWrong();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pt-8 flex flex-col items-center">
      <div className="mb-12 text-3xl font-bold text-center text-main" dir="ltr">
        <span>{beforeGap} </span>
        <span
          className="inline-block min-w-[120px] border-b-4 border-dashed border-primary mx-2 align-middle"
          style={{ height: "1.5em" }}
        ></span>
        <span>{afterGap}</span>
      </div>
      <div className="flex flex-col gap-6 w-full items-center px-4">
        {activity.answers.map((ans, idx) => {
          const isCorrect = correctIndex === idx;
          const isSelected = selected === idx;
          const isDisabled =
            disabledIndexes.includes(idx) || correctIndex !== null;
          return (
            <button
              key={ans.text}
              className={`w-96 py-4 rounded-full text-lg font-bold transition-all shadow
                ${
                  isCorrect
                    ? "border-2 border-green-500 bg-green-50 text-green-700 shadow-green-200"
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
              style={{
                boxShadow: isCorrect
                  ? "0 0 0 4px #22c55e, 0 4px 24px 0 rgba(34,197,94,0.2)"
                  : isSelected && !isCorrect
                  ? "0 0 0 4px #ef4444, 0 4px 24px 0 rgba(239,68,68,0.2)"
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

export default FillTheGaps;
