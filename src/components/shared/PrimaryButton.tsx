import React from "react";

const PrimaryButton = ({
  children,
  height = "49.9px",
  onClick,
  className = "",
  style = {},
  buttonProps = {},
}: any) => {
  return (
    <button
      className={`
        px-2
        font-dana
        text-[14px]
        text-center
        !rounded-xl
        bg-primary
        font-medium
        !transition-all
        !duration-500 
        !text-white 
        disabled:bg-backgroundDisabled
        disabled:border-b-[#838383]
        disabled:!text-gray400
        disabled:cursor-not-allowed
        active:hover:translate-y-0.5
        active:translate-y-1.5
        border-b-[5px] border-[#af5800]
        cursor-pointer
        outline-none  ${className}
      `}
      variant="contained"
      height={height}
      onClick={onClick}
      style={{ ...style, height: height || 50 }}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
