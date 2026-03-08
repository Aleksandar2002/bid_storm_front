import { create } from "zustand";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  isSuperAdmin: boolean;
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
