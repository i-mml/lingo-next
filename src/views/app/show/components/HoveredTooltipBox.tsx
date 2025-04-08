"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import BlockIcon from "@mui/icons-material/Block";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { IconButton } from "@mui/material";
import { useTextToAudio } from "@/hooks/use-text-to-audio";
import { GetMovieData, PostCmsWordIssues } from "@/api/services/cms";
import WaveLoading from "@/components/shared/WaveLoading";
import Voice from "@/assets/voice.svg";

const HoveredTooltipBox = ({
  word,
  currentSubtitle,
  handlePostFlashcards,
  flashCardIsLoading,
  toggleWordInfoModal,
  setSelectedWord,
}: any) => {
  const { handleTextToSpeech, textToSpeachMutation } = useTextToAudio();
  const params = useParams();
  const { videoId, episodeId } = params;

  const { data } = useQuery({
    queryKey: ["get-movie-data", videoId],
    queryFn: () => GetMovieData(String(videoId)),
    enabled: !!videoId,
  });

  const episodeData = useMemo(
    () =>
      Array.isArray(data?.episodes)
        ? data?.episodes?.find(
            (episode: { id: number }) => episode?.id === Number(episodeId)
          )
        : data?.episode,
    [data, episodeId]
  );

  const postWordIssuesMutation = useMutation({
    mutationFn: (body: {
      description: string;
      is_review: boolean;
      sentencedetail: any;
      word: number;
    }) => PostCmsWordIssues(body),
  });

  const currentParams = useMemo(
    () => ({
      text: currentSubtitle?.sentence?.subtitle,
      grammatical_json: JSON.stringify(currentSubtitle),
      translation: currentSubtitle?.sentence?.translate,
      time_start: currentSubtitle?.start_time,
      time_end: currentSubtitle?.end_time,
      movie: videoId,
      word: word?.text,
      word_rel: word?.id,
      word_rel_id: word?.id,
      base_movie_file: episodeData?.file,
      word_translation: word?.translate,
      episode: Number(episodeId),
    }),
    [currentSubtitle, videoId, word, episodeData, episodeId]
  );

  const reportWordParams = useMemo(
    () => ({
      description: "",
      is_review: false,
      sentencedetail: null,
      word: word?.id,
    }),
    [word?.id]
  );

  const handleReportWord = async () => {
    await postWordIssuesMutation.mutateAsync(reportWordParams);
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
      <div className="p-2 bg-white rounded overflow-hidden inline-flex justify-center items-center gap-2 min-w-[150px]">
        <IconButton
          disabled={textToSpeachMutation.isLoading}
          onClick={() => handleTextToSpeech({ text: currentParams.word })}
        >
          <div className="w-6 h-6 relative cursor-pointer flex items-center">
            {textToSpeachMutation.isLoading ? (
              <WaveLoading isBlack />
            ) : (
              <Voice className="text-black" />
            )}
          </div>
        </IconButton>

        <IconButton
          disabled={flashCardIsLoading}
          onClick={() => handlePostFlashcards(currentParams)}
        >
          <div className="w-6 h-6 relative cursor-pointer flex items-center">
            {flashCardIsLoading ? (
              <WaveLoading isBlack />
            ) : (
              <LibraryAddIcon className="text-black" />
            )}
          </div>
        </IconButton>

        <div className="h-8 border-l border-slate-300" />

        <div className="flex flex-col items-center gap-2">
          <div className="text-gray-500 text-sm font-normal leading-5 break-words">
            {word?.translate}
          </div>
        </div>

        <div className="h-8 border-l border-slate-300" />

        <IconButton disabled={flashCardIsLoading} onClick={handleReportWord}>
          <div className="w-6 h-6 relative cursor-pointer flex items-center">
            {flashCardIsLoading ? (
              <WaveLoading isBlack />
            ) : (
              <BlockIcon className="text-black" />
            )}
          </div>
        </IconButton>

        <IconButton
          disabled={flashCardIsLoading}
          onClick={() => {
            setSelectedWord(word);
            toggleWordInfoModal();
          }}
        >
          <div className="w-6 h-6 relative cursor-pointer flex items-center">
            {flashCardIsLoading ? (
              <WaveLoading isBlack />
            ) : (
              <HelpOutlineIcon className="text-black" />
            )}
          </div>
        </IconButton>
      </div>
    </div>
  );
};
export default HoveredTooltipBox;
