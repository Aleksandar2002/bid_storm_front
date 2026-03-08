import React, { useEffect } from "react";
import { useToast } from "../../hooks/useToast";

const ToastMessage = () => {
  const { toast, hideToast } = useToast();

  useEffect(() => {
    if (toast?.visibility) {
      const timer = setTimeout(() => {
        hideToast();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast || !toast.message || !toast.visibility) {
    return null;
  }

  return (
    <div className={"toast-div toast-color-" + toast.class}>
      <p>{toast?.message}</p>
    </div>
  );
};

export default ToastMessage;
