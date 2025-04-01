// components/ToastNotification.tsx
import React from "react";
import {
  ToastContainer,
  toast,
  ToastOptions,
  TypeOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toaster: React.FC = () => {
  return <ToastContainer position="top-right" autoClose={3000} />;
};

// Define a function for showing toasts
export const showToast = (
  message: string,
  type: TypeOptions = "default",
  options?: ToastOptions
) => {
  toast(message, { type, ...options });
};

export default Toaster;
