import React, { useState } from "react";
import {
  FillTheGapsAndListenAudioActivity,
  FillTheGapsWithTextAndListenAudioActivity,
} from "../types";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { useTextToAudio } from "@/hooks/use-text-to-audio";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { CheckCircleOutlined, CloseOutlined } from "@mui/icons-material";

interface Props {
  activity: FillTheGapsWithTextAndListenAudioActivity;
  handleNext: () => void;
}

const FillTheGapsWithTextAndListenAudio: React.FC<Props> = ({
  activity,
  handleNext,
}) => {
  // For select-answer type
  const [selected, setSelected] = useState<number | null>(null);
  const [disabledIndexes, setDisabledIndexes] = useState<number[]>([]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  // For write-answer type
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const { playAudio: playWrong } = useAudioPlayer("/assets/wrong.mp3");
  const { handleTextToSpeech } = useTextToAudio();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setChecked(false);
    setIsCorrect(null);
  };

  function normalizeSentence(str: string) {
    return str
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()؟،؟'"\\]/g, "")
      .replace(/\s{2,}/g, " ")
      .trim()
      .split(" ")
      .filter(Boolean);
  }

  const handleCheck = () => {
    const userWords = normalizeSentence(inputValue);
    const isCorrect = (
      activity as FillTheGapsWithTextAndListenAudioActivity
    ).answers.some((ans) => {
      const answerWords = normalizeSentence(ans);
      return (
        userWords.length === answerWords.length &&
        userWords.every((word, idx) => word === answerWords[idx])
      );
    });
    setChecked(true);
    setIsCorrect(isCorrect);
    if (!isCorrect) {
      playWrong();
      return;
    } else {
      setTimeout(() => {
        handleNext();
        setInputValue("");
        setChecked(false);
        setIsCorrect(null);
      }, 1000);
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

  if (activity.type === "fillTheGapsWithTextAndListenAudio") {
    return (
      <div className="w-full max-w-2xl mx-auto pt-8 flex flex-col items-center">
        {activity.statement && (
          <div
            className="mb-8 text-lg font-bold text-center text-main"
            dir="ltr"
          >
            {activity.statement.replace(/<[^>]+>/g, "")}
          </div>
        )}
        {/* Sentence */}
        <div
          className="mb-8 text-2xl font-bold text-center flex items-center justify-center gap-2"
          dir="ltr"
        >
          {activity?.text}
        </div>

        <div className="flex flex-col items-center mb-8 w-full">
          <textarea
            className={`w-full max-w-2xl resize-none text-main px-4 py-4 rounded-xl text-lg bg-backgroundMain outline-none border transition-colors disabled:opacity-50
                ${
                  checked && isCorrect === true
                    ? "border-green-500 !text-green-500"
                    : ""
                }
                ${
                  checked && isCorrect === false
                    ? "border-red-500 !text-red-500"
                    : ""
                }
                ${inputValue !== "" ? "text-left" : "text-right"}
              `}
            placeholder="چیزی که میشنوی را بنویس"
            value={inputValue}
            onChange={handleInputChange}
            rows={2}
            dir={inputValue !== "" ? "ltr" : "rtl"}
          />
          {checked && isCorrect === false && (
            <div className="text-red-500 text-sm text-right w-full mt-1">
              <CloseOutlined className="!w-6 !h-6" />
              اشتباه بود! دوباره تلاش کن
            </div>
          )}
          {checked && isCorrect === true && (
            <div className="text-green-500 text-sm text-right w-full mt-1">
              <CheckCircleOutlined className="!w-6 !h-6" />
              صحیح بود!
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-4">
          <PrimaryButton
            className="w-40"
            onClick={handleCheck}
            buttonProps={{
              disabled: inputValue.trim() === "",
            }}
          >
            {"چک کردن"}
          </PrimaryButton>
        </div>
      </div>
    );
  }
};

export default FillTheGapsWithTextAndListenAudio;
