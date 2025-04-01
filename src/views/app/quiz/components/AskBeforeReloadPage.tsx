"use client";

import { useEffect } from "react";

const AskBeforeReloadPage = () => {
  useEffect(() => {
    const alertUser = (e: any) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default AskBeforeReloadPage;
