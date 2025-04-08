"use client";

import * as React from "react";
import {
  isIOS,
  isMobile,
  isTablet,
  useMobileOrientation,
} from "react-device-detect";

import ReactPlayer, { ReactPlayerProps } from "react-player";
import { useVideoPlayerStore } from "../store/playerStore";
import { shallow } from "zustand/shallow";
import useStore from "../store/useStore";
import useThemeCreator from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";
import { useTextToAudio } from "@/hooks/use-text-to-audio";
import { getSentenceGrammar } from "@/api/services/cms";
import { useMutation } from "@tanstack/react-query";
import screenfull from "screenfull";
import WaveLoading from "@/components/shared/WaveLoading";
import { StyledPlayer } from "./playerStyels";

const EmojiObjectsIcon = React.lazy(
  () => import("@mui/icons-material/EmojiObjects")
);
const FormatQuoteIcon = React.lazy(
  () => import("@mui/icons-material/FormatQuote")
);
const HeadsetIcon = React.lazy(() => import("@mui/icons-material/Headset"));
const KeyboardVoiceIcon = React.lazy(
  () => import("@mui/icons-material/KeyboardVoice")
);
const PlayArrowRounded = React.lazy(
  () => import("@mui/icons-material/PlayArrowRounded")
);
const ViewCarouselIcon = React.lazy(
  () => import("@mui/icons-material/ViewCarousel")
);
const WysiwygIcon = React.lazy(() => import("@mui/icons-material/Wysiwyg"));

// Lazy components
const Subtitle = React.lazy(() => import("./Subtitle"));
const TooltipBox = React.lazy(() => import("./HoveredTooltipBox"));
const SpeachCompareModal = React.lazy(
  () => import("@/components/modals/SpeachCompareModal")
);
const PlayerSettingsModal = React.lazy(() => import("./PlayerSettingsModal"));
const WannaQuizModal = React.lazy(() => import("./WannaQuizModal"));
const PlayerControls = React.lazy(() => import("./PlayerControls"));

