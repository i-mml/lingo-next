import axiosInstance from "@/api/configs";
import { getCookie } from "cookies-next";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";

const ONE_MINUTE = 60 * 1000;

const ActiveUserMovieTracker = memo(
  ({
    currentPlayedSecond,
    episode_id,
    isPlaying,
  }: {
    currentPlayedSecond: number;
    episode_id: number;
    isPlaying: boolean;
  }) => {
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

    const updateTracker = useCallback(() => {
      if (isPlaying) {
        axiosInstance.post("/auth/update-watch-progress/", {
          increment_time: 5 * 60,
          episode_id,
          new_position: Number(currentPlayedSecond?.toFixed()),
        });
      }
    }, [isPlaying, currentPlayedSecond, episode_id]);

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
          }, 5 * ONE_MINUTE);
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
    }, [isActiveTab, updateTracker]);

    useEffect(() => {
      document.addEventListener(
        "visibilitychange",
        handleVisibilityChange,
        false
      );
      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
      };
    }, []);

    return <></>;
  }
);
export default ActiveUserMovieTracker;
