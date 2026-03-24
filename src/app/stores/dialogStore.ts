import type { ReactNode } from "react";
import { create } from "zustand";

export type DialogTypes = "confirmation" | "alert" | "";

type Dialog = {
  isVisible: boolean;
  type: DialogTypes;
  title?: string;
  text?: string;
  content?: ReactNode;
  onConfirm?: () => void;
};

type DialogState = {
  dialog: Dialog;
  showConfirmation: (
    title: string,
    text: string,
    onConfirm: () => void,
  ) => void;
  showDialog: (type: DialogTypes) => void;
  setContent: (content: ReactNode) => void;
  setText: (title: string, text: string) => void;
  hideDialog: () => void;
};

export const useDialog = create<DialogState>((set) => ({
  dialog: {
    isVisible: false,
    type: "",
  },
  showConfirmation: (title, text, onConfirm) =>
    set({
      dialog: {
        type: "confirmation",
        isVisible: true,
        title,
        text,
        onConfirm,
      },
    }),
  showDialog: (type) => set({ dialog: { type, isVisible: true } }),
  setContent: (content) =>
    set((state) => ({
      dialog: { ...state.dialog, content: content, isVisible: true },
    })),
  setText: (title, text) =>
    set((state) => ({
      dialog: {
        ...state.dialog,
        text,
        title,
        content: undefined,
        isVisible: true,
      },
    })),
  hideDialog: () => set({ dialog: { isVisible: false, type: "" } }),
}));
