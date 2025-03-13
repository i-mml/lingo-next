import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useLanguage = create(
  persist(
    (set: any) => ({
      language: "FA",
      setAppLanguage: (e: any) => set(() => ({ language: e })),
    }),
    {
      name: "languageConfig",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
