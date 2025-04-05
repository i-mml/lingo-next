import { GetMovieDetailData } from "@/api/services/cms";
import VideoInformationView from "@/views/video-info";
import { cookies } from "next/headers";
import React from "react";

const VideoInformationPage = async ({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) => {
  const { videoId } = await params;

  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const videoInfo = await GetMovieDetailData(
    videoId?.split("-")?.[0],
    accessToken
  );

  return <VideoInformationView params={{ videoId, data: videoInfo }} />;
};

export default VideoInformationPage;
