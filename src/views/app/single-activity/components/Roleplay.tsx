import React, { useState } from "react";
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
  const [failedAttempts, setFailedAttempts] = useState(0);
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
    setError(null);
    setIsRecording(true);
    recognition && recognition.start();
  };

  function normalizeWord(word: string) {
    // Remove all punctuation for comparison
    return word.replace(/[.,;!?،؟:؛\-—_"'()\[\]{}]/g, "").toLowerCase();
  }

  const calculateAccuracy = (spoken: string[]) => {
    // Remove punctuation from both spoken and target
    const targetWords = activity.content.text
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
    if (accuracy >= 90) {
      setTimeout(() => {
        setAudioPlayed(false);
        setAccuracyPercentage(null);
        setSpokenWords([]);
        setError(null);
        setFailedAttempts(0);
        setShowSkipButton(false);
        handleNext();
      }, 1000);
    } else {
      setError("دوباره تلاش کنید ..!");
      setFailedAttempts((prev) => {
        const newAttempts = prev + 1;
        if (newAttempts >= 3) setShowSkipButton(true);
        return newAttempts;
      });
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognition && recognition.stop();
    calculateAccuracy(spokenWords);
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

  // Per-word feedback coloring like RepeatAndCompare
  const getWordColor = (word: string, index: number) => {
    if (!spokenWords[index]) return "";
    return normalizeWord(spokenWords[index]) === normalizeWord(word)
      ? "#22c55e"
      : "#ef4444";
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
      <OutlineButton className="w-fit px-2 ml-auto" onClick={handleSkip}>
        نمیتوانم صحبت کنم، پایان درس
      </OutlineButton>

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
                className="!w-20 !h-20 !bg-primary/10 shadow-lg border-2 border-primary flex items-center justify-center"
              >
                <KeyboardVoiceIcon
                  className={`!w-10 !h-10 !text-primary ${
                    isRecording ? "animate-ping" : ""
                  }`}
                />
              </IconButton>
            </div>
            <div className="text-center text-gray400 mt-2">
              {isRecording ? "درحال ضبط..." : "Tap to record your voice"}
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
            {showSkipButton && (
              <PrimaryButton
                onClick={() => {
                  setAudioPlayed(false);
                  setAccuracyPercentage(null);
                  setSpokenWords([]);
                  setError(null);
                  setFailedAttempts(0);
                  setShowSkipButton(false);
                  handleNext();
                }}
                className="mt-1 px-6 py-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
              >
                رد شدن
              </PrimaryButton>
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
        <PrimaryButton
          className="mt-4 px-8 py-3 rounded-full bg-primary text-white font-bold text-lg shadow-lg disabled:opacity-50"
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
      </div>
    </div>
  );
};

export default Roleplay;
