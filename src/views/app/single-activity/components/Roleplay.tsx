import React, { useState, useEffect, useRef } from "react";
import { RoleplayActivity } from "../types";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import { useTextToAudio } from "@/hooks/use-text-to-audio";
import WaveLoading from "@/components/shared/WaveLoading";
import { IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import Lottie from "lottie-react";
import conversationLottie from "@/assets/lotties/unit-converstaion.json";
import PrimaryButton from "@/components/shared/PrimaryButton";
import OutlineButton from "@/components/shared/OutlineButton";
import contractionMap from "@/constants/contractions";

interface Props {
  activity: RoleplayActivity;
  handleNext: () => void;
  selectedActor: string | null;
  onActorSelect: (actor: string) => void;
  handleSkip: () => void;
}

const Roleplay: React.FC<Props> = ({
  activity,
  handleNext,
  selectedActor,
  onActorSelect,
  handleSkip,
}) => {
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenWords, setSpokenWords] = useState<string[]>([]);
  const [accuracyPercentage, setAccuracyPercentage] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const { playAudio, isPlaying } = useAudioPlayer(activity.content.audio);
  const { handleTextToSpeech, textToSpeachMutation } = useTextToAudio();
  const isTTSLoading = textToSpeachMutation.isLoading;
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

  function normalizeWord(word: string) {
    let normalized = word.toLowerCase().replace(/\s+/g, " ").trim();
    if (contractionMap[normalized]) {
      normalized = contractionMap[normalized];
    }
    return normalized;
  }

  function cleanTargetWord(word: string) {
    let cleaned = word
      .replace(/[.,;!?،؟:؛\-—_"'()\[\]{}]/g, "")
      .toLowerCase()
      .trim();
    if (contractionMap[cleaned]) {
      cleaned = contractionMap[cleaned];
    }
    return cleaned;
  }

  // Add levenshteinDistance for fuzzy matching
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

  // Speech recognition logic
  const recognitionRef = useRef<any>(null);
  const [lastAttemptWords, setLastAttemptWords] = useState<string[]>([]);
  const lastAttemptWordsRef = useRef<string[]>([]);

  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

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
      setLastAttemptWords(words);
      lastAttemptWordsRef.current = words;
    };
    recognition.onerror = (event: any) => {
      setIsRecording(false);
      if (event.error === "no-speech") {
        setError("صدایی صوتی تشخیص داده نشد. لطفا دوباره تلاش کنید.");
      } else if (event.error === "audio-capture") {
        setError("دسترسی به میکروفون را فعال کنید.");
      } else if (event.error === "network") {
        setError("خطای شبکه. لطفا دوباره تلاش کنید.");
      }
    };
    recognition.onend = () => {
      // Do nothing here, only handle in stopRecording
    };
    return recognition;
  };

  const startRecording = () => {
    const recognition = initRecognition();
    if (!recognition) {
      setError("مرورگر شما از ضبط صدا پشتیبانی نمیکند");
      return;
    }
    recognitionRef.current = recognition;
    setSpokenWords([]);
    setAccuracyPercentage(null);
    setError(null);
    setLastAttemptWords([]);
    lastAttemptWordsRef.current = [];
    setIsRecording(true);
    recognition.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn("Recognition already stopped.");
      }
    }
    setIsRecording(false);
    if (lastAttemptWordsRef.current.length > 0) {
      calculateAccuracy(lastAttemptWordsRef.current);
    }
  };

  const handleGoNext = () => {
    setAudioPlayed(false);
    setAccuracyPercentage(null);
    setSpokenWords([]);
    setError(null);
    handleNext();
  };

  // Update calculateAccuracy to use fuzzy matching and threshold 85
  const calculateAccuracy = (spoken: string[]) => {
    const targetWords = activity.content.text
      .split(" ")
      .map((word) => cleanTargetWord(word));
    const spokenWordsNorm = spoken.map((word) => normalizeWord(word));
    let matchCount = 0;
    let totalWords = targetWords.length;
    targetWords.forEach((word, index) => {
      if (spokenWordsNorm[index]) {
        const spokenWord = spokenWordsNorm[index];
        if (spokenWord === word) {
          matchCount++;
        } else {
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
      }, 1500);
    } else {
      setError("دوباره تلاش کنید ..!");
    }
  };

  // Play audio or TTS
  const handlePlay = async () => {
    if (activity.content.audio) {
      playAudio();
    } else {
      await handleTextToSpeech({ text: activity.content.text });
    }
    setAudioPlayed(true);
  };

  // Actor logic
  const userIsCurrent =
    selectedActor && activity.content.actor === selectedActor;
  const otherActor = activity.actors.find((a) => a.name !== selectedActor);
  const userActor = activity.actors.find((a) => a.name === selectedActor);

  // Update getWordColor to use fuzzy matching
  const getWordColor = (word: string, index: number) => {
    if (!spokenWords[index]) return "";
    const normalizedSpoken = normalizeWord(spokenWords[index]);
    const cleanedTarget = cleanTargetWord(word);
    if (normalizedSpoken === cleanedTarget) {
      return "#22c55e"; // Green for exact match
    }
    if (
      normalizedSpoken.includes(cleanedTarget) ||
      cleanedTarget.includes(normalizedSpoken) ||
      levenshteinDistance(normalizedSpoken, cleanedTarget) <= 2
    ) {
      return "#f59e0b"; // Yellow for close match
    }
    return "#ef4444"; // Red for no match
  };

  // Percentage color generator like RepeatAndCompare
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

  // Character selection screen
  if (!selectedActor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center mb-8 p-8 rounded-2xl shadow-xl bg-backgroundMain">
          <div className="bg-primary/10 rounded-full p-6 mb-4">
            <Lottie
              animationData={conversationLottie}
              loop={true}
              width={64}
              height={64}
              className="w-44 h-44 md:w-60 md:h-60"
            />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2 text-main">
            جای چه شخصی میخواهید مکالمه کنید؟
          </h2>
          <div className="text-gray400 text-center mb-6">
            یک کاراکتر را انتخاب کنید و مکالمه شروع میشه.
          </div>
          <div className="flex gap-8 mt-4">
            {activity.actors.map((actor) => (
              <button
                key={actor.name}
                className="flex flex-col items-center focus:outline-none"
                onClick={() => onActorSelect(actor.name)}
              >
                <img
                  src={actor.image}
                  alt={actor.name}
                  className="w-28 md:w-40 h-28 md:h-40 rounded-2xl object-cover shadow-lg mb-2 p-4"
                />
                <span className="font-bold text-lg text-main mt-2">
                  {actor.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Conversation screen
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* <OutlineButton className="w-fit px-2 ml-auto" onClick={handleSkip}>
        نمیتوانم صحبت کنم، پایان درس
      </OutlineButton> */}

      <div className="bg-backgroundMain rounded-xl shadow-lg py-4 pt-8 px-10 mb-8 w-full flex items-center justify-center min-h-[180px]">
        <div
          className={`flex items-end gap-4 ${
            userIsCurrent ? "justify-end flex-row-reverse" : "justify-start"
          } w-full`}
        >
          <img
            src={userIsCurrent ? userActor?.image : otherActor?.image}
            alt={userIsCurrent ? userActor?.name : otherActor?.name}
            className="w-14 h-14 rounded-full object-cover shadow"
          />
          <div
            className={`rounded-2xl px-6 py-4 shadow text-lg font-medium text-main ${
              userIsCurrent
                ? "bg-blue-500 dark:bg-gray-800"
                : "bg-blue-200 dark:bg-blue-800"
            }`}
            style={{
              borderTopLeftRadius: userIsCurrent ? 24 : 0,
              borderTopRightRadius: userIsCurrent ? 0 : 24,
            }}
          >
            <span
              className="font-bold block mb-1 text-gray300 text-left"
              dir="ltr"
            >
              {userIsCurrent ? "You" : otherActor?.name}
            </span>
            <span className="text-main !text-left w-full block" dir="ltr">
              {activity.content.text}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 w-full">
        {userIsCurrent ? (
          <>
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
                    onClick={handlePlay}
                    disabled={isPlaying || isTTSLoading}
                    className="!w-20 !h-20 !bg-primary/10 shadow-lg border-2 border-primary flex items-center justify-center"
                  >
                    {isPlaying || isTTSLoading ? (
                      <WaveLoading />
                    ) : (
                      <VolumeUpIcon className="!w-10 !h-10 !text-primary" />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={isRecording ? stopRecording : startRecording}
                    disabled={!hasMicrophoneAccess}
                    className={`!w-20 !h-20 !bg-primary/10 shadow-lg border-2 border-primary flex items-center justify-center ${
                      !hasMicrophoneAccess
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <KeyboardVoiceIcon
                      className={`!w-10 !h-10 !text-primary ${
                        isRecording ? "animate-ping" : ""
                      }`}
                    />
                  </IconButton>
                </div>
                <div className="text-center text-gray400 mt-2">
                  {!hasMicrophoneAccess
                    ? "لطفا دسترسی به میکروفون را فعال کنید"
                    : isRecording
                    ? "درحال ضبط..."
                    : "Tap to record your voice"}
                </div>
                {/* Per-word feedback */}
                {spokenWords.length > 0 && (
                  <div
                    className="text-main font-medium flex items-center flex-wrap justify-center mt-6"
                    dir="ltr"
                  >
                    {activity.content.text.split(" ").map((word, index) => (
                      <span
                        className="font-medium text-lg lg:text-xl"
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
                {/* Error message */}
                {error && (
                  <div className="mt-2 text-red-500 font-bold">{error}</div>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <IconButton
              onClick={handlePlay}
              disabled={isPlaying || isTTSLoading}
              className="!w-20 !h-20 !bg-primary/10 shadow-lg border-2 border-primary flex items-center justify-center"
            >
              {isPlaying || isTTSLoading ? (
                <WaveLoading />
              ) : (
                <VolumeUpIcon className="!w-10 !h-10 !text-primary" />
              )}
            </IconButton>
            <div className="text-center text-gray400 mt-2">
              {audioPlayed ? "" : "برای شنیدن کلیک کنید"}
            </div>
          </>
        )}
        <div className="flex items-center gap-4 mt-4 ">
          <PrimaryButton
            className="px-8 py-3 rounded-full bg-primary text-white font-bold text-lg shadow-lg disabled:opacity-50"
            buttonProps={{
              disabled: userIsCurrent
                ? accuracyPercentage === null || accuracyPercentage < 90
                : !audioPlayed,
            }}
            onClick={() => {
              if (userIsCurrent) {
                if (accuracyPercentage !== null && accuracyPercentage >= 90) {
                  setAudioPlayed(false);
                  setAccuracyPercentage(null);
                  setSpokenWords([]);
                  setError(null);
                  handleNext();
                } else {
                  setError("دوباره تلاش کنید");
                }
              } else {
                setAudioPlayed(false);
                handleNext();
              }
            }}
          >
            ادامه
          </PrimaryButton>
          <PrimaryButton
            onClick={handleGoNext}
            className="mt-1 px-6 py-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
          >
            رد شدن
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Roleplay;
