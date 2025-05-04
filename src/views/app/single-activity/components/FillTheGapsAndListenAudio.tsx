import React, { useState } from "react";
import { FillTheGapsAndListenAudioActivity } from "../types";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useAudioPlayer } from "@/hooks/use-audio-player";

interface Props {
  activity: FillTheGapsAndListenAudioActivity;
  handleNext: () => void;
}

const FillTheGapsAndListenAudio: React.FC<Props> = ({
  activity,
  handleNext,
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [disabledIndexes, setDisabledIndexes] = useState<number[]>([]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  console.log(activity);
  const { playAudio } = useAudioPlayer(activity.audio || "");

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

  const gapIndex = activity.gapPosition?.[0] ?? -1;
  const words = activity.text.split(" ");
  const beforeGap = words.slice(0, gapIndex - 1).join(" ");
  const afterGap = words.slice(gapIndex - 1).join(" ");
  const sentence = (
    <span>
      <span className="font-bold text-main">{beforeGap}</span>
      <span
        className="inline-block min-w-[120px] border-b-2 border-dashed border-primary mx-2 align-middle"
        style={{ height: "1.5em" }}
      ></span>
      <span className="font-bold text-main">{afterGap}</span>
    </span>
  );

  return (
    <div className="w-full max-w-2xl mx-auto pt-8 flex flex-col items-center">
      {/* Statement */}
      {activity.statement && (
        <div className="mb-8 text-lg font-bold text-center text-main">
          {activity.statement.replace(/<[^>]+>/g, "")}
        </div>
      )}
      {/* Sentence */}
      <div
        className="mb-8 text-2xl font-bold text-center flex items-center justify-center gap-2"
        dir="ltr"
      >
        {sentence}
      </div>
      {/* Answers */}
      <div className="flex flex-col gap-4 w-full items-center">
        {activity.answers.map((ans, idx) => {
          const isCorrect = correctIndex === idx;
          const isDisabled =
            disabledIndexes.includes(idx) || correctIndex !== null;
          return (
            <button
              key={ans.text}
              className={`
                w-80 py-4 rounded-full text-lg font-bold
                transition-all shadow
                ${
                  isCorrect
                    ? "border-2 border-green-500 bg-green-50 text-green-700 shadow-green-200"
                    : ""
                }
                ${
                  disabledIndexes.includes(idx)
                    ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
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

export default FillTheGapsAndListenAudio;
