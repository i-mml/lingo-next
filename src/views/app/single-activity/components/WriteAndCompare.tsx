import React, { useRef, useState } from "react";
import { WriteAndCompareActivity } from "../types";
import PrimaryButton from "@/components/shared/PrimaryButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import {
  CheckCircleOutlined,
  CloseOutlined,
  Lightbulb,
} from "@mui/icons-material";
import Lottie from "lottie-react";
import PlayingSpeaker from "@/assets/lotties/playing-speaker.json";
import OutlineButton from "@/components/shared/OutlineButton";

interface WriteAndCompareProps {
  activity: WriteAndCompareActivity;
  handleNext: () => void;
}

const WriteAndCompare: React.FC<WriteAndCompareProps> = ({
  activity,
  handleNext,
}) => {
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()؟،؟'"\\]/g, "")
      .replace(/\s{2,}/g, " ")
      .replace(/^[.!?]+|[.!?]+$/g, "")
      .trim();
  };

  const { playAudio, isPlaying } = useAudioPlayer(activity.sentence?.audio);
  const { playAudio: playSuccess } = useAudioPlayer("/assets/correct.mp3");
  const { playAudio: playWrong } = useAudioPlayer("/assets/wrong.mp3");

  const handlePlay = () => {
    playAudio();
    setAudioPlayed(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setChecked(false);
    setIsCorrect(null);
  };

  const handleGoNext = () => {
    handleNext();
    setInputValue("");
    setChecked(false);
    setIsCorrect(null);
    setRedirecting(false);
    setShowHint(false);
    setAttempts(0);
  };

  const handleCheck = () => {
    const normalizedInput = normalizeText(inputValue);
    const correct = activity.sentence.answers.some(
      (ans) => normalizeText(ans) === normalizedInput
    );
    setChecked(true);
    setIsCorrect(correct);
    if (!correct) {
      playWrong();
      setAttempts((prev) => prev + 1);
      return;
    } else {
      playSuccess();
    }
    if (correct) {
      setRedirecting(true);
      setTimeout(() => {
        handleGoNext();
      }, 1500);
    }
  };

  return (
    <div className="w-full">
      {/* Audio */}
      <div className="flex flex-col items-center mb-8">
        <button
          className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-4xl shadow-lg mb-4"
          onClick={isPlaying ? () => {} : handlePlay}
          aria-label="Play audio"
        >
          {isPlaying ? (
            <Lottie
              animationData={PlayingSpeaker}
              loop={true}
              className="w-[57px] h-[57px]"
            />
          ) : (
            <span className="material-icons text-4xl">
              <VolumeUpIcon className="!w-10 !h-10 " />
            </span>
          )}
        </button>

        <audio ref={audioRef} src={activity.sentence.audio} />
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
          placeholder="پاسخ را بنویسید"
          value={inputValue}
          onChange={handleInputChange}
          disabled={!audioPlayed || redirecting}
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
          disabled={showHint || !audioPlayed}
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
            {activity.sentence.answers[0]}
          </div>
        )}
      </div>
      {/* Check Answer */}
      <div className="flex justify-center items-center gap-4 w-full">
        <PrimaryButton
          className="w-40"
          onClick={handleCheck}
          buttonProps={{
            disabled: !audioPlayed || inputValue.trim() === "" || redirecting,
          }}
        >
          {redirecting ? "رفتن به سوال بعدی..." : "چک کردن"}
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
};

export default WriteAndCompare;
