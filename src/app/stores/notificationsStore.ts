import { create } from "zustand";

type NotificationState = {
  unreadNotificationsCount: number;
  setCount: (count: number) => void;
  increaseCount: () => void;
  decreaseCount: () => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  unreadNotificationsCount: 0,
  setCount: (count: number) => set({ unreadNotificationsCount: count }),
  increaseCount: () =>
    set((state) => ({
      unreadNotificationsCount: state.unreadNotificationsCount + 1,
    })),
  decreaseCount: () =>
    set((state) => ({
      unreadNotificationsCount: state.unreadNotificationsCount - 1,
    })),
}));
