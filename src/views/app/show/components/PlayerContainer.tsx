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
import screenfull from "screenfull";
import WaveLoading from "@/components/shared/WaveLoading";
import { StyledPlayer } from "./playerStyels";
import { usePlayerState } from "../hooks/usePlayerState";
import PlayerControls from "./player/PlayerControls";
import PlayerModals from "./player/PlayerModals";
import Subtitle from "./Subtitle";

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
const TooltipBox = React.lazy(() => import("./TooltipBox"));
const SpeachCompareModal = React.lazy(
  () => import("@/components/modals/SpeachCompareModal")
);
const PlayerSettingsModal = React.lazy(() => import("./PlayerSettingsModal"));
const WannaQuizModal = React.lazy(() => import("./WannaQuizModal"));

interface PlayerContainerProps extends ReactPlayerProps {
  url: string;
  playerRef: React.RefObject<any>;
  subtitle: any;
  handleProgressfunc: (progress: { playedSeconds: number }) => void;
  withControlled: boolean;
  handleAction?: (subtitle: any) => void;
  setActiveTab: (tab: number) => void;
  activeTab: number;
  refetchFlashCardsList: () => void;
  movie: any;
  episodeData: any;
}

const PlayerContainer: React.FC<PlayerContainerProps> = ({
  url,
  playerRef,
  subtitle,
  handleProgressfunc,
  withControlled,
  handleAction,
  setActiveTab,
  activeTab,
  refetchFlashCardsList,
  movie,
  episodeData,
}) => {
  const hlsConfig = {
    maxBufferLength: 1,
    maxMaxBufferLength: 60,
  };

  const { playing, controls, volume, playbackRate } = useVideoPlayerStore(
    (state) => ({
      playing: state.playing,
      controls: state.controls,
      volume: state.volume,
      playbackRate: state.playbackRate,
    }),
    shallow
  );

  const wrapperRef = React.useRef<any>(null);
  const { currentSubtitle } = useStore(
    (state: any) => ({ currentSubtitle: state.currentSubtitle }),
    shallow
  );
  const [started, setStarted] = React.useState(false);
  const { theme }: any = useThemeCreator();
  const { isLandscape } = useMobileOrientation();

  const {
    recordModal,
    settingModal,
    playerModals,
    setPlayerModals,
    handlePreview,
    handlePause,
    toggleRecordModal,
    togglePlayerSettingModal,
    handlePlay,
    handleEnded,
    handleProgress,
    handleDuration,
    handleFetchGrammar,
  } = usePlayerState();
  const { whoAmI } = useAuth();

  const { handleTextToSpeech, textToSpeachMutation } = useTextToAudio();

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
          onProgress={(progress) => {
            handleProgress(progress);
            handleProgressfunc(progress);
          }}
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
          {!(isTablet || isMobile) ? (
            <>
              <TooltipBox
                item={
                  <KeyboardVoiceIcon
                    sx={{
                      color:
                        !started || !currentSubtitle
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
                disabled={!started || !currentSubtitle}
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
                          !started || !currentSubtitle
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
                  !currentSubtitle ||
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
                    handleFetchGrammar(currentSubtitle);
                    setActiveTab(3);
                  }}
                  disabled={!started || !currentSubtitle}
                  item={
                    <EmojiObjectsIcon
                      sx={{
                        color:
                          !started || !currentSubtitle
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
                id="seventh-step"
                disabled={!started || !currentSubtitle}
                onClick={() => {
                  handlePause();
                  toggleRecordModal();
                }}
                className="text-white bg-layout p-1 rounded-lg"
              >
                <KeyboardVoiceIcon
                  sx={{
                    color:
                      !started || !currentSubtitle
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
                  !currentSubtitle ||
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
                id="sixth-step"
              >
                {textToSpeachMutation?.isLoading ? (
                  <WaveLoading />
                ) : (
                  <HeadsetIcon
                    sx={{
                      color:
                        !started || !currentSubtitle
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
                  disabled={!started || !currentSubtitle}
                  onClick={() => {
                    handleAction && handleAction?.(currentSubtitle);
                    handlePause();
                    handleFetchGrammar(currentSubtitle);
                    setActiveTab(3);
                  }}
                  className="text-white bg-layout p-1 rounded-lg"
                  id="fifth-step"
                >
                  <EmojiObjectsIcon
                    sx={{
                      color:
                        !started || !currentSubtitle
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
                id="fourth-step"
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
                id="third-step"
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
                id="second-step"
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

      <PlayerModals
        settingModal={settingModal}
        recordModal={recordModal}
        playerModals={playerModals}
        togglePlayerSettingModal={togglePlayerSettingModal}
        toggleRecordModal={toggleRecordModal}
        setPlayerModals={setPlayerModals}
        currentSubtitle={currentSubtitle}
        playerRef={playerRef}
        wrapperRef={wrapperRef}
        availableTranslates={availableTranslates}
        movie={movie}
        episodeData={episodeData}
      />
    </React.Suspense>
  );
};

export default PlayerContainer;
