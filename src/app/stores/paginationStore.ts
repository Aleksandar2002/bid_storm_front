import { create } from "zustand";

type PaginationState = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  setPages: (totalPages: number, totalCount: number) => void;
  setCurrentPage: (currentPage: number) => void;
  resetPagination: () => void;
};

export const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  totalPages: 1,
  totalCount: 1,
  setPages: (totalPages: number, totalCount) => set({ totalPages, totalCount }),
  setCurrentPage: (currentPage: number) => set({ currentPage }),
  resetPagination: () => set({ currentPage: 1 }),
}));
