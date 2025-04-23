"use client";

import axiosInstance from "@/api/configs";
import { getCookie } from "cookies-next";
import { useEffect, useRef, useState } from "react";

const THREE_MINUTE = 3 * 60 * 1000;

const ActiveUserTracker = () => {
  const [isActiveTab, setIsActiveTab] = useState(true);
  const intervalRef = useRef(null);

  function handleVisibilityChange() {
    setTimeout(() => {
      if (document.hidden) {
        setIsActiveTab(false);
      } else {
        setIsActiveTab(true);
      }
    }, 2000);
  }

  const updateTracker = () => {
    axiosInstance.post("/auth/activity/update/", {
      time_spent: THREE_MINUTE,
    });
  };

  useEffect(() => {
    const startInterval = () => {
      if (!intervalRef.current) {
        // @ts-ignore
        intervalRef.current = setInterval(() => {
          const userToken = getCookie("zabano-access-token");
          const isGuest = !userToken || userToken === "";
          if (!isGuest) {
            updateTracker();
          }
        }, THREE_MINUTE);
      }
    };

    const clearIntervalTracker = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (isActiveTab) {
      startInterval();
    } else {
      clearIntervalTracker();
    }

    return () => {
      clearIntervalTracker();
    };
  }, [isActiveTab]);

  useEffect(() => {
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
      false
    );
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <></>;
};

export default ActiveUserTracker;
