import React, { useState, useEffect } from "react";
import { RepeatAndCompareActivity } from "../types";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import WaveLoading from "@/components/shared/WaveLoading";
import { IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import PrimaryButton from "@/components/shared/PrimaryButton";
import OutlineButton from "@/components/shared/OutlineButton";

interface Props {
  activity: RepeatAndCompareActivity;
  handleNext: () => void;
  handleSkip: () => void;
}

const RepeatAndCompare: React.FC<Props> = ({
  activity,
  handleNext,
  handleSkip,
}) => {
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
  const [error, setError] = useState<string | null>(null);
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);
  const [hasMicrophoneAccess, setHasMicrophoneAccess] = useState<
    boolean | null
  >(null);

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

  // Speech recognition setup
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";
        recognition.maxAlternatives = 3;

        recognition.onresult = (event: any) => {
          const results = event.results[0];
          let bestTranscript = results[0].transcript;
          let bestConfidence = results[0].confidence;

          for (let i = 1; i < results.length; i++) {
            if (results[i].confidence > bestConfidence) {
              bestTranscript = results[i].transcript;
              bestConfidence = results[i].confidence;
            }
          }

          const words = bestTranscript.split(" ");
          setSpokenWords(words);
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsRecording(false);
          if (event.error === "no-speech") {
            setError("No speech detected. Please try again.");
          } else if (event.error === "audio-capture") {
            setError(
              "Microphone access denied. Please check your permissions."
            );
          } else if (event.error === "network") {
            setError("Network error. Please check your connection.");
          }
        };

        recognition.onend = () => {
          if (isRecording) {
            try {
              recognition.start();
            } catch (error) {
              console.error("Error restarting recognition:", error);
              setIsRecording(false);
              setError("Recording stopped unexpectedly. Please try again.");
            }
          }
        };

        setRecognitionInstance(recognition);
      }
    }

    return () => {
      if (recognitionInstance) {
        try {
          recognitionInstance.stop();
        } catch (error) {
          console.error("Error stopping recognition:", error);
        }
      }
    };
  }, []);

  const startRecording = () => {
    if (!recognitionInstance) {
      setError("Speech recognition is not supported in your browser.");
      return;
    }

    setSpokenWords([]);
    setAccuracyPercentage(null);
    setError(null);

    try {
      recognitionInstance.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      setError("Failed to start recording. Please try again.");
      setIsRecording(false);
    }
  };

  function normalizeWord(word: string) {
    // Only normalize spaces and convert to lowercase
    return word.toLowerCase().replace(/\s+/g, " ").trim();
  }

  function cleanTargetWord(word: string) {
    // Remove all punctuation and special characters from target words
    return word
      .replace(/[.,;!?،؟:؛\-—_"'()\[\]{}]/g, "")
      .toLowerCase()
      .trim();
  }

  const getWordColor = (word: string, index: number) => {
    if (!spokenWords[index]) return "";
    const normalizedSpoken = normalizeWord(spokenWords[index]);
    const cleanedTarget = cleanTargetWord(word);

    // Check if words match after cleaning target
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
    setShowSkipButton(false);
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

    if (accuracy >= 85) {
      setTimeout(() => {
        handleGoNext();
      }, 1000);
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

  const stopRecording = () => {
    if (!recognitionInstance) return;

    try {
      recognitionInstance.stop();
      setIsRecording(false);
      calculateAccuracy(spokenWords);
    } catch (error) {
      console.error("Error stopping speech recognition:", error);
      setError("Failed to stop recording. Please try again.");
      setIsRecording(false);
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

  const handleAttempt = (score: number) => {
    if (score < 90) {
      setAttempts((prev) => {
        const newAttempts = prev + 1;
        if (newAttempts >= 1) {
          setShowSkipButton(true);
        }
        return newAttempts;
      });
    } else {
      handleGoNext();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <OutlineButton className="w-fit px-2 ml-auto" onClick={handleSkip}>
        نمیتوانم صحبت کنم، پایان درس
      </OutlineButton>
      {/* Progress bar and count can be added here if needed */}
      <div className="bg-backgroundMain rounded-xl shadow-lg pt-8 p-10 mb-8 w-full flex items-center justify-center min-h-[180px]">
        <span className="text-2xl font-bold text-center text-main" dir="ltr">
          {sentence.text}
        </span>
      </div>
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
                onClick={isRecording ? stopRecording : startRecording}
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
          </>
        )}
      </div>
    </div>
  );
};

export default RepeatAndCompare;
