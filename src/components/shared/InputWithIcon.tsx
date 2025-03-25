"use client";

import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OpenEye from "@/assets/open-eye.svg";
import ClosedEye from "@/assets/password-close-eye.svg";

interface InputWithIconProps {
  icon: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  className?: string;
  focused?: boolean;
  isPassword?: boolean;
  onClickBox?: () => void;
}

const InputWithIcon = ({
  icon,
  inputProps,
  className = "",
  focused = false,
  isPassword = false,
  onClickBox,
}: InputWithIconProps) => {
  const [inputType, setInputType] = useState<"text" | "password">(
    isPassword ? "password" : "text"
  );

  const toggleInputType = () => {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div
      className={`relative flex items-center gap-2 w-full border rounded-lg hover:border-primary transition-all
        ${focused ? "border-primary" : "border-gray-300"}
        hover:border-gray-400 ${className}`}
      onClick={onClickBox}
    >
      {/* Icon */}
      <div className="p-2 text-gray-500">{icon}</div>

      {/* Input */}
      <input
        {...inputProps}
        type={inputType}
        className={`w-full h-full py-3 bg-transparent !outline-none 
          text-main !border-none ${inputProps?.className || ""}`}
        dir="rtl"
      />

      {/* Password Toggle */}
      {isPassword && (
        <IconButton
          onClick={toggleInputType}
          size="small"
          className="!mr-2 !text-gray-500"
          aria-label="toggle password visibility"
        >
          {inputType === "password" ? (
            <ClosedEye className="!w-6 !h-6" />
          ) : (
            <OpenEye className="!w-6 !h-6" />
          )}
        </IconButton>
      )}
    </div>
  );
};

export default InputWithIcon;
