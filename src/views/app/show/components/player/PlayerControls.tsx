import { FullscreenRounded, VolumeDownRounded } from "@mui/icons-material";
import Forward10Icon from "@mui/icons-material/Forward10";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import Replay10Icon from "@mui/icons-material/Replay10";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Slider, Stack, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";
import * as React from "react";
import {
  isDesktop,
  isMobile,
  isTablet,
  useMobileOrientation,
} from "react-device-detect";
import { ReactPlayerProps } from "react-player";
import { shallow } from "zustand/shallow";
import { useVideoPlayerStore } from "../../store/playerStore";
import screenfull from "screenfull";

const StyledPlayerControls = styled("div")`
  box-sizing: border-box;
  padding: 4px 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;

  .video-player__slider {
    width: 100%;
    color: #ffa800;
    box-sizing: border-box;

    &--seek {
      margin-left: 12px;
      margin-right: 12px;
    }
    &--mobile {
      width: unset;
      flex: 1;
      margin: 0 4px 0 10px;
    }

    &--sound {
      width: 100px;
    }

    .MuiSlider-track {
      border: none;
    }

    .MuiSlider-thumb {
      background-color: #fff;

      &:before: {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
      }

      &:hover,
      &.Mui-focusVisible,
      &.Mui-active {
        box-shadow: none;
      }
    }
  }
`;

const PlayerSettingButton = React.memo(
  ({ handleFullscreen, togglePlayerSettingModal, isFullscreen }: any) => {
    if (isFullscreen) {
      return (
        <IconButton onClick={handleFullscreen}>
          <FullscreenRounded sx={{ fontSize: "2rem", color: "white" }} />
        </IconButton>
      );
    }
    return (
      <IconButton id="eighth-step" onClick={togglePlayerSettingModal}>
        <SettingsIcon
          className={`text-white`}
          sx={{ fontSize: { xs: "1.7rem", md: "2rem" } }}
        />
      </IconButton>
    );
  }
);

const SeekSlider = React.memo(
  ({ tag, duration, progress, handleSeek }: any) => {
    return (
      <Slider
        aria-label="Time"
        className={`video-player__slider ${
          tag === "seek"
            ? "video-player__slider--seek"
            : "video-player__slider--mobile"
        }`}
        min={0}
        max={duration}
        step={0.01}
        value={progress.playedSeconds}
        onChange={handleSeek}
        size={isMobile ? "small" : "medium"}
        style={{
          display: isMobile && tag === "seek" ? "none" : "block",
          direction: "ltr",
        }}
      />
    );
  }
);

const PlayButton = React.memo(({ togglePlay, playing }: any) => {
  return (
    <IconButton onClick={togglePlay}>
      {playing ? (
        <PauseRounded sx={{ fontSize: "1.5rem", color: "white" }} />
      ) : (
        <PlayArrowRounded sx={{ fontSize: "1.5", color: "white" }} />
      )}
    </IconButton>
  );
});

const SoundSlider = React.memo(({ volume, handleSound }: any) => {
  return (
    <Stack
      spacing={1}
      direction="row"
      sx={{ mb: 1, px: 0.3 }}
      alignItems="center"
    >
      <VolumeDownRounded sx={{ fontSize: "1.5rem", color: "white" }} />
      <Slider
        aria-label="Volume"
        className={"video-player__slider video-player__slider--sound"}
        max={1}
        step={0.01}
        sx={{
          '& input[type="range"]': {
            WebkitAppearance: "slider-vertical",
          },
        }}
        value={volume}
        onChange={handleSound}
      />
    </Stack>
  );
});

const DurationText = React.memo(({ progress, duration }: any) => {
  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ mb: 1, px: 0 }}
      alignItems="center"
    >
      <Typography variant="body2" color="white">
        {Math.floor(progress.playedSeconds / 60) +
          ":" +
          ("0" + Math.floor(progress.playedSeconds % 60)).slice(-2)}
        {" / "}
        {Math.floor(duration / 60) +
          ":" +
          ("0" + Math.floor(duration % 60)).slice(-2)}
      </Typography>
    </Stack>
  );
});

const PlayerControls: React.FC<ReactPlayerProps> = (props) => {
  const { togglePlayerSettingModal, playerRef, wrapperRef, settingModal } =
    props;

  const { setVolume, play, progress, duration, togglePlay, playing, volume } =
    useVideoPlayerStore(
      (state) => ({
        setVolume: state.setVolume,
        play: state.play,
        progress: state.progress,
        duration: state.duration,
        togglePlay: state.togglePlay,
        playing: state.playing,
        volume: state.volume,
      }),
      shallow
    );

  const handleSound = React.useCallback(
    (_event: Event, newValue: number | number[]) => {
      setVolume(newValue as number);
    },
    [setVolume]
  );

  const handleSeek = React.useCallback(
    (_event: Event, newValue: number | number[]) => {
      playerRef.current.seekTo(newValue as number);
    },
    [playerRef]
  );

  const handleForward10 = () => {
    playerRef.current.seekTo((progress.playedSeconds + 10) as number);
  };

  const handleBackward10 = () => {
    playerRef.current.seekTo((progress.playedSeconds - 10) as number);
  };

  const handleFullscreen = React.useCallback(() => {
    if (settingModal) {
      togglePlayerSettingModal();
    }
    screenfull.toggle();
    play();
  }, [play, settingModal, togglePlayerSettingModal, wrapperRef]);

  const { isLandscape } = useMobileOrientation();

  return (
    <StyledPlayerControls
      dir="ltr"
      className={`video-player__controls
            ${!screenfull?.isFullscreen && isDesktop ? "bottom-[0] " : {}} 
            ${
              screenfull?.isFullscreen && isDesktop ? "bottom-[0] relative" : ""
            } 
            ${
              screenfull?.isFullscreen && isMobile && !isLandscape
                ? "bottom-[0] relative"
                : ""
            }
            ${
              screenfull?.isFullscreen && isMobile && isLandscape
                ? "bottom-[0] relative"
                : ""
            } 
            ${!screenfull?.isFullscreen && isMobile ? "bottom-[-42px]" : ""}
            ${!screenfull?.isFullscreen && isTablet ? "bottom-[-10px]" : ""}
          `}
      // style={
      //   !screenfull?.isFullscreen && isMobile
      //     ? {
      //         bottom: "-42px",
      //       }
      //     : {}
      // }
    >
      {!isMobile && (
        <Stack direction="row" alignItems="center">
          <SeekSlider
            tag="seek"
            duration={duration}
            progress={progress}
            handleSeek={handleSeek}
          />
        </Stack>
      )}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          <PlayButton togglePlay={togglePlay} playing={playing} />
          <SoundSlider volume={volume} handleSound={handleSound} />
          <DurationText progress={progress} duration={duration} />
        </Stack>
        {isMobile && (
          <IconButton
            onClick={handleBackward10}
            disabled={progress.playedSeconds < 10}
          >
            <Replay10Icon className="text-white ml-1 !text-2xl" />
          </IconButton>
        )}
        {isMobile && (
          <SeekSlider
            tag="mobile"
            duration={duration}
            progress={progress}
            handleSeek={handleSeek}
          />
        )}
        {isMobile && (
          <IconButton onClick={handleForward10}>
            <Forward10Icon className="text-white !text-2xl" />
          </IconButton>
        )}

        <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
          <PlayerSettingButton
            handleFullscreen={handleFullscreen}
            togglePlayerSettingModal={togglePlayerSettingModal}
            isFullscreen={screenfull?.isFullscreen}
          />
        </Stack>
      </Stack>
    </StyledPlayerControls>
  );
};

export default PlayerControls;
