import React, { useState, useEffect, useRef } from "react";
import { RepeatAndCompareActivity } from "../types";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import WaveLoading from "@/components/shared/WaveLoading";
import { IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import PrimaryButton from "@/components/shared/PrimaryButton";
import OutlineButton from "@/components/shared/OutlineButton";
import contractionMap from "@/constants/contractions";

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
  const [error, setError] = useState<string | null>(null);
  const [hasMicrophoneAccess, setHasMicrophoneAccess] = useState<
    boolean | null
  >(null);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);
  const lastAttemptWordsRef = useRef<string[]>([]);

  // Check microphone access
  useEffect(() => {
    const checkMicrophoneAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setHasMicrophoneAccess(true);
        // Stop the stream immediately after checking
        stream.getTracks().forEach((track) => track.stop());
      } catch (err) {
        setHasMicrophoneAccess(false);
        setError("شما دسترسی به میکروفون ندارید");
      }
    };

    checkMicrophoneAccess();
  }, []);

  const requestMicrophoneAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasMicrophoneAccess(true);
      setError(null);
      // Stop the stream immediately after getting access
      stream.getTracks().forEach((track) => track.stop());
    } catch (err) {
      setHasMicrophoneAccess(false);
      setError("شما دسترسی به میکروفون ندارید");
    }
  };

  const initRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript;
      const words = spokenText.split(" ");
      setSpokenWords(words);
      setAccuracyPercentage(null);
      lastAttemptWordsRef.current = words;
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
      if (event.error === "no-speech") {
        setError("No speech detected. Please try again.");
      } else if (event.error === "audio-capture") {
        setError("Microphone access denied. Please check your permissions.");
      } else if (event.error === "network") {
        setError("Network error. Please check your connection.");
      }
    };

    recognition.onend = () => {
      // Do nothing here, only handle in handleStop
    };

    return recognition;
  };

  const handleStart = () => {
    const recognition = initRecognition();
    if (!recognition) {
      setError("مرورگر شما از ضبط صدا پشتیبانی نمیکند");
      return;
    }
    recognitionRef.current = recognition;

    setSpokenWords([]);
    setAccuracyPercentage(null);
    setError(null);

    lastAttemptWordsRef.current = [];
    setIsRecording(true);
    recognition.start();
  };

  const handleStop = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn("Recognition already stopped.");
      }
    }
    setIsRecording(false);
    // Always use the latest words from ref
    if (lastAttemptWordsRef.current.length > 0) {
      calculateAccuracy(lastAttemptWordsRef.current);
    }
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

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {}
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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

  const getWordColor = (word: string, index: number) => {
    if (!spokenWords[index]) return "";

    const normalizedSpoken = normalizeWord(spokenWords[index]);
    const cleanedTarget = cleanTargetWord(word);

    // Check if words match after cleaning and normalization
    if (normalizedSpoken === cleanedTarget) {
      return "#22c55e"; // Green for exact match
    }

    // Check if words are similar enough
    if (
      normalizedSpoken.includes(cleanedTarget) ||
      cleanedTarget.includes(normalizedSpoken) ||
      levenshteinDistance(normalizedSpoken, cleanedTarget) <= 2
    ) {
      return "#f59e0b"; // Yellow for close match
    }

    return "#ef4444"; // Red for no match
  };

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
      {isSupported ? (
        <div>مرورگر شما از ضبط صدا پشتیبانی نمیکند</div>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full">
          {hasMicrophoneAccess === false ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-red-500 text-center mb-4">
                شما دسترسی به میکروفون ندارید
              </p>
              <PrimaryButton
                onClick={requestMicrophoneAccess}
                className="bg-primary hover:bg-primary/90"
              >
                درخواست دسترسی به میکروفون
              </PrimaryButton>
            </div>
          ) : (
            <>
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
                  disabled={!audioPlayed || !hasMicrophoneAccess}
                  onClick={isRecording ? handleStop : handleStart}
                  className={`!w-20 !h-20 !bg-backgroundMain shadow-lg border-2 border-primary flex items-center justify-center ${
                    !audioPlayed || !hasMicrophoneAccess
                      ? "opacity-50 cursor-not-allowed"
                      : ""
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
                {!hasMicrophoneAccess
                  ? "لطفا دسترسی به میکروفون را فعال کنید"
                  : audioPlayed
                  ? isRecording
                    ? "درحال ضبط..."
                    : "روی دکمه بزن تا صداتو ضبط کنی"
                  : "روی دکمه بزن تا بشنوی"}
              </div>
              {/* Show spoken words feedback */}
              {spokenWords.length > 0 && (
                <div
                  className="text-main font-medium flex items-center flex-wrap justify-center mt-6"
                  dir="ltr"
                >
                  {sentence.text.split(" ").map((word, index) => (
                    <span
                      className="text-main font-medium text-lg lg:text-xl"
                      key={index}
                      style={{
                        color: getWordColor(word, index),
                        marginRight: "5px",
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              )}
              {/* Show accuracy percentage */}
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
              <div className="text-sm text-gray-500 mt-2">
                تلاش: {attempts}/3
              </div>

              <PrimaryButton
                onClick={handleGoNext}
                className="mt-1 px-6 py-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
              >
                رد شدن
              </PrimaryButton>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RepeatAndCompare;
