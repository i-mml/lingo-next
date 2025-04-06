"use client";

import { GetMovieData, GetMovieDataInApp } from "@/api/services/cms";
import SubscriptionModal from "@/components/modals/SubscriptionModal";
import WaveLoading from "@/components/shared/WaveLoading";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import Player from "./components/Player";

const PlayerView = () => {
  const { videoId, episodeId } = useParams();

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
        console.log("here");
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
    <>
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
    </>
  );
};

export default PlayerView;
