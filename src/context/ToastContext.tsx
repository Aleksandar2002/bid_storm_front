import { createContext, useState, type ReactNode } from "react";
import ToastMessage from "../shared/components/global/ToastMessage";

type Toast = {
  visibility: boolean;
  message: string;
  class: "success" | "error" | "warning" | "";
};

const ToastContext = createContext<{
  toast: Toast | null;
  setErrorToast: (message: string) => void;
  setSuccessToast: (message: string) => void;
  setWarningToast: (message: string) => void;
  hideToast: () => void;
}>({
  toast: null,
  setErrorToast: () => {},
  setWarningToast: () => {},
  setSuccessToast: () => {},
  hideToast: () => {},
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<Toast>({
    visibility: false,
    message: "",
    class: "",
  });

  const setSuccessToast = (message: string) => {
    setToast({
      visibility: true,
      message: message,
      class: "success",
    });
  };

  const setErrorToast = (message: string) => {
    setToast({
      visibility: true,
      message: message,
      class: "error",
    });
  };

  const setWarningToast = (message: string) => {
    setToast({
      visibility: true,
      message: message,
      class: "warning",
    });
  };

  const hideToast = () =>
    setToast({
      message: "",
      visibility: false,
      class: "",
    });

  return (
    <ToastContext.Provider
      value={{
        toast,
        setSuccessToast,
        setErrorToast,
        setWarningToast,
        hideToast,
      }}
    >
      {children}
      <ToastMessage></ToastMessage>
    </ToastContext.Provider>
  );
};

export default ToastContext;
