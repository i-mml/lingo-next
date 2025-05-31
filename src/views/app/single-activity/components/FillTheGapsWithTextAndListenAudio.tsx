import React, { useState } from "react";
import {
  FillTheGapsAndListenAudioActivity,
  FillTheGapsWithTextAndListenAudioActivity,
} from "../types";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { useTextToAudio } from "@/hooks/use-text-to-audio";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { CheckCircleOutlined, CloseOutlined } from "@mui/icons-material";
import { Lightbulb } from "lucide-react";
import OutlineButton from "@/components/shared/OutlineButton";

interface Props {
  activity: FillTheGapsWithTextAndListenAudioActivity;
  handleNext: () => void;
}

const FillTheGapsWithTextAndListenAudio: React.FC<Props> = ({
  activity,
  handleNext,
}) => {
  // For write-answer type
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const { playAudio: playWrong } = useAudioPlayer("/assets/wrong.mp3");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setChecked(false);
    setIsCorrect(null);
  };

  function normalizeSentence(str: string) {
    return str
      .normalize("NFKD")
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()؟،؟'"\\]/g, "")
      .replace(/\s{2,}/g, " ")
      .replace(/^[.!?]+|[.!?]+$/g, "")
      .trim()
      .split(" ")
      .filter(Boolean)
      .join(" ");
  }

  const handleGoNext = () => {
    handleNext();
    setInputValue("");
    setChecked(false);
    setIsCorrect(null);
    setShowHint(false);
    setAttempts(0);
  };

  const handleCheck = () => {
    const normalizedInput = normalizeSentence(inputValue);
    const isCorrect = (
      activity as FillTheGapsWithTextAndListenAudioActivity
    ).answers.some((ans) => normalizeSentence(ans) === normalizedInput);
    setChecked(true);
    setIsCorrect(isCorrect);
    if (!isCorrect) {
      playWrong();
      setAttempts((prev) => prev + 1);
      return;
    } else {
      setTimeout(() => {
        handleGoNext();
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
        <button
          type="button"
          className="mt-4 flex flex-col items-start w-full pr-3 cursor-pointer disabled:opacity-50"
          onClick={() => setShowHint(true)}
          disabled={showHint}
          aria-label="Show hint"
        >
          <span className="rounded-full bg-yellow-100 shadow-lg p-3 hover:bg-yellow-200  transition-all">
            <Lightbulb className="text-yellow-500 !w-6 !h-6 drop-shadow-lg" />
          </span>
        </button>
        {/* Show the answer if hint is revealed */}
        {showHint && (
          <div
            dir="ltr"
            className="mb-4 text-left text-base text-primary font-semibold bg-yellow-50 rounded-lg px-4 py-2 shadow"
          >
            {activity.answers?.[0]}
          </div>
        )}

        <div className="flex justify-center items-center gap-4 w-full">
          <PrimaryButton
            className="w-40"
            onClick={handleCheck}
            buttonProps={{
              disabled: inputValue.trim() === "",
            }}
          >
            {"چک کردن"}
          </PrimaryButton>
          {attempts > 0 ? (
            <OutlineButton className="w-1/2 px-2" onClick={handleGoNext}>
              رد شدن
            </OutlineButton>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
};

export default FillTheGapsWithTextAndListenAudio;
