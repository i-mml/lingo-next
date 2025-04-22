"use client";

import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";
import { isMobile } from "react-device-detect";

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
        showAtBottom={isMobile}
      />
    </>
  );
};

export default ProgressBarProvider;
