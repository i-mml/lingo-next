import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserInfo: any = create(
  persist(
    (set) => ({
      user: {
        is_onboard: false,
      },
      setUser: (user: any) => set(() => ({ user })),
      updateUser: (userUpdate: any) =>
        set((state: any) => ({ user: { ...state.user, ...userUpdate } })),
    }),
    {
      name: "lingoUserInfo",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
