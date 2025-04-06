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
         text-center max-h-[50px] box-border font-semibold rounded-xl no-underline text-sm shadow-none bg-transparent border border-b-[5px] border-primary text-primary         !transition-all
        !duration-500 
        ${
          buttonProps.disabled
            ? "!border-backgroundDisabled !text-backgroundDisabled border-b-disabled"
            : "hover:translate-y-0.5 active:translate-y-1.5"
        }
         ${className}
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
