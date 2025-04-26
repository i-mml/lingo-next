import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle, AlertCircle, XCircle, Info } from "lucide-react";

// Create custom icons for toast notifications
export const toastIcons = {
  success: <CheckCircle size={20} />,
  error: <XCircle size={20} />,
  warning: <AlertCircle size={20} />,
  info: <Info size={20} />,
};

// Custom toast functions with consistent styling
export const showToast = {
  success: (message: string) =>
    toast.success(message, { icon: toastIcons.success }),

  error: (message: string) => toast.error(message, { icon: toastIcons.error }),

  warning: (message: string) =>
    toast.warning(message, { icon: toastIcons.warning }),

  info: (message: string) => toast.info(message, { icon: toastIcons.info }),
};

const ToastContainerWithConfig = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};

export default ToastContainerWithConfig;
