"use client";

import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import HeadsetIcon from "@mui/icons-material/Headset";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

import { isIOS } from "react-device-detect";
import { shallow } from "zustand/shallow";

import TooltipBox from "./TooltipBox";
import SpeachCompareModal from "../modals/SpeachCompareModal";
import dynamic from "next/dynamic";
import usePlayerBoxStore from "@/store/use-playerbox-store";

export interface IProps {
  playerState?: boolean;
  handleProgress?: any;
  renderSubtitles?: any;
  playerRef: any;
  file: any;
  handleAction: (item: any) => void;
  withControlled: any;
  height: any;
  handlePause?: () => void;
  withPlayButton?: boolean;
  className?: string;
}

export const PlayerBox = ({
  playerState,
  handleProgress,
  renderSubtitles,
  playerRef,
  file,
  handleAction,
  withControlled,
  height,
  handlePause = () => {},
  withPlayButton = false,
  className,
}: IProps) => {
  const hlsConfig = {
    maxBufferLength: 1,
    maxMaxBufferLength: 90,
  };

  const { currentSubtitle } = usePlayerBoxStore(
    (state: any) => ({
      currentSubtitle: state.currentSubtitle,
    }),
    shallow
  );

  const [movieFile, setMovieFile] = useState("");
  const [recordModal, setRecordModal] = useState(false);
  const [started, setStarted] = useState(false);

  const toggleRecordModal = () => {
    setRecordModal((prev) => !prev);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      setMovieFile(file);
    });
  }, [file]);

  return (
    <div className="player-wrapper" style={{ position: "relative" }}>
      <ReactPlayer
        className={`react-player ${className}`}
        playing={playerState}
        ref={playerRef}
        width="100%"
        height={height}
        url={movieFile}
        onStart={() => setStarted(true)}
        controls={withPlayButton || withControlled}
        playsinline
        config={{
          file: isIOS
            ? {}
            : {
                hlsOptions: hlsConfig,
                forceHLS: true,
              },
        }}
        onProgress={handleProgress}
        loop={!withControlled}
      />
      {!!withControlled && renderSubtitles}

      {!!withControlled && (
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "100%",
            rowGap: "10px",
            columnGap: "10px",
          }}
        >
          <TooltipBox
            tooltipText="گرامر جمله"
            handleAction={() => handleAction && handleAction?.(currentSubtitle)}
            disabled={!currentSubtitle}
            item={
              <EmojiObjectsIcon
                sx={{
                  color: currentSubtitle ? "white " : "gray",
                  fontSize: "24px",
                }}
              />
            }
          />
          <TooltipBox
            item={
              <KeyboardVoiceIcon
                sx={{
                  color: !started || currentSubtitle === "" ? "gray" : "white",
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
            item={<HeadsetIcon sx={{ color: "white", fontSize: "24px" }} />}
          />
        </Box>
      )}

      {/* recording modal */}
      {recordModal && (
        <SpeachCompareModal
          recordModal={recordModal}
          toggleRecordModal={toggleRecordModal}
          currentSub={currentSubtitle}
        />
      )}
    </div>
  );
};
