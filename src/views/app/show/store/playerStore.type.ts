// Define the state type
export interface VideoPlayerState {
  playing: boolean;
  controls: boolean;
  volume: number;
  light: boolean;
  progress: { playedSeconds: number };
  duration: number;
  learningSubtitle: boolean;
  translateSubtitle: boolean;
  playbackRate: number;
  subtitle_grammars: any[]; // Replace `any` with a proper type if possible
  loadingSubtitleGrammar: boolean;
  subtitleGrammarError: string | null;
  main_fontSize: number;
  translate_fontSize: number;
  subtitleTranslateLanguages: string[];

  // Actions
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setDuration: (duration: number) => void;
  seek: (playedSeconds: number) => void;
  setVolume: (volume: number) => void;
  setLight: (light: boolean) => void;
  setPlaybackRate: (playbackRate: number) => void;
  toggleLearningSubtitle: () => void;
  toggleTranslateSubtitle: () => void;
  setSubtitleTranslateLanguages: (languages: string[]) => void;
  fetchSubtitleGrammarStart: () => void;
  fetchSubtitleGrammarSuccess: (grammars: any[]) => void; // Replace `any` with a proper type
  fetchSubtitleGrammarFailure: (error: string) => void;
  increaseMainFontSize: () => void;
  decreaseMainFontSize: () => void;
  increaseTranslateFontSize: () => void;
  decreaseTranslateFontSize: () => void;
}
