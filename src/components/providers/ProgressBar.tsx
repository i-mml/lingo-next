"use client";

import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ProgressBarProvider = ({ children }: Props) => {
  return (
    <>
      {children}
      <NextTopLoader
        color="var(--primary)" // Progress bar color
        height={3} // Height in pixels
        showSpinner={false} // Disable spinner
      />
    </>
  );
};

export default ProgressBarProvider;
