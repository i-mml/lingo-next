import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserInfo = create(
  persist(
    (set) => ({
      user: {
        is_onboard: false,
      },
      setUser: (user) => set((state) => ({ user })),
      updateUser: (userUpdate) =>
        set((state) => ({ user: { ...state.user, ...userUpdate } })),
    }),
    {
      name: "lingoUserInfo",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
