import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useThemeType = create(
  persist(
    (set: any) => ({
      isDark: true,
      setIsDark: (e: any) =>
        set(() => {
          console.log("called,", e);
          return { isDark: e };
        }),
    }),
    {
      name: "themeConfig",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
