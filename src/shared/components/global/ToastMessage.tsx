import React, { useEffect } from "react";
import { useToast } from "../../../app/stores/toastMessageStore";

const ToastMessage = () => {
  const { toast, hideToast } = useToast();

  useEffect(() => {
    if (toast.visibility) {
      const timer = setTimeout(() => {
        hideToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast || !toast.message || !toast.visibility) {
    return null;
  }

  return (
    <div className={"toast-div toast-color-" + toast.type}>
      <p>{toast.message}</p>
    </div>
  );
};

export default ToastMessage;
