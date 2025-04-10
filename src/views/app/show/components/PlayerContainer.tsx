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
            started={started}
            currentSubtitle={currentSubtitle}
            activeTab={activeTab}
            movie={movie}
            handlePause={handlePause}
            toggleRecordModal={toggleRecordModal}
            setActiveTab={setActiveTab}
            handleAction={handleAction}
            handleFetchGrammar={() =>
              handleFetchGrammar(currentSubtitle?.sentence?.subtitle)
            }
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
          <PlayerControls
            started={started}
            currentSubtitle={currentSubtitle}
            activeTab={activeTab}
            movie={movie}
            handlePause={handlePause}
            toggleRecordModal={toggleRecordModal}
            setActiveTab={setActiveTab}
            handleAction={handleAction}
            handleFetchGrammar={() =>
              handleFetchGrammar(currentSubtitle?.sentence?.subtitle)
            }
          />
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
