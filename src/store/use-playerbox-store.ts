// lib/stores/player-store.ts
import { create } from "zustand";
import { shallow } from "zustand/shallow";

interface PlayerState {
  currentSubtitle: string;
  currentCaptionIndex: number;
  playedSeconds: number;
  setCurrentSubtitle: (subtitle: string) => void;
  setCurrentCaptionIndex: (index: number) => void;
  setPlayedSeconds: (second: number) => void;
}

const usePlayerStore = create<PlayerState>()((set) => ({
  currentSubtitle: "",
  currentCaptionIndex: 0,
  playedSeconds: 0,

  setCurrentSubtitle: (subtitle: string) => set({ currentSubtitle: subtitle }),
  setCurrentCaptionIndex: (index: number) =>
    set({ currentCaptionIndex: index }),
  setPlayedSeconds: (second: number) => set({ playedSeconds: second }),
}));

export default usePlayerStore;
