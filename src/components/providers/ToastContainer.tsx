import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainerWithConfig = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default ToastContainerWithConfig;
