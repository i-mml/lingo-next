import React from "react";

const OutlineButton = ({
  children,
  height = 49,
  onClick,
  className = "",
  style = {},
  buttonProps = {},
}: any) => {
  return (
    <button
      style={{ height: `${height}px`, ...style }}
      className={`
        max-h-[50px]
        px-2
        font-vazirmatn
        text-[14px]
        text-center
        !rounded-xl
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
        !text-primary ${className}
      `}
      height={height}
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
