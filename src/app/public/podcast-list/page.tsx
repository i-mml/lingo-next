import { GetCmsByContentType } from "@/api/services/cms";
import AudioBookView from "@/views/audio-book";
import { cookies } from "next/headers";
import React from "react";

const PodcastListPage = async () => {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const podcastList = await GetCmsByContentType(4, accessToken);

  return <AudioBookView audioBooks={podcastList} contentType={4} />;
};

export default PodcastListPage;
