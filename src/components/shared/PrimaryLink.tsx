import Link from "next/link";
import React from "react";

const PrimaryLink = ({
  href,
  children,
  className = "",
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  props?: any;
}) => {
  return (
    <Link
      href={href}
      className={`h-12 px-2 font-dana text-[14px] text-center !rounded-xl !bg-primary font-medium !transition-all !duration-500  !text-white  disabled:bg-backgroundDisabled disabled:border-b-backgroundDisabled disabled:cursor-not-allowed active:hover:translate-y-0.5 active:translate-y-1.5 border-b-[5px] border-[#af5800] cursor-pointer outline-none w-[60%] mx-auto grid place-items-center text-base md:text-lg md:!grid print:!hidden ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PrimaryLink;
