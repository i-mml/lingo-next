import { createWithEqualityFn } from "zustand/traditional";

const useStore = createWithEqualityFn((set) => ({
  currentSubtitle: "",
  currentCaptionIndex: 0,
  playedSeconds: 0,

  setCurrentSubtitle: (subtitle: any) => set({ currentSubtitle: subtitle }),
  setCurrentCaptionIndex: (index: any) => set({ currentCaptionIndex: index }),
  setPlayedSeconds: (second: any) => set({ playedSeconds: second }),
}));

export default useStore;
