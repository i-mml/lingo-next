import React, { useRef, useState } from "react";
import { WriteAndCompareActivity } from "../types";
import PrimaryButton from "@/components/shared/PrimaryButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useTextToAudio } from "@/hooks/use-text-to-audio";
import WaveLoading from "@/components/shared/WaveLoading";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { CloseOutlined } from "@mui/icons-material";

interface WriteAndCompareProps {
  activity: WriteAndCompareActivity;
  currentIndex: number;
  total: number;
}

const WriteAndCompare: React.FC<WriteAndCompareProps> = ({
  activity,
  currentIndex,
  total,
}) => {
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { playAudio } = useAudioPlayer(activity.sentence?.audio);

  console.log("here", { activity });

  const handlePlay = () => {
    playAudio();
    setAudioPlayed(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setChecked(false);
    setIsCorrect(null);
  };

  const handleCheck = () => {
    const normalized = inputValue.trim().toLowerCase();
    const correct = activity.sentence.answers.some(
      (ans) => ans.trim().toLowerCase() === normalized
    );
    setChecked(true);
    setIsCorrect(correct);
  };

  // Progress percent
  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <div className="w-full max-w-[90%] md:max-w-md mx-auto pt-8 min-h-[80vh]">
      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <div className="font-bold text-xl">Write</div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-bold text-lg">
            {currentIndex + 1}/{total}
          </span>
        </div>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded mb-8">
        <div
          className="h-2 bg-primary rounded"
          style={{ width: `${progress}%`, transition: "width 0.3s" }}
        />
      </div>
      {/* Audio */}
      <div className="flex flex-col items-center mb-8">
        <button
          className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-4xl shadow-lg mb-4"
          onClick={handlePlay}
          aria-label="Play audio"
        >
          <span className="material-icons text-4xl">
            <VolumeUpIcon className="!w-10 !h-10 " />
          </span>
        </button>
        <audio ref={audioRef} src={activity.sentence.audio} />
      </div>
      {/* Input */}
      <div className="flex flex-col items-center mb-8">
        <input
          type="text"
          className={`w-full max-w-xl text-main px-4 py-4 rounded-xl text-lg text-right bg-backgroundMain outline-none border transition-colors
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
          `}
          placeholder="چیزی که میشنوی را بنویس"
          value={inputValue}
          onChange={handleInputChange}
          disabled={!audioPlayed}
        />
        {checked && isCorrect === false && (
          <div className="text-red-500 text-sm text-right w-full mt-1">
            <CloseOutlined className="!w-6 !h-6" />
            اشتباه بود! دوباره تلاش کن
          </div>
        )}
      </div>
      {/* Check Answer */}
      <div className="flex flex-col items-center gap-4">
        <PrimaryButton
          className="w-40"
          onClick={handleCheck}
          buttonProps={{
            disabled: !audioPlayed || inputValue.trim() === "",
          }}
        >
          چک کردن
        </PrimaryButton>
      </div>
    </div>
  );
};

export default WriteAndCompare;
