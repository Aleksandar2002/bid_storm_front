import { create } from "zustand";
import type { UseCaseId } from "../Enums/UseCases";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  isSuperAdmin: boolean;
  allowedUseCases: UseCaseId[];
};

type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
}));
