"use client";

import { GetMovieDataInApp, PostFlashcards } from "@/api/services/cms";
import { Box } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import {
  isDesktop,
  isMobile,
  isTablet,
  useMobileOrientation,
} from "react-device-detect";
import { toast } from "react-toastify";
import { useVideoPlayerStore } from "../store/playerStore";
import { shallow } from "zustand/shallow";
import { useParams } from "next/navigation";
import screenfull from "screenfull";
import WordDetailModal from "@/components/modals/WordDetailModal";

const Subtitle = React.memo(
  ({ currentSubtitle, handlePause, handlePlay, refetchFlashCards }: any) => {
    const {
      translate_fontSize,
      translateSubtitle,
      subtitleTranslateLanguages,
      learningSubtitle,
    } = useVideoPlayerStore(
      (state: any) => ({
        translate_fontSize: state.translate_fontSize,
        translateSubtitle: state.translateSubtitle,
        subtitleTranslateLanguages: state.subtitleTranslateLanguages,
        learningSubtitle: state.learningSubtitle,
      }),
      shallow
    );
    const anchorOrigin = { horizontal: "right", vertical: "top" };
    const successOption = {
      variant: "success",
      anchorOrigin,
    };
    const errorOption = {
      variant: "error",
      anchorOrigin,
    };

    const words = currentSubtitle?.sentence?.words;

    const { videoId, episodeId } = useParams();

    const { data } = useQuery({
      queryKey: ["get-movie-data", videoId],
      queryFn: () => GetMovieDataInApp(videoId as string),
      enabled: !!videoId,
    });

    const episodeData = useMemo(
      () =>
        Array.isArray(data?.episodes)
          ? data?.episodes?.find(
              // @ts-ignore
              (episode: { id: number }) => episode?.id === +episodeId
            )
          : data?.episode,
      [data, episodeId]
    );

    const postFlashcardsMutation = useMutation({
      mutationFn: PostFlashcards,
      onSuccess: () => {
        toast.success("فلش‌کارت با موفقیت ایجاد شد!");
      },
      onError: () => {
        toast.error("خطا در ایجاد فلش‌کارت");
      },
    });

    const handlePostFlashcards = async (params: any) => {
      await postFlashcardsMutation.mutateAsync(params);
    };

    const [selectedWord, setSelectedWord] = useState();
    const [wordDetailModal, setWordDetailModal] = useState(false);

    const toggleWordInfoModal = () => {
      handlePause();
      if (screenfull?.isFullscreen) {
        screenfull.toggle();
      }
      setWordDetailModal((prev) => !prev);
    };

    const params = useMemo(() => {
      return {
        text: currentSubtitle?.sentence?.subtitle,
        grammatical_json: JSON.stringify(currentSubtitle),
        translation: currentSubtitle?.sentence?.translate,
        time_start: currentSubtitle?.start_time,
        time_end: currentSubtitle?.end_time,
        movie: videoId,

        base_movie_file: episodeData?.file,
        episode: !!episodeId ? +episodeId : null,
      };
    }, [currentSubtitle, videoId, episodeData?.file, episodeId]);

    const { isLandscape } = useMobileOrientation();

    return (
      <div
        onMouseLeave={wordDetailModal ? () => {} : () => handlePlay()}
        className={`text-[#20114a] absolute left-0 right-0 text-center w-full lg:w-fit mx-auto bg-[#00000060] min-h-[60px] lg:min-h-[0] rounded-md
         ${!screenfull?.isFullscreen && isDesktop ? "bottom-[110px]" : ""} 
         ${screenfull?.isFullscreen && isDesktop ? "bottom-[100px] " : ""} 
         ${
           screenfull?.isFullscreen && isMobile && !isLandscape
             ? "bottom-[20vh]"
             : ""
         }
         ${
           screenfull?.isFullscreen && isMobile && isLandscape
             ? "bottom-[50px]"
             : ""
         } 
         ${
           !screenfull?.isFullscreen && isMobile
             ? window.innerHeight < 700
               ? "top-[calc(100%+55px)]"
               : "top-[calc(100%+45px)]"
             : ""
         }
         ${screenfull?.isFullscreen && isTablet ? "top-[calc(100%+20px)]" : ""} 
          ${
            screenfull?.isFullscreen
              ? "bottom:  16vh"
              : isMobile
              ? "bottom:  -11vh"
              : "bottom: 110px"
          }
         `}
        //   50px is height of player control
      >
        {learningSubtitle && (
          <Box
            key="subtitleLearning1234"
            sx={{
              width: "fit-content",
              minWidth: {
                xs: screenfull?.isFullscreen ? "50%" : "70%",
                md: "unset",
              },
              margin: "auto",
              // backgroundColor: "#ffffff80",
              color: "white",
              borderRadius: "4px 4px 0 0",
              padding: { xs: "2px 4px", md: "4px 8px" },
              fontSize: "16px",
              fontWeight: 500,
              position: "relative",
              zIndex: 999,
              display: "flex",
              flexWrap: "wrap",
              gap: "4px",
              justifyContent: "center",
              "&: hover": {
                "&: before": {
                  bottom: "100%",
                  content: '" "',
                  display: "block",
                  height: "90px",
                  position: "absolute",
                  width: "100%",
                  zIndex: 1,
                },
              },
            }}
          >
            {words?.map((word, index) => (
              <StyledTooltip
                sx={{
                  zIndex: 9999,
                }}
                key={`${word.meaning} ${index}`}
                arrow
                handlePause={handlePause}
                handlePlay={handlePlay}
                index={index}
                placement="top"
                PopperProps={{
                  disablePortal: true,
                }}
                refetchFlashCards={refetchFlashCards}
                word={word}
                currentSubtitle={currentSubtitle}
                toggleWordInfoModal={toggleWordInfoModal}
                setSelectedWord={setSelectedWord}
              />
            ))}
          </Box>
        )}
        {translateSubtitle && (
          <>
            {subtitleTranslateLanguages?.map((language, index) => (
              <Box
                key={
                  currentSubtitle?.translate?.best_translate +
                  currentSubtitle?.start_time
                }
                sx={{
                  width: "fit-content",
                  minWidth: {
                    xs: screenfull?.isFullscreen ? "50%" : "70%",
                    md: "unset",
                  },
                  color: "#FCBE11",
                  // backgroundColor: "#00000080",
                  padding: { xs: "2px 4px", md: "4px 8px" },
                  borderRadius: "0 0 4px 4px",
                  margin: {
                    xs: "0 auto",
                    md: index === 0 ? "8px auto 0" : "5px auto 0",
                  },
                  fontSize: `${translate_fontSize}px`,
                  fontWeight: 500,
                  direction: language === "translate" ? "rtl" : "ltr",
                }}
              >
                {!!language && !!currentSubtitle?.sentence?.[language]
                  ? currentSubtitle?.sentence?.[language]
                  : null}
              </Box>
            ))}
          </>
        )}
        {wordDetailModal && (
          <WordDetailModal
            word={selectedWord as any}
            open={wordDetailModal}
            toggleModal={toggleWordInfoModal}
            hasFlashcardButton
            flashCardIsLoading={postFlashcardsMutation.isPending}
            addToFlashCardHandler={(prm) =>
              handlePostFlashcards({ ...params, ...prm })
            }
          />
        )}
      </div>
    );
  }
);

export default Subtitle;
