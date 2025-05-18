"use client";

import NextTopLoader from "nextjs-toploader";
import { ReactNode, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

interface Props {
  children: ReactNode;
}

const ProgressBarProvider = ({ children }: Props) => {
  const [showAtBottom, setShowAtBottom] = useState(false);

  useEffect(() => {
    setShowAtBottom(isMobile);
  }, []);

  return (
    <>
      {children}
      <NextTopLoader
        color="var(--primary)" // Progress bar color
        height={3} // Height in pixels
        showSpinner={false} // Disable spinner
        showAtBottom={showAtBottom}
      />
    </>
  );
};

export default ProgressBarProvider;
