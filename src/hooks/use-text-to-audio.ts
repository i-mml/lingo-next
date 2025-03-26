import { useCallback, useState } from "react";
import { useAuth } from "./use-auth";
import { toast } from "react-toastify";

export function useTextToAudio() {
  const anchorOrigin = { horizontal: "right", vertical: "top" };
  const errorOption: any = {
    variant: "error",
    anchorOrigin,
  };
  const { whoAmI } = useAuth();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentText, setCurrentText] = useState<string | null>();

  const handleSpeak = useCallback(
    ({ text, language }: { text: string; language?: string }) => {
      if ("speechSynthesis" in window) {
        setCurrentText(text);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang =
          language ||
          (!!whoAmI?.userpreference?.preferred_language
            ? whoAmI?.userpreference?.preferred_language === 2
              ? "en-US"
              : "de-DE"
            : null) ||
          "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;

        utterance.onstart = () => {
          setIsSpeaking(true);
        };

        utterance.onend = () => {
          setCurrentText(null);
          setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
      } else {
        toast.error("Error fetching text to speech data", errorOption);
        setCurrentText(null);
      }
    },
    [whoAmI]
  );
  // const getTextToSpeech = useMutation(GetEducationTextToSpeech, {
  //   onSuccess: async (data) => {
  //     try {
  //       const audioBlob = new Blob([data.data], { type: "audio/mpeg" });
  //       const audioUrl = URL.createObjectURL(audioBlob);
  //       const audio = new Audio(audioUrl);
  //       audio.play();
  //     } catch {}
  //   },
  //   onError: () => {
  //     enqueueSnackbar("Error fetching text to speech data", errorOption);
  //   },
  // });

  const handleTextToSpeech = async (params: {
    text: string;
    language?: string;
  }) => {
    try {
      await handleSpeak(params);
    } catch {}
  };

  return {
    handleTextToSpeech,
    textToSpeachMutation: { isLoading: isSpeaking, text: currentText },
  };
}
