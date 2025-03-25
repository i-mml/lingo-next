import { createWithEqualityFn } from "zustand/traditional";

export interface IPlayerBoxStoreType {
  currentSubtitle: any;
  currentCaptionIndex: number;
  playedSeconds: number;
}

const usePlayerBoxStore = createWithEqualityFn((set) => ({
  currentSubtitle: "",
  currentCaptionIndex: 0,
  playedSeconds: 0,

  setCurrentSubtitle: (subtitle: string) => set({ currentSubtitle: subtitle }),
  setCurrentCaptionIndex: (index: number) =>
    set({ currentCaptionIndex: index }),
  setPlayedSeconds: (second: number) => set({ playedSeconds: second }),
}));

export default usePlayerBoxStore;
