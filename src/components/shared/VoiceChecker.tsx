"use client";
import { useAuth } from "@/hooks/use-auth";
import { useTextToAudio } from "@/hooks/use-text-to-audio";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import OutlineButton from "./OutlineButton";
import WaveLoading from "./WaveLoading";
import VoiceIcon from "@/assets/voice.svg";
import Confetti from "react-confetti";
import contractionMap from "@/constants/contractions";

const VoiceChecker: React.FC<{
  targetText: string;
  speachCompareMutation: any;
}> = ({ targetText, speachCompareMutation }) => {
  const [spokenWords, setSpokenWords] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [accuracyPercentage, setAccuracyPercentage] = useState<number | null>(
    null
  );
  const [celebrate, setCelebrate] = useState(false);

  const { whoAmI } = useAuth();
  const { handleTextToSpeech, textToSpeachMutation } = useTextToAudio();

  const recognition = new (window as any).webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang =
    whoAmI?.userpreference?.preferred_language === 2 ? "en-US" : "de-DE";

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    const words = transcript.split(" ");
    setSpokenWords(words);
  };

  const startRecording = () => {
    setSpokenWords([]);
    setAccuracyPercentage(null);
    setIsRecording(true);
    recognition.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognition.stop();
    calculateAccuracy(spokenWords);

    speachCompareMutation.mutate({
      target_text: targetText,
      voice_text: spokenWords.join(" "),
    });
  };

  const normalizeText = (text: string) => {
    let normalized = text
      .normalize("NFKD")
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()؟،؟'\":?!]/g, "")
      .replace(/\r?\n/g, " ")
      .replace(/\s{2,}/g, " ")
      .replace(/^[.!?]+|[.!?]+$/g, "")
      .trim();

    if (contractionMap[normalized]) {
      normalized = contractionMap[normalized];
    }

    return normalized;
  };

  const getWordColor = (word: string, index: number) => {
    if (!spokenWords[index]) return "";
    return normalizeText(spokenWords[index]) === normalizeText(word)
      ? "green"
      : "red";
  };

  const calculateAccuracy = (spokenWords: string[]) => {
    const targetWords = targetText
      .split(" ")
      .map((word) => normalizeText(word));
    let matchCount = 0;

    targetWords.forEach((word, index) => {
      if (
        spokenWords[index] &&
        normalizeText(spokenWords[index]) === normalizeText(word)
      ) {
        matchCount++;
      }
    });

    const accuracy = (matchCount / targetWords.length) * 100;
    if (accuracy === 100) {
      setCelebrate(true);
    }
    setAccuracyPercentage(accuracy);
  };

  const percentageColorGenerator = (percentage: number) => {
    if (percentage < 50) {
      return "!text-[red]";
    }
    if (percentage > 50 && percentage < 85) {
      return "!text-yellow-500";
    }
    if (percentage > 85) {
      return "!text-green-500";
    }
    return "";
  };

  useEffect(() => {
    if (celebrate) {
      setTimeout(() => {
        setCelebrate(false);
      }, 5000);
    }
    return () => {
      recognition.stop();
    };
  }, [celebrate]);

  useEffect(() => {
    setSpokenWords([]);
    setAccuracyPercentage(null);
  }, [targetText]);

  return (
    <div>
      <div className="text-[16px] md:text-lg mb-3 text-gray400">
        جمله زیر را تکرار کنید.
      </div>
      <div className="record-sub-title flex items-center" dir="ltr">
        <div
          className="text-main font-medium flex items-center flex-wrap"
          dir="ltr"
        >
          {targetText.split(" ").map((word, index) => (
            <span
              className="text-main font-medium text-lg lg:text-xl"
              key={index}
              style={{ color: getWordColor(word, index), marginRight: "5px" }}
            >
              {word}
            </span>
          ))}
        </div>
        <IconButton
          disabled={textToSpeachMutation.isLoading}
          onClick={() => handleTextToSpeech({ text: targetText })}
        >
          {textToSpeachMutation.isLoading ? <WaveLoading /> : <VoiceIcon />}
        </IconButton>
      </div>

      <OutlineButton
        className="w-52 mx-auto block mt-4"
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? "Stop Recording" : "Repeat"}
      </OutlineButton>

      {!!accuracyPercentage && (
        <div
          className={`mt-4 flex items-center justify-center text-center text-main text-lg md:text-xl ${percentageColorGenerator(
            accuracyPercentage as number
          )}`}
        >
          درصد تشابه: {accuracyPercentage?.toFixed()}%
        </div>
      )}
      {celebrate && <Confetti />}
    </div>
  );
};

export default VoiceChecker;
