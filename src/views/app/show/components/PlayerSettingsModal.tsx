import { FullscreenRounded } from "@mui/icons-material";
import { Checkbox, IconButton, MenuItem, Select } from "@mui/material";
import React, { useRef, useState } from "react";
import { isIOS, isMobile } from "react-device-detect";

import screenfull from "screenfull";

import { shallow } from "zustand/shallow";
import EnglishFlag from "@/assets/english-flag.svg";
import IranFlag from "@/assets/iran-flag.svg";
import { useVideoPlayerStore } from "../store/playerStore";
import useThemeCreator from "@/hooks/use-theme";
import { ISubtitleLanguages } from "@/types/player";
import CustomModal from "@/components/shared/CustomModal";
import IosCheckbox from "@/components/shared/IosCheckbox";
import { translateFieldsItems } from "@/constants/player-fields";
import { useTheme } from "next-themes";

interface Iprops {
  playerRef: any;
  wrapperRef: any;
  open: boolean;
  toggle: () => void;
  availableTranslates: any[];
}

const PlayerSettingsModal = (props: Iprops) => {
  const { open, toggle, wrapperRef, availableTranslates } = props;

  const {
    subtitleTranslateLanguages,
    translateSubtitle,
    learningSubtitle,
    playbackRate,
    main_fontSize,
    translate_fontSize,
    play,
    pause,
    setPlaybackRate,
    decreaseMainFontSize,
    decreaseTranslateFontSize,
    increaseMainFontSize,
    increaseTranslateFontSize,
    setSubtitleTranslateLanguages,
    toggleLearningSubtitle,
    toggleTranslateSubtitle,
  } = useVideoPlayerStore(
    (state) => ({
      subtitleTranslateLanguages: state.subtitleTranslateLanguages,
      translateSubtitle: state.translateSubtitle,
      learningSubtitle: state.learningSubtitle,
      playbackRate: state.playbackRate,
      main_fontSize: state.main_fontSize,
      translate_fontSize: state.translate_fontSize,
      play: state.play,
      pause: state.pause,
      setPlaybackRate: state.setPlaybackRate,
      decreaseMainFontSize: state.decreaseMainFontSize,
      decreaseTranslateFontSize: state.decreaseTranslateFontSize,
      increaseMainFontSize: state.increaseMainFontSize,
      increaseTranslateFontSize: state.increaseTranslateFontSize,
      setSubtitleTranslateLanguages: state.setSubtitleTranslateLanguages,
      toggleLearningSubtitle: state.toggleLearningSubtitle,
      toggleTranslateSubtitle: state.toggleTranslateSubtitle,
    }),
    shallow
  );
  const [selectedTranslateLanguages, setSelectedTranslateLanguages] = useState<
    string[]
  >(subtitleTranslateLanguages);
  const { theme }: any = useThemeCreator();
  const { theme: themeType } = useTheme();

  const ref = useRef<any>(null);

  const handlePlayerSpeed = (e: any) => {
    setPlaybackRate(e.target.value);
  };

  const handleFullscreen = () => {
    screenfull.toggle(wrapperRef.current);
    play();
  };

  const SubtitleLanguages: ISubtitleLanguages[] = [
    {
      id: 1,
      icon: <EnglishFlag width={32} height={32} />,
      name: "زیرنویس اصلی",
      disabled: !learningSubtitle,
      actionName: "TOGGLE_LEARNING_SUBTITLE",
    },
    {
      id: 2,
      icon: <IranFlag width={32} height={32} />,
      name: "زیرنویس ترجمه",
      disabled: !translateSubtitle,
      actionName: "TOGGLE_TRANSLATE_SUBTITLE",
    },
  ];

  return (
    <CustomModal open={open} toggle={toggle}>
      <div className="w-full md:w-[500px] min-h-[60vh]">
        {!isIOS && (
          <div
            className="flex items-center justify-between border-b border-gray400 py-5"
            onClick={handleFullscreen}
          >
            <div className="text-gray400 text-[16px] lg:text-xl font-medium">
              نمای تمام صفحه
            </div>
            <IconButton onClick={handleFullscreen}>
              <FullscreenRounded
                sx={{ fontSize: "2rem" }}
                className="!text-main"
              />
            </IconButton>
          </div>
        )}
        <div className="flex items-center justify-between border-b border-gray400 py-5">
          <div className="text-gray400 text-[16px] lg:text-xl font-medium">
            تنظیم سرعت
          </div>
          <div onClick={pause}>
            <Select
              value={playbackRate}
              onChange={handlePlayerSpeed}
              onMouseDown={pause}
              className="!p-0"
              ref={ref}
              autoWidth
              sx={{
                color: theme.palette.text.primary,
                border: "none",
                outline: "none",
                padding: "0 !important",
              }}
              classes={{
                root: "!p-0",
                icon: themeType === "dark" ? "!fill-[white]" : "!fill-[black]",
              }}
            >
              <MenuItem value={0.5}>0.5X</MenuItem>
              <MenuItem value={0.75}>0.75X</MenuItem>
              <MenuItem value={1}>1X</MenuItem>
              <MenuItem value={1.25}>1.25X</MenuItem>
              <MenuItem value={1.5}>1.5X</MenuItem>
              <MenuItem value={1.75}>1.75X</MenuItem>
              <MenuItem value={2}>2X</MenuItem>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-gray400 py-5">
          <div className="text-gray400 text-[16px] lg:text-xl font-medium">
            اندازه زیرنویس
          </div>
          <div className="flex items-center gap-2 text-main">
            <button
              onClick={decreaseMainFontSize}
              disabled={isMobile ? main_fontSize < 11 : main_fontSize < 14}
              type="button"
              className="text-main disabled:text-gray-500 w-10 h-5 bg-layout rounded-xl"
            >
              -
            </button>
            <div>{main_fontSize}</div>
            <button
              onClick={increaseMainFontSize}
              disabled={isMobile ? main_fontSize > 21 : main_fontSize > 32}
              type="button"
              className="text-main disabled:text-gray-500 w-10 h-5 bg-layout rounded-xl"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-gray400 py-5">
          <div className="text-gray400 text-[16px] lg:text-xl font-medium">
            اندازه زیرنویس ترجمه
          </div>
          <div className="flex items-center gap-2 text-main">
            <button
              onClick={decreaseTranslateFontSize}
              disabled={
                isMobile ? translate_fontSize < 10 : translate_fontSize < 13
              }
              type="button"
              className="text-main disabled:text-gray-500 w-10 h-5 bg-layout rounded-xl"
            >
              -
            </button>
            <div>{translate_fontSize}</div>
            <button
              onClick={increaseTranslateFontSize}
              disabled={
                isMobile ? translate_fontSize > 19 : translate_fontSize > 27
              }
              type="button"
              className="text-main disabled:text-gray-500 w-10 h-5 bg-layout rounded-xl"
            >
              +
            </button>
          </div>
        </div>
        <div className="py-5">
          <div className="text-gray400 text-[16px] lg:text-xl font-medium">
            مدیریت زیرنویس‌ها
          </div>
          <div className="flex items-center justify-between pl-5">
            {SubtitleLanguages?.map((item: ISubtitleLanguages) => (
              <div
                className="flex items-center gap-5 h-14 text-main"
                key={item?.id}
              >
                {item?.name}
                <IosCheckbox
                  type="checkbox"
                  checked={!item?.disabled}
                  onChange={() => {
                    item.actionName === "TOGGLE_LEARNING_SUBTITLE"
                      ? toggleLearningSubtitle()
                      : toggleTranslateSubtitle();
                  }}
                />
              </div>
            ))}
          </div>
          {availableTranslates?.length > 1 && !!translateSubtitle && (
            <div className="flex items-center justify-between">
              <div className="text-gray400 text-[16px] lg:text-xl font-medium">
                انتخاب زبان ترجمه
              </div>
              <div className="flex items-center gap-4">
                {availableTranslates?.map((item) => (
                  <div className="flex items-center text-main">
                    <Checkbox
                      checked={selectedTranslateLanguages?.includes(item)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTranslateLanguages((prev) => [
                            ...prev,
                            item,
                          ]);
                          setSubtitleTranslateLanguages([
                            ...selectedTranslateLanguages,
                            item,
                          ]);
                        } else {
                          setSelectedTranslateLanguages((prev) =>
                            prev?.filter((node) => node !== item)
                          );
                          setSubtitleTranslateLanguages(
                            selectedTranslateLanguages?.filter(
                              (node) => node !== item
                            )
                          );
                        }
                      }}
                      value={item}
                      name="radio-buttons"
                      inputProps={{ "aria-label": item }}
                      sx={{
                        color: theme.palette.text.main,
                      }}
                    />
                    <label>{translateFieldsItems?.[item]?.title}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default PlayerSettingsModal;
