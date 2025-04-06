import { isMobile } from "react-device-detect";

import { createWithEqualityFn } from "zustand/traditional";
import { VideoPlayerState } from "./playerStore.type";

export const PLAYER_INITIAL_STATE = {
  playing: true,
  controls: false,
  volume: 1,
  light: false,
  progress: { playedSeconds: 0 },
  duration: 0,
  learningSubtitle: true,
  translateSubtitle: true,
  playbackRate: 1,
  subtitle_grammars: [],
  loadingSubtitleGrammar: false,
  subtitleGrammarError: null,
  main_fontSize: isMobile ? 18 : 22,
  translate_fontSize: isMobile ? 16 : 18,
  subtitleTranslateLanguages: ["translate"],
};

export const useVideoPlayerStore = createWithEqualityFn<VideoPlayerState>(
  (set) => ({
    ...PLAYER_INITIAL_STATE,

    // Actions
    play: () => set({ playing: true }),
    pause: () => set({ playing: false }),
    togglePlay: () => set((state) => ({ playing: !state.playing })),
    setDuration: (duration) => set({ duration }),
    seek: (playedSeconds) => set({ progress: { playedSeconds } }),
    setVolume: (volume) => set({ volume }),
    setLight: (light) => set({ light }),
    setPlaybackRate: (playbackRate) => set({ playbackRate }),
    toggleLearningSubtitle: () =>
      set((state) => ({ learningSubtitle: !state.learningSubtitle })),
    toggleTranslateSubtitle: () =>
      set((state) => ({ translateSubtitle: !state.translateSubtitle })),
    setSubtitleTranslateLanguages: (languages) =>
      set({ subtitleTranslateLanguages: languages }),
    fetchSubtitleGrammarStart: () =>
      set({ loadingSubtitleGrammar: true, subtitleGrammarError: null }),
    fetchSubtitleGrammarSuccess: (grammars) =>
      set({ loadingSubtitleGrammar: false, subtitle_grammars: grammars }),
    fetchSubtitleGrammarFailure: (error) =>
      set({ loadingSubtitleGrammar: false, subtitleGrammarError: error }),
    increaseMainFontSize: () =>
      set((state) => ({ main_fontSize: state.main_fontSize + 2 })),
    decreaseMainFontSize: () =>
      set((state) => ({ main_fontSize: state.main_fontSize - 2 })),
    increaseTranslateFontSize: () =>
      set((state) => ({ translate_fontSize: state.translate_fontSize + 2 })),
    decreaseTranslateFontSize: () =>
      set((state) => ({ translate_fontSize: state.translate_fontSize - 2 })),
  })
);
