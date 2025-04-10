import * as React from "react";
import PlayerSettingsModal from "../PlayerSettingsModal";
import SpeachCompareModal from "@/components/modals/SpeachCompareModal";
import WannaQuizModal from "../WannaQuizModal";

interface PlayerModalsProps {
  settingModal: boolean;
  recordModal: boolean;
  playerModals: {
    type: "" | "BEFORE_LEAVE" | "WANNA_QUIZ";
    state: boolean;
  };
  togglePlayerSettingModal: () => void;
  toggleRecordModal: () => void;
  setPlayerModals: (modals: {
    type: "" | "BEFORE_LEAVE" | "WANNA_QUIZ";
    state: boolean;
  }) => void;
  currentSubtitle: any;
  playerRef: React.RefObject<any>;
  wrapperRef: React.RefObject<HTMLDivElement>;
  availableTranslates: string[];
  movie: any;
  episodeData: any;
}

const PlayerModals: React.FC<PlayerModalsProps> = ({
  settingModal,
  recordModal,
  playerModals,
  togglePlayerSettingModal,
  toggleRecordModal,
  setPlayerModals,
  currentSubtitle,
  playerRef,
  wrapperRef,
  availableTranslates,
  movie,
  episodeData,
}) => {
  return (
    <>
      {settingModal && (
        <PlayerSettingsModal
          open={settingModal}
          toggle={togglePlayerSettingModal}
          playerRef={playerRef}
          wrapperRef={wrapperRef}
          availableTranslates={availableTranslates}
        />
      )}
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
    </>
  );
};

export default PlayerModals;