const PlayerContainer: React.FC<ReactPlayerProps> = (props) => {
  const hlsConfig = {
    maxBufferLength: 1,
    maxMaxBufferLength: 60,
  };

  const {
    url,
    playerRef,
    // light,
    // title,
    // dificulty,
    subtitle,
    handleProgressfunc,
    withControlled,
    handleAction,
    setActiveTab,
    activeTab,
    refetchFlashCardsList,
    movie,
    episodeData,
  } = props;

  const {
    play,
    setLight,
    pause,
    seek,
    setDuration,
    fetchSubtitleGrammarStart,
    fetchSubtitleGrammarSuccess,
    fetchSubtitleGrammarFailure,
    setSubtitleTranslateLanguages,
    playing,
    controls,
    volume,
    playbackRate,
  } = useVideoPlayerStore(
    (state) => ({
      play: state.play,
      setLight: state.setLight,
      pause: state.pause,
      seek: state.seek,
      setDuration: state.setDuration,
      fetchSubtitleGrammarStart: state.fetchSubtitleGrammarStart,
      fetchSubtitleGrammarSuccess: state.fetchSubtitleGrammarSuccess,
      fetchSubtitleGrammarFailure: state.fetchSubtitleGrammarFailure,
      setSubtitleTranslateLanguages: state.setSubtitleTranslateLanguages,
      playing: state.playing,
      controls: state.controls,
      volume: state.volume,
      playbackRate: state.playbackRate,
    }),
    shallow
  );
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const { currentSubtitle } = useStore(
    (state: any) => ({ currentSubtitle: state.currentSubtitle }),
    shallow
  );
  const [recordModal, setRecordModal] = React.useState(false);
  const [playerModals, setPlayerModals] = React.useState<{
    type: "" | "BEFORE_LEAVE" | "WANNA_QUIZ";
    state: boolean;
  }>({
    type: "",
    state: false,
  });

  const [settingModal, setSettingModal] = React.useState(false);
  const [started, setStarted] = React.useState(false);

  const { theme }: any = useThemeCreator();
  const { whoAmI } = useAuth();
  const { isLandscape } = useMobileOrientation();

  const handlePreview = () => {
    play();
    setTimeout(() => {
      setLight(false);
    }, 100);
  };

  const handlePause = React.useCallback(() => {
    pause();
  }, [pause]);

  const toggleRecordModal = React.useCallback(() => {
    handlePause();
    setTimeout(() => {
      setRecordModal((prev) => !prev);
    }, 300);
  }, [handlePause]);

  const togglePlayerSettingModal = React.useCallback(() => {
    handlePause();
    setTimeout(() => {
      setSettingModal((prev) => !prev);
    }, 300);
  }, [handlePause]);

  const handlePlay = React.useCallback(() => {
    play();
    setTimeout(() => {
      setLight(false);
    }, 200);
  }, [play, setLight]);

  const handleEnded = () => {
    setPlayerModals({ state: true, type: "WANNA_QUIZ" });
  };

  const handleProgress = (progress: { playedSeconds: number }) => {
    seek(progress.playedSeconds);
    handleProgressfunc(progress);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const { handleTextToSpeech, textToSpeachMutation } = useTextToAudio();

  const fetchSubtitleGrammar = async (subtitle: any) => {
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

  const handleFetchGrammar = async () => {
    if (currentSubtitle?.sentence?.subtitle) {
      await handleFetchGrammarDetect.mutateAsync(
        currentSubtitle?.sentence?.subtitle
      );
    }
  };

  const availableTranslates = React.useMemo(
    () =>
      !!subtitle
        ? Object.entries(subtitle?.subtitle_lines?.subtitle?.[10]?.sentence)
            ?.filter(
              (item) => item?.[0] !== "subtitle" && item?.[0] !== "words"
            )
            .map((node) => node?.[0])
        : [],
    [subtitle]
  );

  const renderSubtitles = React.useMemo(() => {
    return (
      <Subtitle
        //@ts-ignore
        currentSubtitle={currentSubtitle}
        handlePause={handlePause}
        handlePlay={handlePlay}
        refetchFlashCards={() => {
          refetchFlashCardsList();
        }}
      />
    );
  }, [currentSubtitle, handlePause, handlePlay, refetchFlashCardsList]);

  React.useEffect(() => {
    if (isMobile && isLandscape && !screenfull?.isFullscreen) {
      if (!isIOS) {
        screenfull.toggle(wrapperRef.current as Element);
      }
    }
  }, [isLandscape]);

  React.useEffect(() => {
    setSubtitleTranslateLanguages(availableTranslates);
  }, [availableTranslates, setSubtitleTranslateLanguages]);

  return (
    <React.Suspense fallback={<WaveLoading />}>
      <StyledPlayer state={{ playing }} ref={wrapperRef}>
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          config={{
            file: {
              hlsOptions: hlsConfig,
              attributes: {
                crossOrigin: "true",
              },
            },
          }}
          controls={controls}
          loop={false}
          muted={false}
          playing={playing}
          playbackRate={playbackRate}
          volume={volume}
          playsinline
          onStart={() => setStarted(true)}
          onPlay={handlePlay}
          onEnded={handleEnded}
          onPause={handlePause}
          onDuration={handleDuration}
          onProgress={handleProgress}
          light={false}
          playIcon={
            <PlayArrowRounded
              sx={{
                color: "white",
                fontSize: "6rem",
              }}
            />
          }
          onClickPreview={handlePreview}
          style={{ objectFit: "fill" }}
          progressInterval={300}
        />

        {/* <PlayerOverlay title={title} dificulty={dificulty} subtitle={subtitle} state={state} /> */}
        {!!renderSubtitles && (
          <div style={{ zIndex: 99999 }}>{renderSubtitles}</div>
        )}

        <div style={{ zIndex: 9999999 }}>
          <PlayerControls
            playerRef={playerRef}
            wrapperRef={wrapperRef}
            togglePlayerSettingModal={togglePlayerSettingModal}
            settingModal={settingModal}
          />
        </div>
      </StyledPlayer>
      {!!withControlled && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            rowGap: "5px",
            columnGap: "5px",
            width: "100%",
            position: !(isTablet || isMobile) ? "initial" : "absolute",
            padding: "6px 0",
            backgroundColor: theme.palette?.background?.main,
          }}
          className="bottom-0 lg:top-[58vh] lg:bottom-[none] lg:mt-5 w-full"
        >
          {/* <TooltipBox
            item={<ClosedCaptionIcon style={{ color: !started ? "gray" : "white", fontSize: "1.75rem" }} />}
            disabled={!started}
            handleAction={() => {
              handlePause();
              toggleSubtitleModal();
            }}
            tooltipText="انتخاب زیرنویس"
          /> */}
          {!(isTablet || isMobile) ? (
            <>
              <TooltipBox
                item={
                  <KeyboardVoiceIcon
                    sx={{
                      color:
                        !started || currentSubtitle === ""
                          ? "gray"
                          : isMobile
                          ? theme.palette.text.main
                          : theme.palette.text.primary,
                      fontSize: "24px",
                    }}
                  />
                }
                handleAction={() => {
                  handlePause();
                  toggleRecordModal();
                }}
                disabled={!started || currentSubtitle === ""}
                tooltipText="بازگویی جمله"
              />
              <TooltipBox
                item={
                  textToSpeachMutation?.isLoading ? (
                    <WaveLoading />
                  ) : (
                    <HeadsetIcon
                      sx={{
                        color:
                          !started || currentSubtitle === ""
                            ? "gray"
                            : isMobile
                            ? theme.palette.text.main
                            : theme.palette.text.primary,
                        fontSize: "24px",
                      }}
                    />
                  )
                }
                disabled={
                  !started ||
                  currentSubtitle === "" ||
                  textToSpeachMutation?.isLoading
                }
                handleAction={() => {
                  handlePause();
                  handleTextToSpeech({
                    text: currentSubtitle?.sentence?.subtitle,
                    language:
                      whoAmI?.userpreference?.preferred_language === 2
                        ? "en-US"
                        : "de-DE",
                  });
                }}
                tooltipText="تکرار جمله"
              />
              {movie?.language === 2 && (
                <TooltipBox
                  tooltipText="گرامر جمله"
                  handleAction={() => {
                    handleAction && handleAction?.(currentSubtitle);
                    handlePause();
                    handleFetchGrammar();
                    setActiveTab(3);
                  }}
                  disabled={!started || currentSubtitle === ""}
                  item={
                    <EmojiObjectsIcon
                      sx={{
                        color:
                          !started || currentSubtitle === ""
                            ? "gray"
                            : isMobile && activeTab === 2
                            ? theme.palette.text.main
                            : theme.palette.text.primary,
                        fontSize: "24px",
                      }}
                    />
                  }
                />
              )}
            </>
          ) : (
            <>
              <button
                disabled={!started || currentSubtitle === ""}
                onClick={() => {
                  handlePause();
                  toggleRecordModal();
                }}
                className="text-white bg-layout p-1 rounded-lg"
              >
                <KeyboardVoiceIcon
                  sx={{
                    color:
                      !started || currentSubtitle === ""
                        ? "gray"
                        : isMobile
                        ? theme.palette.text.main
                        : theme.palette.text.primary,
                    fontSize: "24px",
                  }}
                />
                <p className="text-[10px] text-main">بازگویی جمله</p>
              </button>
              <button
                disabled={
                  !started ||
                  currentSubtitle === "" ||
                  textToSpeachMutation?.isLoading
                }
                onClick={() => {
                  handlePause();
                  handleTextToSpeech({
                    text: currentSubtitle?.sentence?.subtitle,
                    language:
                      whoAmI?.userpreference?.preferred_language === 2
                        ? "en-US"
                        : "de-DE",
                  });
                }}
                className="text-white bg-layout p-1 rounded-lg"
              >
                {textToSpeachMutation?.isLoading ? (
                  <WaveLoading />
                ) : (
                  <HeadsetIcon
                    sx={{
                      color:
                        !started || currentSubtitle === ""
                          ? "gray"
                          : isMobile
                          ? theme.palette.text.main
                          : theme.palette.text.primary,
                      fontSize: "24px",
                    }}
                  />
                )}
                <p className="text-[10px] text-main">تکرار جمله</p>
              </button>
              {movie?.language === 2 && (
                <button
                  disabled={!started || currentSubtitle === ""}
                  onClick={() => {
                    handleAction && handleAction?.(currentSubtitle);
                    handlePause();
                    handleFetchGrammar();
                    setActiveTab(3);
                  }}
                  className="text-white bg-layout p-1 rounded-lg"
                >
                  <EmojiObjectsIcon
                    sx={{
                      color:
                        !started || currentSubtitle === ""
                          ? "gray"
                          : isMobile && activeTab === 3
                          ? theme.palette.background.primary
                          : theme.palette.text.main,
                      fontSize: "24px",
                    }}
                  />
                  <p
                    className={`text-[10px] text-main ${
                      activeTab === 3 && "text-primary"
                    }`}
                  >
                    گرامر جمله
                  </p>
                </button>
              )}
            </>
          )}
          {(isTablet || isMobile) && (
            <>
              <button
                disabled={!started}
                onClick={() => {
                  setActiveTab(0);
                }}
                className="text-white bg-layout p-1 rounded-lg"
              >
                <ViewCarouselIcon
                  sx={{
                    color: !started
                      ? "gray"
                      : activeTab === 0
                      ? theme.palette.background.primary
                      : theme.palette.text.main,
                    fontSize: "24px",
                  }}
                />
                <p
                  className={`text-[10px] text-main ${
                    activeTab === 0 && "text-primary"
                  }`}
                >
                  فلش‌کارت‌ها
                </p>
              </button>

              <button
                disabled={!started}
                onClick={() => {
                  setActiveTab(2);
                }}
                className="text-white bg-layout p-1 rounded-lg"
              >
                <FormatQuoteIcon
                  sx={{
                    color: !started
                      ? "gray"
                      : activeTab === 2
                      ? theme.palette.background.primary
                      : theme.palette.text.main,
                    fontSize: "24px",
                  }}
                />
                <p
                  className={`text-[10px] text-main ${
                    activeTab === 2 && "text-primary"
                  }`}
                >
                  اجزای‌جمله
                </p>
              </button>

              <button
                disabled={!started}
                onClick={() => {
                  setActiveTab(1);
                }}
                className="text-white bg-layout p-1 rounded-lg"
              >
                <WysiwygIcon
                  sx={{
                    color: !started
                      ? "gray"
                      : activeTab === 1
                      ? theme.palette.background.primary
                      : theme.palette.text.main,
                    fontSize: "24px",
                  }}
                />
                <p
                  className={`text-[10px] text-main ${
                    activeTab === 1 && "text-primary"
                  }`}
                >
                  زیرنویس‌ها
                </p>
              </button>
            </>
          )}
        </div>
      )}

      {/* player settings modal */}
      {settingModal && (
        <PlayerSettingsModal
          open={settingModal}
          toggle={togglePlayerSettingModal}
          playerRef={playerRef}
          wrapperRef={wrapperRef}
          availableTranslates={availableTranslates}
        />
      )}
      {/* recording modal */}
      {recordModal && (
        <SpeachCompareModal
          recordModal={recordModal}
          toggleRecordModal={toggleRecordModal}
          currentSub={currentSubtitle}
        />
      )}
      {!!playerModals?.state && playerModals?.type === "WANNA_QUIZ" && (
        <WannaQuizModal
          open={!!playerModals?.state && playerModals?.type === "WANNA_QUIZ"}
          toggleModal={() => setPlayerModals({ state: false, type: "" })}
          movieData={movie}
          episodeData={episodeData}
          modalType={playerModals?.type}
        />
      )}
    </React.Suspense>
  );
};
export default PlayerContainer;
