import React, { useState } from "react";
import { RepeatAndCompareActivity } from "../types";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { useTextToAudio } from "@/hooks/use-text-to-audio";
import WaveLoading from "@/components/shared/WaveLoading";
import { IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import PrimaryButton from "@/components/shared/PrimaryButton";

interface Props {
  activity: RepeatAndCompareActivity;
  handleNext: () => void;
}

const RepeatAndCompare: React.FC<Props> = ({ activity, handleNext }) => {
  const sentence = activity.sentences[0];
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenWords, setSpokenWords] = useState<string[]>([]);
  const [accuracyPercentage, setAccuracyPercentage] = useState<number | null>(
    null
  );
  const { playAudio: playSuccess } = useAudioPlayer("/assets/correct.mp3");
  const { playAudio, isPlaying } = useAudioPlayer(sentence.audio);
  const [attempts, setAttempts] = useState(0);
  const [showSkipButton, setShowSkipButton] = useState(false);

  // Speech recognition setup
  let recognition: any = null;
  if (
    typeof window !== "undefined" &&
    (window as any).webkitSpeechRecognition
  ) {
    recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const words = transcript.split(" ");
      setSpokenWords(words);
    };
  }

  const startRecording = () => {
    setSpokenWords([]);
    setAccuracyPercentage(null);
    setIsRecording(true);
    recognition && recognition.start();
  };

  function normalizeWord(word: string) {
    // Remove all punctuation for comparison
    return word.replace(/[.,;!?،؟:؛\-—_"'()\[\]{}]/g, "").toLowerCase();
  }

  const getWordColor = (word: string, index: number) => {
    if (!spokenWords[index]) return "";
    return normalizeWord(spokenWords[index]) === normalizeWord(word)
      ? "#22c55e"
      : "#ef4444";
  };
  const handleGoNext = () => {
    handleNext();
    playSuccess();
    setAudioPlayed(false);
    setAccuracyPercentage(null);
    setSpokenWords([]);
    setAttempts(0);
    setShowSkipButton(false);
  };

  const calculateAccuracy = (spoken: string[]) => {
    // Remove punctuation from both spoken and target
    const targetWords = sentence.text
      .replace(/[.,;!?،؟:؛\-—_"'()\[\]{}]/g, "")
      .split(" ");
    let matchCount = 0;
    targetWords.forEach((word, index) => {
      if (
        spoken[index] &&
        normalizeWord(spoken[index]) === normalizeWord(word)
      ) {
        matchCount++;
      }
    });
    const accuracy = (matchCount / targetWords.length) * 100;

    setAccuracyPercentage(accuracy);

    if (accuracy > 90) {
      setTimeout(() => {
        handleGoNext();
      }, 1000);
    } else {
      handleAttempt(accuracy);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognition && recognition.stop();
    calculateAccuracy(spokenWords);
  };

  const percentageColorGenerator = (percentage: number) => {
    if (percentage < 50) {
      return "!text-[red]";
    }
    if (percentage > 50 && percentage < 85) {
      return "!text-yellow-500";
    }
    if (percentage >= 85) {
      return "!text-green-500";
    }
    return "";
  };

  const handleAttempt = (score: number) => {
    if (score < 90) {
      setAttempts((prev) => {
        const newAttempts = prev + 1;
        if (newAttempts >= 3) {
          setShowSkipButton(true);
        }
        return newAttempts;
      });
    } else {
      handleGoNext();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pt-8 flex flex-col items-center">
      {/* Progress bar and count can be added here if needed */}
      <div className="bg-backgroundMain rounded-xl shadow-lg p-10 mb-8 w-full flex items-center justify-center min-h-[180px]">
        <span className="text-2xl font-bold text-center text-main" dir="ltr">
          {sentence.text}
        </span>
      </div>
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="flex items-center gap-8">
          <IconButton
            disabled={isPlaying}
            onClick={() => {
              playAudio();
              setAudioPlayed(true);
            }}
            className="!w-20 !h-20 !bg-backgroundMain shadow-lg"
          >
            {isPlaying ? (
              <WaveLoading />
            ) : (
              <VolumeUpIcon className="!w-10 !h-10 !text-main" />
            )}
          </IconButton>
          <IconButton
            disabled={!audioPlayed}
            onClick={isRecording ? stopRecording : startRecording}
            className={`!w-20 !h-20  !bg-backgroundMain shadow-lg border-2 border-primary flex items-center justify-center ${
              !audioPlayed ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <KeyboardVoiceIcon
              className={`!w-10 !h-10 !text-main ${
                isRecording ? "animate-ping" : ""
              }`}
            />
          </IconButton>
        </div>
        <div className="text-center text-gray-500 mt-2">
          {audioPlayed
            ? isRecording
              ? "درحال ضبط..."
              : "روی دکمه بزن تا صداتو ضبط کنی"
            : "روی دکمه بزن تا بشنوی"}
        </div>
        {/* Per-word feedback */}
        {spokenWords.length > 0 && (
          <div
            className="text-main font-medium flex items-center flex-wrap justify-center mt-6"
            dir="ltr"
          >
            {sentence.text.split(" ").map((word, index) => (
              <span
                className="text-main font-medium text-lg lg:text-xl"
                key={index}
                style={{ color: getWordColor(word, index), marginRight: "5px" }}
              >
                {word}
              </span>
            ))}
          </div>
        )}
        {/* Accuracy percentage */}
        {accuracyPercentage !== null && (
          <div
            className={`mt-4 text-xl font-bold ${percentageColorGenerator(
              accuracyPercentage
            )}`}
          >
            {Math.round(accuracyPercentage)}%
          </div>
        )}
        {/* Attempts counter */}
        <div className="text-sm text-gray-500 mt-2">تلاش: {attempts}/3</div>
        {showSkipButton && (
          <PrimaryButton
            onClick={handleGoNext}
            className="mt-1 px-6 py-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
          >
            رد شدن
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};

export default RepeatAndCompare;
