import React from "react";
import { Button } from "@mui/material";

const OutlineButton = ({
  children,
  height = "49.9px",
  onClick,
  className = "",
  style = {},
  buttonProps = {},
}: any) => {
  return (
    <Button
      className={`
        h-[${height}]
        max-h-[50px]
        px-2
        font-dana
        text-[14px]
        text-center
        !rounded-2xl
        border
        border-primary
        !border-b-4
        !transition-all
        !duration-500
        bg-transparent
        ${
          buttonProps.disabled
            ? "border-disabled border-b-disabled"
            : "hover:translate-y-0.5 active:translate-y-1.5"
        }
        cursor-pointer
        outline-none
        text-primary ${className}
      `}
      variant="outlined"
      height={height}
      onClick={onClick}
      style={style}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export default OutlineButton;
