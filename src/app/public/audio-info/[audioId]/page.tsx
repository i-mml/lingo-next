import { GetMovieData } from "@/api/services/cms";
import AudioInfoView from "@/views/audio-info";
import { cookies } from "next/headers";
import React from "react";

const AudioInfoPage = async ({
  params,
}: {
  params: Promise<{ audioId: string }>;
}) => {
  const { audioId } = await params;

  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const audioInfo = await GetMovieData(audioId?.split("-")?.[0], accessToken);

  return <AudioInfoView audioId={audioId} data={audioInfo} />;
};

export default AudioInfoPage;
