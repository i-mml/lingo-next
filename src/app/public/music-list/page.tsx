import { GetCmsByContentType } from "@/api/services/cms";
import AudioBookView from "@/views/audio-book";
import { cookies } from "next/headers";
import React from "react";

const MusicListPage = async () => {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const audioBooks = await GetCmsByContentType(2, accessToken);

  return <AudioBookView audioBooks={audioBooks} isMusic />;
};

export default MusicListPage;
