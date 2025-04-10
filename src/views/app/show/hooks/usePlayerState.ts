import * as React from "react";
import { useVideoPlayerStore } from "../store/playerStore";
import { shallow } from "zustand/shallow";
import { getSentenceGrammar } from "@/api/services/cms";
import { useMutation } from "@tanstack/react-query";

export const usePlayerState = () => {
  const [recordModal, setRecordModal] = React.useState(false);
  const [settingModal, setSettingModal] = React.useState(false);
  const [playerModals, setPlayerModals] = React.useState<{
    type: "" | "BEFORE_LEAVE" | "WANNA_QUIZ";
    state: boolean;
  }>({
    type: "",
    state: false,
  });

  const {
    play,
    setLight,
    pause,
    seek,
    setDuration,
    fetchSubtitleGrammarStart,
    fetchSubtitleGrammarSuccess,
    fetchSubtitleGrammarFailure,
    setSubtitleTranslateLanguages,
  } = useVideoPlayerStore(
    (state) => ({
      play: state.play,
      setLight: state.setLight,
      pause: state.pause,
      seek: state.seek,
      setDuration: state.setDuration,
      fetchSubtitleGrammarStart: state.fetchSubtitleGrammarStart,
      fetchSubtitleGrammarSuccess: state.fetchSubtitleGrammarSuccess,
      fetchSubtitleGrammarFailure: state.fetchSubtitleGrammarFailure,
      setSubtitleTranslateLanguages: state.setSubtitleTranslateLanguages,
    }),
    shallow
  );

  const handlePreview = () => {
    play();
    setTimeout(() => {
      setLight(false);
    }, 100);
  };

  const handlePause = React.useCallback(() => {
    pause();
  }, [pause]);

  const toggleRecordModal = React.useCallback(() => {
    handlePause();
    setTimeout(() => {
      setRecordModal((prev) => !prev);
    }, 300);
  }, [handlePause]);

  const togglePlayerSettingModal = React.useCallback(() => {
    handlePause();
    setTimeout(() => {
      setSettingModal((prev) => !prev);
    }, 300);
  }, [handlePause]);

  const handlePlay = React.useCallback(() => {
    play();
    setTimeout(() => {
      setLight(false);
    }, 200);
  }, [play, setLight]);

  const handleEnded = () => {
    setPlayerModals({ state: true, type: "WANNA_QUIZ" });
  };

  const handleProgress = (progress: { playedSeconds: number }) => {
    seek(progress.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const fetchSubtitleGrammar = async (subtitle: any) => {
    fetchSubtitleGrammarStart();

    try {
      const grammarData = await getSentenceGrammar(subtitle);
      fetchSubtitleGrammarSuccess(grammarData as any);
      return grammarData;
    } catch (error: any) {
      fetchSubtitleGrammarFailure(error.message);
      return;
    }
  };

  const handleFetchGrammarDetect = useMutation({
    mutationKey: ["fetch-grammar-detect"],
    mutationFn: (subtitle: string) => fetchSubtitleGrammar(subtitle),
  });

  const handleFetchGrammar = async (subtitle: string) => {
    if (subtitle) {
      await handleFetchGrammarDetect.mutateAsync(subtitle);
    }
  };

  return {
    recordModal,
    settingModal,
    playerModals,
    setRecordModal,
    setSettingModal,
    setPlayerModals,
    handlePreview,
    handlePause,
    toggleRecordModal,
    togglePlayerSettingModal,
    handlePlay,
    handleEnded,
    handleProgress,
    handleDuration,
    handleFetchGrammar,
  };
};
