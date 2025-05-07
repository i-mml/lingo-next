"use client";

import { GetMovieData, GetMovieDataInApp } from "@/api/services/cms";
import SubscriptionModal from "@/components/modals/SubscriptionModal";
import WaveLoading from "@/components/shared/WaveLoading";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import Player from "./components/Player";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useThemeCreator from "@/hooks/use-theme";

const PlayerView = () => {
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

  const [openSubsModal, setOpenSubsModal] = useState(false);
  const router = useRouter();

  const toggleSubscriptionModal = () => {
    setOpenSubsModal(true);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["get-movie-data", videoId],
    queryFn: () => GetMovieDataInApp(videoId as string),
    enabled: !!videoId,
  });
  const episodeData = useMemo(() => {
    if (!isLoading) {
      if (!data?.is_locked) {
        return Array.isArray(data?.episodes)
          ? data?.episodes?.find(
              // @ts-ignore
              (episode: { id: number }) => episode?.id === +episodeId
            )
          : data?.episode;
      } else {
        toggleSubscriptionModal();
        return;
      }
    }
  }, [data, episodeId]);

  if (isLoading || !episodeData)
    return (
      <div className="w-full h-[100vh] flex items-center justify-center bg-main">
        <WaveLoading />
        {openSubsModal && (
          <SubscriptionModal
            secondText="بازگشت"
            secondClick={() => router.back()}
            open={openSubsModal}
            toggleModal={() => {
              toggleSubscriptionModal();
              router.back();
            }}
          />
        )}
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
        />

        {openSubsModal && (
          <SubscriptionModal
            open={openSubsModal}
            toggleModal={toggleSubscriptionModal}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default PlayerView;
