import { useEffect, useState } from "react";

export function useAudioPlayer(audioFile: string): { playAudio: () => void } {
  const [audio, setAudio] = useState<any>(null);

  useEffect(() => {
    const audioElement = document.createElement("audio");
    audioElement.src = audioFile;
    setAudio(audioElement);
  }, [audioFile]);

  const playAudio = () => {
    if (audio) {
      audio.play();
    }
  };
  return { playAudio };
}
