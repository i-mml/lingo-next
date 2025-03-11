import { create } from "zustand";

export const useLoginModal: any = create((set) => ({
  isOpen: false,
  toggleLoginModal: () =>
    set((state: { isOpen: boolean }) => ({ isOpen: !state?.isOpen })),
  closeModal: () => set(() => ({ isOpen: false })),
}));
