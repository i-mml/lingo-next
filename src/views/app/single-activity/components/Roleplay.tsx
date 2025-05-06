import React, { useState } from "react";
import { RoleplayActivity } from "../types";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import WaveLoading from "@/components/shared/WaveLoading";
import { IconButton } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";

interface Props {
  activity: RoleplayActivity;
  handleNext: () => void;
}

const Roleplay: React.FC<Props> = ({ activity, handleNext }) => {
  const [selectedActor, setSelectedActor] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recorded, setRecorded] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentPattern = activity.patterns[currentIndex];
  const userIsCurrent = selectedActor && currentPattern.actor === selectedActor;
  const otherActor = activity.actors.find((a) => a.name !== selectedActor);
  const userActor = activity.actors.find((a) => a.name === selectedActor);

  // Speech recognition setup (simple, as in RepeatAndCompare)
  let recognition: any = null;
  if (
    typeof window !== "undefined" &&
    (window as any).webkitSpeechRecognition
  ) {
    recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onresult = () => {
      setRecorded(true);
    };
  }

  const startRecording = () => {
    setRecorded(false);
    setIsRecording(true);
    recognition && recognition.start();
  };
  const stopRecording = () => {
    setIsRecording(false);
    recognition && recognition.stop();
    setRecorded(true);
  };

  const { playAudio, isPlaying: isAudioPlaying } = useAudioPlayer(
    currentPattern.audio
  );

  const handlePlayAudio = async () => {
    setIsPlaying(true);
    await playAudio();
    setIsPlaying(false);
    setAudioPlayed(true);
  };

  const handleContinue = () => {
    setRecorded(false);
    setAudioPlayed(false);
    setIsRecording(false);
    setCurrentIndex((idx) => idx + 1);
    if (currentIndex === activity.patterns.length - 1) {
      handleNext();
    }
  };

  // Character selection screen
  if (!selectedActor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center mb-8 glass-bg p-8 rounded-2xl shadow-xl">
          <div className="bg-primary/10 rounded-full p-6 mb-4">
            <svg width="64" height="64" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 22c4.97 0 9-3.58 9-8 0-2.22-1.06-4.22-2.81-5.67.01-.11.01-.22.01-.33C18.2 4.01 15.19 1 11.6 1c-3.59 0-6.6 3.01-6.6 6.7 0 .11 0 .22.01.33C4.06 9.78 3 11.78 3 14c0 4.42 4.03 8 9 8z"
                fill="#00B8F4"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">
            Who are you going to interpret?
          </h2>
          <div className="text-gray-500 text-center mb-6">
            Pick a character and play their role.
          </div>
          <div className="flex gap-8 mt-4">
            {activity.actors.map((actor) => (
              <button
                key={actor.name}
                className="flex flex-col items-center focus:outline-none"
                onClick={() => setSelectedActor(actor.name)}
              >
                <img
                  src={actor.image}
                  alt={actor.name}
                  className="w-32 h-32 rounded-2xl object-cover shadow-lg mb-2"
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
    <div className="w-full max-w-2xl mx-auto pt-8 flex flex-col items-center">
      {/* Progress bar */}
      <div className="w-full flex justify-end mb-2">
        <span className="text-main font-bold text-lg">
          {currentIndex + 1}/{activity.patterns.length}
        </span>
      </div>
      <div className="w-full h-2 bg-borderMain rounded mb-8">
        <div
          className="h-2 bg-primary rounded"
          style={{
            width: `${((currentIndex + 1) / activity.patterns.length) * 100}%`,
            transition: "width 0.3s",
          }}
        />
      </div>
      {/* Chat bubbles */}
      <div className="flex flex-col gap-8 w-full items-center mb-12 glass-bg p-8 rounded-2xl shadow-xl">
        {activity.patterns.slice(0, currentIndex + 1).map((pattern, idx) => {
          const actor = activity.actors.find((a) => a.name === pattern.actor);
          const isUser = pattern.actor === selectedActor;
          return (
            <div
              key={pattern.id}
              className={`flex items-end gap-4 ${
                isUser ? "justify-end flex-row-reverse" : "justify-start"
              } w-full`}
            >
              <img
                src={actor?.image}
                alt={actor?.name}
                className="w-14 h-14 rounded-full object-cover shadow"
              />
              <div
                className={`rounded-2xl px-6 py-4 shadow text-lg font-medium ${
                  isUser ? "bg-primary/10 text-primary" : "bg-white text-main"
                }`}
                style={{
                  borderTopLeftRadius: isUser ? 24 : 0,
                  borderTopRightRadius: isUser ? 0 : 24,
                }}
              >
                <span className="font-bold block mb-1">
                  {isUser ? "You" : actor?.name}
                </span>
                <span>{pattern.text}</span>
              </div>
            </div>
          );
        })}
      </div>
      {/* Action area */}
      <div className="flex flex-col items-center gap-6 w-full">
        {userIsCurrent ? (
          <>
            <IconButton
              onClick={isRecording ? stopRecording : startRecording}
              className="!w-24 !h-24 !bg-primary/10 shadow-lg border-2 border-primary flex items-center justify-center"
            >
              <KeyboardVoiceIcon
                className={`!w-12 !h-12 !text-primary ${
                  isRecording ? "animate-ping" : ""
                }`}
              />
            </IconButton>
            <div className="text-center text-gray-500 mt-2">
              {isRecording
                ? "Recording..."
                : recorded
                ? "Tap to continue"
                : "Tap to record your voice"}
            </div>
            <button
              className="mt-4 px-8 py-3 rounded-full bg-primary text-white font-bold text-lg shadow-lg disabled:opacity-50"
              disabled={!recorded}
              onClick={handleContinue}
            >
              Continue
            </button>
          </>
        ) : (
          <>
            <IconButton
              onClick={handlePlayAudio}
              disabled={isAudioPlaying}
              className="!w-24 !h-24 !bg-primary/10 shadow-lg border-2 border-primary flex items-center justify-center"
            >
              {isAudioPlaying ? (
                <WaveLoading />
              ) : (
                <VolumeUpIcon className="!w-12 !h-12 !text-primary" />
              )}
            </IconButton>
            <div className="text-center text-gray-500 mt-2">
              {audioPlayed ? "Tap to continue" : "Tap to listen"}
            </div>
            <button
              className="mt-4 px-8 py-3 rounded-full bg-primary text-white font-bold text-lg shadow-lg disabled:opacity-50"
              disabled={!audioPlayed}
              onClick={handleContinue}
            >
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Add glassmorphism styles
// You can move this to a global CSS file if you prefer
if (typeof window !== "undefined") {
  const styleId = "roleplay-glass-bg-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
      .glass-bg {
        background: rgba(255, 255, 255, 0.35);
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.18);
      }
    `;
    document.head.appendChild(style);
  }
}

export default Roleplay;
