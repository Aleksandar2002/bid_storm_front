// searchStore.ts
import { create } from "zustand";

interface SearchState {
  keyword: string;
  setKeyword: (val: string) => void;
  clearKeyword: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  keyword: "",
  setKeyword: (val) => set({ keyword: val }),
  clearKeyword: () => set({ keyword: "" }),
}));
