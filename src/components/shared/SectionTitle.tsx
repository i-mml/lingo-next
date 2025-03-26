import clsx from "clsx";
import React, { ReactNode } from "react";

const SectionTitle = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <h2 className={clsx("text-[16px]", className)}>{children || ""}</h2>;
};

export default SectionTitle;
