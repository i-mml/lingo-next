"use client";

import { useState } from "react";
import { Tooltip } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { shallow } from "zustand/shallow";
import { useVideoPlayerStore } from "../store/playerStore";
import { PostFlashcards } from "@/api/services/cms";
import { toast } from "react-toastify";
import HoveredTooltipBox from "./HoveredTooltipBox";
import { isDesktop, isMobile } from "react-device-detect";
import screenfull from "screenfull";

export const StyledTooltip = (props: any) => {
  const {
    word,
    handlePause,
    setSelectedWord,
    currentSubtitle,
    refetchFlashCards,
    toggleWordInfoModal,
  } = props;
  const { main_fontSize } = useVideoPlayerStore(
    (state) => ({
      main_fontSize: state.main_fontSize,
      loadingSubtitleGrammar: state.loadingSubtitleGrammar,
    }),
    shallow
  );

  const [open, setOpen] = useState(false);

  const postFlashcardsMutation = useMutation({
    mutationFn: PostFlashcards,
    onSuccess: () => {
      toast.success("فلش‌کارت با موفقیت افزوده شد.");
      refetchFlashCards();
    },
    onError: () => {
      toast.error("خطا در ایجاد فلش‌کارت جدید");
    },
  });

  const handlePostFlashcards = async (params: any) => {
    await postFlashcardsMutation.mutateAsync(params);
  };

  const handleClickSubtitle = () => {
    setSelectedWord(word);
    toggleWordInfoModal();
    setOpen(false);
  };

  const subtitleClickHandler = () => {
    if (isDesktop && screenfull?.isFullscreen) {
      setOpen(true);
    } else {
      handleClickSubtitle();
    }
  };

  return (
    <Tooltip
      open={open}
      onMouseOver={() => setOpen(true)}
      onMouseEnter={isMobile ? () => {} : () => setOpen(true)}
      onClick={() => {}}
      onClose={() => setOpen(false)}
      title={
        word?.translate ? (
          <HoveredTooltipBox
            word={word}
            handlePostFlashcards={handlePostFlashcards}
            currentSubtitle={currentSubtitle}
            flashCardIsLoading={postFlashcardsMutation.isPending}
            toggleWordInfoModal={toggleWordInfoModal}
            setSelectedWord={setSelectedWord}
          />
        ) : null
      }
      componentsProps={{
        tooltip: {
          className: "bg-white shadow-lg rounded-lg p-0",
        },
        arrow: {
          className: "text-white",
        },
      }}
      sx={{
        zIndex: 9999,
      }}
      placement="top"
      {...props}
    >
      <span
        onMouseOver={() => handlePause()}
        onClick={subtitleClickHandler}
        className="cursor-pointer hover:underline transition-all"
        style={{ fontSize: `${main_fontSize}px` }}
      >
        {word.text}
      </span>
    </Tooltip>
  );
};
