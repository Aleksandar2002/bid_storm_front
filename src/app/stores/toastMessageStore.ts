import { create } from "zustand";

type Toast = {
  visibility: boolean;
  message: string;
  type: "success" | "error" | "warning" | "";
};

type ToastState = {
  toast: Toast;
  setErrorToast: (message: string) => void;
  setSuccessToast: (message: string) => void;
  setWarningToast: (message: string) => void;
  hideToast: () => void;
};

export const useToast = create<ToastState>((set) => ({
  toast: {
    message: "",
    visibility: false,
    type: "",
  },
  setErrorToast: (message: string) =>
    set({
      toast: { message, visibility: true, type: "error" },
    }),
  setSuccessToast: (message: string) =>
    set({
      toast: { message, visibility: true, type: "success" },
    }),
  setWarningToast: (message: string) =>
    set({
      toast: { message, visibility: true, type: "warning" },
    }),
  hideToast: () =>
    set({
      toast: { message: "", visibility: false, type: "" },
    }),
}));
