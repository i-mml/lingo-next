import { Box, Button, SxProps } from "@mui/material";
import React, { useState } from "react";

import { toast } from "react-toastify";

import CircleCheckedIcon from "@/assets//circle-checked-flashcard.svg";
import PinkTrashIcon from "@/assets//pink-trash.svg";
import SpeakerIcon from "@/assets//speaker.svg";
import { useMutation } from "@tanstack/react-query";
import { useTextToAudio } from "@/hooks/use-text-to-audio";
import {
  DeleteEducationFlashcards,
  PatchEducationFlashcardsUpdate,
} from "@/api/services/education";

export const FlashCardActions = ({
  item,
  refetch,
  sx,
}: {
  item: any;
  refetch: () => void;
  sx?: SxProps;
}) => {
  const [loading, setLoading] = useState(false);

  const handleLearned = async (learned: boolean) => {
    setLoading(true);
    await PatchEducationFlashcardsUpdate({
      id: item?.id,
      body: {
        is_learned: learned,
        times_seen: learned
          ? Number(item?.times_seen)
          : Number(item?.times_seen) + 1,
      },
    })
      .then(() => {
        if (learned) {
          refetch();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteFlashcard = async () => {
    setLoading(true);
    await DeleteEducationFlashcards({
      id: item?.id,
    })
      .then(() => {
        refetch();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const { handleTextToSpeech } = useTextToAudio();
  const handleSpeakerClick = async () => {
    handleTextToSpeech({ text: item.word });
  };

  return (
    <Box
      className="absolute bottom-0 w-full flex items-center justify-end gap-4 translate-y-[200px] group-hover:translate-y-0 transition-all"
      sx={{ ...sx }}
    >
      <Button
        disabled={loading}
        className={`w-10 h-10 min-w-10 rounded-full grid place-items-center ${
          item?.is_learned ? "bg-[#e9eef4]" : "bg-[#1D4D1A]"
        }`}
        onClick={() => handleLearned(true)}
      >
        <CircleCheckedIcon fill={item?.is_learned ? "#262626" : "#97E590"} />
      </Button>
      <Button
        disabled={loading}
        className="w-10 h-10 min-w-10 rounded-full bg-[#133295] grid place-items-center"
        onClick={handleSpeakerClick}
      >
        <SpeakerIcon fill="#88C1FF" />
      </Button>
      <Button
        disabled={loading}
        className="w-10 h-10 min-w-10 rounded-full bg-[#8F0C2A] grid place-items-center"
        onClick={handleDeleteFlashcard}
      >
        <PinkTrashIcon fill="#FFE2E3" />
      </Button>
    </Box>
  );
};
