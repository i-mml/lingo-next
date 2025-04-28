"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Lottie from "lottie-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { shallow } from "zustand/shallow";
import { isIOS, isMobile, useMobileOrientation } from "react-device-detect";
import useThemeCreator from "@/hooks/use-theme";
import useStore from "../store/useStore";
import {
  fetchCaptions,
  GetGrammerText,
  GetMovieFlashCard,
  getSentenceGrammar,
} from "@/api/services/cms";
import { useVideoPlayerStore } from "../store/playerStore";
import ArrowLeaner from "@/assets/lotties/arrow-leaner.json";
import ActiveUserMovieTracker from "./ActiveUserMovieTracker";
import PlayerContainer from "./PlayerContainer";
import { Grid, Grid2 } from "@mui/material";
import { FlashCardBox } from "./FlashcardBox";
// import PlayerOnboardingTour from "./PlayerTour";

const Player = ({
  movie,
  image,
  title,
  subtitle,
  difficulty,
  data: movieData,
}: any) => {
  const { theme }: any = useThemeCreator();

  const [currentGrammerText, setCurrentGrammerText] = useState("");
  const [playerState, setPlayerState] = useState(true);
  const [landscapeWarning, setLandscapeWarning] = useState(true);
  const [height, setHeight] = useState(220);

  const {
    currentSubtitle,
    setCurrentSubtitle,
    setCurrentCaptionIndex,
    playedSeconds,
    setPlayedSeconds,
  } = useStore(
    (state: any) => ({
      currentSubtitle: state.currentSubtitle,
      setCurrentSubtitle: state.setCurrentSubtitle,
      setCurrentCaptionIndex: state.setCurrentCaptionIndex,
      playedSeconds: state.playedSeconds,
      setPlayedSeconds: state.setPlayedSeconds,
    }),
    shallow
  );
  const playerRef = useRef<any>(null);

  const { isLandscape } = useMobileOrientation();

  const { file } = movie;

  const subTitleCaptions = `/cms/subtitle/${subtitle?.subtitle_id}`;

  const { data: captionsData } = useQuery({
    queryKey: ["fetchCaptions", subtitle?.subtitle_id],
    queryFn: () => fetchCaptions(subTitleCaptions),
    enabled: !!subtitle?.subtitle_id,
  });

  const { videoId, episodeId } = useParams();
  const queryKey = useMemo(
    () => ["get-movie-flash-card-list", videoId, episodeId],
    [videoId, episodeId]
  );
  const queryFn = useMemo(
    () => () => GetMovieFlashCard(`?movie=${videoId}&episode=${episodeId}`),
    [videoId, episodeId]
  );

  const { data, refetch } = useQuery({
    queryKey,
    queryFn,
    enabled: !!videoId || !!episodeId,
    staleTime: 0,
  });

  const {
    fetchSubtitleGrammarStart,
    fetchSubtitleGrammarSuccess,
    fetchSubtitleGrammarFailure,
    playing,
  } = useVideoPlayerStore(
    (state) => ({
      fetchSubtitleGrammarStart: state.fetchSubtitleGrammarStart,
      fetchSubtitleGrammarSuccess: state.fetchSubtitleGrammarSuccess,
      fetchSubtitleGrammarFailure: state.fetchSubtitleGrammarFailure,
      playing: state.playing,
    }),
    shallow
  );
  const postFlashcardsMutation = useMutation({
    mutationFn: GetGrammerText,
    onSuccess: () => {},
  });

  const fetchSubtitleGrammar = async (subtitle: string) => {
    fetchSubtitleGrammarStart();
    try {
      const grammarData = await getSentenceGrammar(subtitle);
      fetchSubtitleGrammarSuccess(grammarData as any);
      return grammarData;
    } catch (error: any) {
      fetchSubtitleGrammarFailure(error.message);
      return;
    }
  };
  const handleFetchGrammarDetect = useMutation({
    mutationKey: ["fetch-grammar-detect", currentSubtitle?.sentence?.subtitle],
    mutationFn: () => fetchSubtitleGrammar(currentSubtitle?.sentence?.subtitle),
  });

  const handlePause = () => {
    setPlayerState(false);
  };

  const handlePlay = () => {
    setPlayerState(true);
  };

  const lastUpdateRef = useRef(0);
  const handleProgress = useCallback(
    (progress: any) => {
      const currentTime = progress.playedSeconds;

      if (currentTime - lastUpdateRef.current >= 60) {
        setPlayedSeconds(currentTime);
        lastUpdateRef.current = currentTime;
      }

      const arr = captionsData?.data?.subtitle_lines?.subtitle ?? [];
      let foundSubtitle = null;

      if (arr.length) {
        let i = 0,
          j = arr.length - 1;

        while (i <= j) {
          const mid = Math.floor((i + j) / 2);
          const subtitle = arr[mid];

          if (
            currentTime >= subtitle.start_time &&
            currentTime <= subtitle.end_time
          ) {
            foundSubtitle = subtitle;
            break;
          }
          if (currentTime < subtitle.start_time) {
            j = mid - 1;
          } else {
            i = mid + 1;
          }
        }

        // Update state based on whether we found a subtitle
        if (foundSubtitle) {
          setCurrentSubtitle(foundSubtitle);
          setCurrentCaptionIndex(arr.indexOf(foundSubtitle));
        } else {
          setCurrentSubtitle(null);
          setCurrentCaptionIndex(-1);
        }
      }
    },
    [
      captionsData?.data?.subtitle_lines?.subtitle,
      setCurrentCaptionIndex,
      setCurrentSubtitle,
    ]
  );
  const handleAction = async () => {
    setCurrentGrammerText(currentSubtitle);
    await handleFetchGrammarDetect.mutateAsync();

    try {
      await postFlashcardsMutation.mutateAsync(
        currentSubtitle?.sentence?.subtitle
      );
    } catch {}
  };

  const memoizedData = useMemo(() => data, [data]);
  const memoizedCurrentGrammerText = useMemo(
    () => currentGrammerText,
    [currentGrammerText]
  );
  const goTocaptionsTime = useCallback(
    (time: number, end_time = null, findBy = "index") => {
      const arr = captionsData?.data?.subtitle_lines?.subtitle ?? [];

      if (playerRef?.current) {
        if (findBy === "index") {
          playerRef?.current?.seekTo(arr?.[time]?.start_time);
        } else {
          playerRef?.current?.seekTo(time);
        }
      }

      if (end_time !== null) {
        const interval = setInterval(() => {
          if (playerRef.current) {
            const currentTime = playerRef.current.getCurrentTime();

            // Check if the video needs to be paused
            if (currentTime >= end_time) {
              handlePause();
              clearInterval(interval);
            }
          }
        }, 100);
      }
    },
    [playerRef, captionsData]
  );

  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = useCallback((_: any, newValue: number) => {
    setActiveTab(newValue);
  }, []);

  useEffect(() => {
    if (isIOS && isLandscape) {
      setLandscapeWarning(true);
    } else {
      setLandscapeWarning(false);
    }
  }, [isLandscape, isIOS]);

  useEffect(() => {
    setHeight(window?.innerHeight);
  }, [window?.innerHeight]);

  return (
    <div className="app relative" id="first-step" dir="rtl">
      {!landscapeWarning ? (
        <Grid
          container
          columns={16}
          spacing={1}
          style={{
            justifyContent: "space-between",
            backgroundColor: theme?.palette?.background?.main,
          }}
          sx={{
            padding: { xs: "unset", md: "0 16px" },
            // eslint-disable-next-line no-restricted-globals
            maxHeight: { xs: window.innerHeight, md: "100vh" },
            // eslint-disable-next-line no-restricted-globals
            height: { xs: window.innerHeight, md: "100vh" },
            overflow: "hidden",
          }}
        >
          <Grid
            item
            xs={16}
            md={6}
            lg={5}
            xl={4}
            order={isMobile ? 2 : 1}
            sx={{
              // eslint-disable-next-line no-restricted-globals
              height: {
                xs: `${
                  window.innerHeight - (window.innerHeight * 0.273 + 192)
                }px`,
                md: "auto",
              },
            }}
          >
            <FlashCardBox
              activeTab={activeTab}
              handleTabChange={handleTabChange}
              data={memoizedData}
              currentGrammerText={memoizedCurrentGrammerText}
              goTocaptionsTime={goTocaptionsTime}
              refetchFlashCards={refetch}
              movie={movie}
              movieFullData={movieData}
              handleAction={handleAction}
              currentSubtitle={currentSubtitle}
              subtitle={subtitle}
            />
          </Grid>

          <Grid
            sx={{
              // eslint-disable-next-line no-restricted-globals
              height: { xs: window.innerHeight * 0.273 + 102, md: "auto" },
              margin: { xs: "0", md: "auto 0" },
            }}
            item
            xs={16}
            lg={11}
            md={10}
            xl={12}
            style={{ paddingTop: 0 }}
            order={isMobile ? 1 : 2}
          >
            <PlayerContainer
              playerState={playerState}
              title={title}
              subtitle={captionsData?.data}
              dificulty={difficulty}
              handleAction={handleAction}
              playerRef={playerRef}
              url={file}
              light={image}
              currentSubtitle={currentSubtitle}
              refetchFlashCardsList={refetch}
              // height="calc(80vh - 200px)"
              height={
                !isMobile ? `calc(${window.innerHeight - 200}px)` : "100%"
              }
              withControlled={true}
              sx=""
              handleProgressfunc={(progress: any) => handleProgress(progress)}
              handlePause={handlePause}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
              movie={movieData}
              episodeData={movie}
            />
          </Grid>
        </Grid>
      ) : (
        <div className="absolute inset-0 h-[90vh] text-main text-lg lg:text-2xl bg-layout text-center grid place-items-center">
          <div className="flex flex-col items-center gap-4">
            <Lottie animationData={ArrowLeaner} className="w-20 h-20" />
            <div>
              برای تجربه کاربری بهتر در آیفون ، از حالت افقی استفاده کنید.
            </div>
          </div>
        </div>
      )}

      <ActiveUserMovieTracker
        episode_id={Number(episodeId)}
        currentPlayedSecond={playedSeconds}
        isPlaying={playing}
      />
      {/* {isMobile ? <PlayerOnboardingTour /> : <></>} */}
    </div>
  );
};

export default Player;
