import { GetCmsByContentType } from "@/api/services/cms";
import AudioBookView from "@/views/audio-book";
import { cookies } from "next/headers";
import React from "react";

const AudioBookPage = async () => {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const audioBooks = await GetCmsByContentType(3, accessToken);

  return <AudioBookView audioBooks={audioBooks} contentType={3} />;
};

export default AudioBookPage;
