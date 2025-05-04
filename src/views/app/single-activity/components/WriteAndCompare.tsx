import React, { useRef, useState } from "react";
import { WriteAndCompareActivity } from "../types";
import PrimaryButton from "@/components/shared/PrimaryButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { CheckCircleOutlined, CloseOutlined } from "@mui/icons-material";
import Lottie from "lottie-react";
import PlayingSpeaker from "@/assets/lotties/playing-speaker.json";

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
  const audioRef = useRef<HTMLAudioElement>(null);

  const { playAudio, isPlaying } = useAudioPlayer(activity.sentence?.audio);
  const { playAudio: playSuccess } = useAudioPlayer("/assets/correct.mp3");
  const { playAudio: playWrong } = useAudioPlayer("/assets/wrong.mp3");

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
    if (!correct) {
      return playWrong();
    } else {
      playSuccess();
    }
    if (correct) {
      setRedirecting(true);
      setTimeout(() => {
        handleNext();
        setInputValue("");
        setChecked(false);
        setIsCorrect(null);
        setRedirecting(false);
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
        {checked && isCorrect === true && (
          <div className="text-green-500 text-sm text-right w-full mt-1">
            <CheckCircleOutlined className="!w-6 !h-6" />
            صحیح بود!
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
          {redirecting ? "رفتن به سوال بعدی..." : "چک کردن"}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default WriteAndCompare;
