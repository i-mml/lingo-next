"use client";

import { GetMovieData, GetMovieDataInApp } from "@/api/services/cms";
import SubscriptionModal from "@/components/modals/SubscriptionModal";
import WaveLoading from "@/components/shared/WaveLoading";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import Player from "@/views/app/show/components/Player";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useThemeCreator from "@/hooks/use-theme";

const WatchVideoUnit = ({
  data,
  handleNext,
}: {
  data: any;
  handleNext: () => void;
}) => {
  const { videoId, episodeId } = useParams();
  const { theme } = useThemeCreator();

  // Create a custom theme for the show page that extends the global theme
  const showPageTheme = useMemo(
    () =>
      createTheme({
        ...theme,
        direction: "ltr", // Force LTR for MUI components in player
        components: {
          MuiSlider: {
            styleOverrides: {
              root: {
                direction: "ltr",
              },
              track: {
                direction: "ltr",
                left: 0,
                right: "auto",
              },
              thumb: {
                direction: "ltr",
                right: "auto",
                width: 12,
                height: 12,
              },
              rail: {
                direction: "ltr",
              },
            },
          },
        },
      }),
    [theme]
  );

  const episodeData = useMemo(() => {
    return Array.isArray(data?.episodes)
      ? data?.episodes?.find(
          // @ts-ignore
          (episode: { id: number }) => episode?.id === +episodeId
        )
      : data?.episode;
  }, [data, episodeId]);

  if (!episodeData)
    return (
      <div className="w-full h-[100vh] flex items-center justify-center bg-main">
        <WaveLoading />
      </div>
    );

  return (
    <ThemeProvider theme={showPageTheme}>
      <div dir="rtl">
        <Player
          title={data?.title}
          difficulty={data?.difficulty}
          subtitle={episodeData}
          movie={episodeData}
          image={data?.banner_image}
          data={data}
          inUnit
          handleNext={handleNext}
        />
      </div>
    </ThemeProvider>
  );
};

export default WatchVideoUnit;
