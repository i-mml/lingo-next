import React, { useState, useEffect, useRef, useCallback } from "react";
import { RepeatAndCompareActivity } from "../types";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import WaveLoading from "@/components/shared/WaveLoading";
import { IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import PrimaryButton from "@/components/shared/PrimaryButton";
import OutlineButton from "@/components/shared/OutlineButton";
import contractionMap from "@/constants/contractions";
import { useTranslation } from "react-i18next";
import VoiceChecker from "@/components/shared/VoiceChecker";

interface Props {
  activity: RepeatAndCompareActivity;
  handleNext: () => void;
  handleSkip: () => void;
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
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const { t: translate } = useTranslation();

  const checkMicrophonePermission = useCallback(async () => {
    if ("MediaRecorder" in window) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setHasMicrophonePermission(true);
      } catch (err) {
        setHasMicrophonePermission(false);
        console.error("Error accessing microphone:", err);
      }
    } else {
      alert(translate("erros.BROWSER_AUDIO_RECORD_SUPPORT"));
    }
  }, [translate]);

  const checkBrowserSpeechSupport = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!!SpeechRecognition) {
      setIsSpeechSupported(true);
    } else {
      console.error("SpeechRecognition is not supported in this browser.");
      setIsSpeechSupported(false);
    }
  };

  useEffect(() => {
    checkMicrophonePermission();
    checkBrowserSpeechSupport();
  }, [checkMicrophonePermission]);

  function normalizeWord(word: string) {
    // Convert to lowercase and remove extra spaces
    let normalized = word.toLowerCase().replace(/\s+/g, " ").trim();

    // Check for contractions
    if (contractionMap[normalized]) {
      normalized = contractionMap[normalized];
    }

    return normalized;
  }

  function cleanTargetWord(word: string) {
    // Remove punctuation and special characters
    let cleaned = word
      .replace(/[.,;!?،؟:؛\-—_"'()\[\]{}]/g, "")
      .toLowerCase()
      .trim();

    // Check for contractions
    if (contractionMap[cleaned]) {
      cleaned = contractionMap[cleaned];
    }

    return cleaned;
  }

  const handleGoNext = () => {
    handleNext();
    playSuccess();
    setAudioPlayed(false);
    setAccuracyPercentage(null);
    setSpokenWords([]);
    setAttempts(0);
  };

  const calculateAccuracy = (spoken: string[]) => {
    // Clean target words but keep spoken words as is
    const targetWords = sentence.text
      .split(" ")
      .map((word) => cleanTargetWord(word));
    const spokenWords = spoken.map((word) => normalizeWord(word));

    let matchCount = 0;
    let totalWords = targetWords.length;

    targetWords.forEach((word, index) => {
      if (spokenWords[index]) {
        const spokenWord = spokenWords[index];

        // Exact match
        if (spokenWord === word) {
          matchCount++;
        } else {
          // Check for similar words
          if (
            spokenWord.includes(word) ||
            word.includes(spokenWord) ||
            levenshteinDistance(spokenWord, word) <= 2
          ) {
            matchCount += 0.9;
          }
        }
      }
    });

    const accuracy = (matchCount / totalWords) * 100;
    setAccuracyPercentage(accuracy);

    // Only proceed if accuracy is above 85% and not recording
    if (accuracy >= 85) {
      setTimeout(() => {
        handleGoNext();
      }, 1500); // Give user time to see the accuracy
    } else {
      handleAttempt(accuracy);
    }
  };

  // Levenshtein distance function for fuzzy matching
  function levenshteinDistance(a: string, b: string): number {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  const handleAttempt = (score: number) => {
    if (score < 90) {
      setAttempts((prev) => {
        const newAttempts = prev + 1;
        return newAttempts;
      });
    } else {
      handleGoNext();
    }
  };

  if (!isSpeechSupported) {
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <div className="flex items-center justify-center flex-col gap-6">
          <div className="give-mic-access">
            <div className="give-mic-title mb-3">
              مرورگر شما از این قابلیت پشتیبانی نمیکند ، با مرورگر دیگری امتحان
              کنید.
            </div>
            <OutlineButton
              onClick={handleGoNext}
              buttonProps={{ type: "button" }}
            >
              بستن
            </OutlineButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* <OutlineButton className="w-fit px-2 ml-auto" onClick={handleSkip}>
        نمیتوانم صحبت کنم، پایان درس
      </OutlineButton> */}
      {/* Progress bar and count can be added here if needed */}
      <div className="bg-backgroundMain rounded-xl shadow-lg pt-8 p-10 mb-8 w-full flex items-center justify-center min-h-[180px]">
        <span className="text-2xl font-bold text-center text-main" dir="ltr">
          {sentence.text}
        </span>
      </div>
      <div>
        {hasMicrophonePermission ? (
          <>
            <VoiceChecker
              speachCompareMutation={{
                mutate: ({
                  target_text,
                  voice_text,
                }: {
                  target_text: string;
                  voice_text: string;
                }) => {
                  calculateAccuracy(voice_text.split(" "));
                },
              }}
              targetText={normalizeWord(sentence?.text || "")}
            />
            <PrimaryButton
              onClick={handleGoNext}
              className="w-full max-w-[208px] mt-3 px-6 py-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
            >
              رد شدن
            </PrimaryButton>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-4 p-2">
            <div className="text-main text-center mb-3">
              {translate("errors.YOU_SHOULD_GIVE_ACCESS")}
            </div>
            <OutlineButton
              onClick={checkMicrophonePermission}
              buttonProps={{ type: "button" }}
              className="w-full max-w-md"
            >
              {translate("errors.GIVE_MIC_ACCESS")}
            </OutlineButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepeatAndCompare;
