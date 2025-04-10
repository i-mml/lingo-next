import * as React from "react";
import { isMobile, isTablet } from "react-device-detect";
import { useTextToAudio } from "@/hooks/use-text-to-audio";
import { useAuth } from "@/hooks/use-auth";
import WaveLoading from "@/components/shared/WaveLoading";
import TooltipBox from "../TooltipBox";
import useThemeCreator from "@/hooks/use-theme";

const KeyboardVoiceIcon = React.lazy(
  () => import("@mui/icons-material/KeyboardVoice")
);
const HeadsetIcon = React.lazy(() => import("@mui/icons-material/Headset"));
const EmojiObjectsIcon = React.lazy(
  () => import("@mui/icons-material/EmojiObjects")
);
const ViewCarouselIcon = React.lazy(
  () => import("@mui/icons-material/ViewCarousel")
);
const FormatQuoteIcon = React.lazy(
  () => import("@mui/icons-material/FormatQuote")
);
const WysiwygIcon = React.lazy(() => import("@mui/icons-material/Wysiwyg"));

interface PlayerControlsProps {
  started: boolean;
  currentSubtitle: any;
  activeTab: number;
  movie: any;
  handlePause: () => void;
  toggleRecordModal: () => void;
  setActiveTab: (tab: number) => void;
  handleAction?: (subtitle: any) => void;
  handleFetchGrammar: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  started,
  currentSubtitle,
  activeTab,
  movie,
  handlePause,
  toggleRecordModal,
  setActiveTab,
  handleAction,
  handleFetchGrammar,
}) => {
  const { theme }: any = useThemeCreator();
  const { whoAmI } = useAuth();
  const { handleTextToSpeech, textToSpeachMutation } = useTextToAudio();

  const handleTextToSpeechClick = () => {
    handlePause();
    handleTextToSpeech({
      text: currentSubtitle?.sentence?.subtitle,
      language:
        whoAmI?.userpreference?.preferred_language === 2 ? "en-US" : "de-DE",
    });
  };

  const handleGrammarClick = () => {
    handleAction?.(currentSubtitle);
    handlePause();
    handleFetchGrammar();
    setActiveTab(3);
  };

  if (!(isTablet || isMobile)) {
    return (
      <>
        <TooltipBox
          item={
            <KeyboardVoiceIcon
              sx={{
                color:
                  !started || currentSubtitle === ""
                    ? "gray"
                    : theme.palette.text.primary,
                fontSize: "24px",
              }}
            />
          }
          handleAction={toggleRecordModal}
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
          handleAction={handleTextToSpeechClick}
          tooltipText="تکرار جمله"
        />
        {movie?.language === 2 && (
          <TooltipBox
            tooltipText="گرامر جمله"
            handleAction={handleGrammarClick}
            disabled={!started || currentSubtitle === ""}
            item={
              <EmojiObjectsIcon
                sx={{
                  color:
                    !started || currentSubtitle === ""
                      ? "gray"
                      : theme.palette.text.primary,
                  fontSize: "24px",
                }}
              />
            }
          />
        )}
      </>
    );
  }

  return (
    <>
      <button
        disabled={!started || currentSubtitle === ""}
        onClick={toggleRecordModal}
        className="text-white bg-layout p-1 rounded-lg"
      >
        <KeyboardVoiceIcon
          sx={{
            color:
              !started || currentSubtitle === ""
                ? "gray"
                : theme.palette.text.main,
            fontSize: "24px",
          }}
        />
        <p className="text-[10px] text-main">بازگویی جمله</p>
      </button>
      <button
        disabled={
          !started || currentSubtitle === "" || textToSpeachMutation?.isLoading
        }
        onClick={handleTextToSpeechClick}
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
                  : theme.palette.text.main,
              fontSize: "24px",
            }}
          />
        )}
        <p className="text-[10px] text-main">تکرار جمله</p>
      </button>
      {movie?.language === 2 && (
        <button
          disabled={!started || currentSubtitle === ""}
          onClick={handleGrammarClick}
          className="text-white bg-layout p-1 rounded-lg"
        >
          <EmojiObjectsIcon
            sx={{
              color:
                !started || currentSubtitle === ""
                  ? "gray"
                  : activeTab === 3
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
      <button
        disabled={!started}
        onClick={() => setActiveTab(0)}
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
        onClick={() => setActiveTab(2)}
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
        onClick={() => setActiveTab(1)}
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
  );
};

export default PlayerControls;
