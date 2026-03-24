import { create } from "zustand";

type LoadingState = {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
};

export const useLoading = create<LoadingState>((set) => ({
  isLoading: false,
  showLoading: () => set({ isLoading: true }),
  hideLoading: () => set({ isLoading: false }),
}));
