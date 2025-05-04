import { useEffect, useState } from "react";

export function useAudioPlayer(audioFile: string): {
  playAudio: () => void;
  isPlaying: boolean;
} {
  const [audio, setAudio] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = document.createElement("audio");
    audioElement.src = audioFile;
    setAudio(audioElement);
    audioElement.addEventListener("play", () => setIsPlaying(true));
    audioElement.addEventListener("pause", () => setIsPlaying(false));
    audioElement.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audioElement.removeEventListener("play", () => setIsPlaying(true));
      audioElement.removeEventListener("pause", () => setIsPlaying(false));
      audioElement.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [audioFile]);

  const playAudio = () => {
    if (audio) {
      audio.play();
    }
  };
  return { playAudio, isPlaying };
}
