import React, { useState } from "react";
import PrimaryButton from "@/components/shared/PrimaryButton";
import {
  CheckCircleOutlined,
  CloseOutlined,
  Lightbulb,
} from "@mui/icons-material";

interface TextQuestionTextAnswerProps {
  activity: {
    id: string;
    text: string;
    type: string;
    audio: string;
    answers: string[];
    required: boolean;
    statement: string;
    translation: string;
  };
  handleNext: () => void;
}

const TextQuestionTextAnswer: React.FC<TextQuestionTextAnswerProps> = ({
  activity,
  handleNext,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()؟،؟'"\\]/g, "")
      .replace(/\s{2,}/g, " ")
      .replace(/^[.!?]+|[.!?]+$/g, "")
      .trim();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setChecked(false);
    setIsCorrect(null);
  };

  const handleCheck = () => {
    const normalizedInput = normalizeText(inputValue);
    const correct = activity.answers.some(
      (ans) => normalizeText(ans) === normalizedInput
    );
    setChecked(true);
    setIsCorrect(correct);
    if (!correct) {
      return;
    }
    if (correct) {
      setRedirecting(true);
      setTimeout(() => {
        handleNext();
        setInputValue("");
        setChecked(false);
        setIsCorrect(null);
        setRedirecting(false);
        setShowHint(false);
      }, 1500);
    }
  };

  return (
    <div className="w-full">
      {/* Statement */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-main" dir="ltr">
          {activity.statement}
        </h2>
      </div>
      {/* Jumbled Question */}
      <div className="text-center mb-8">
        <span className="text-2xl font-extrabold text-main" dir="ltr">
          {activity.text}
        </span>
      </div>
      {/* Input */}
      <div className="flex flex-col items-center mb-8 w-full">
        <textarea
          className={`w-full max-w-xl resize-none text-main px-4 py-4 rounded-xl text-lg bg-backgroundMain outline-none border transition-colors disabled:opacity-50
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
            ${inputValue.length > 0 ? "text-left" : "text-right"}
          `}
          placeholder="Write your answer"
          value={inputValue}
          onChange={handleInputChange}
          disabled={redirecting}
          rows={2}
          dir={inputValue.length > 0 ? "ltr" : "rtl"}
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
            className="mt-3 text-left text-base text-primary font-semibold bg-yellow-50 rounded-lg px-4 py-2 shadow"
          >
            {activity.answers[0]}
          </div>
        )}
      </div>
      {/* Check Answer */}
      <div className="flex flex-col items-center gap-4">
        <PrimaryButton
          className="w-40"
          onClick={handleCheck}
          buttonProps={{
            disabled: inputValue.trim() === "" || redirecting,
          }}
        >
          {redirecting ? "رفتن به سوال بعدی..." : "چک کردن"}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default TextQuestionTextAnswer;
