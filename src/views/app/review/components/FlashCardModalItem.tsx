import { Button } from "@mui/material";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { PatchEducationFlashcardsUpdate } from "@/api/services/education";

import CloseLightIcon from "@/assets/close-light.svg";
import FlashCardModalTickIcon from "@/assets/flashcard-modal-tick.svg";
import RetryRoundedIcon from "@/assets/retry-rounded.svg";
import PrimaryButton from "@/components/shared/PrimaryButton";
import WordTypeCard from "./WordTypeCard";
import HighlightWord from "@/components/shared/HighlightWord";
import { PlayerBox } from "@/components/shared/PlayerBox";
import WordDetailModal from "@/components/modals/WordDetailModal";

interface IProps {
  item: any;
  activeIndex: number;
  index: number;
  setLearnedIds: Dispatch<SetStateAction<number[]>>;
  handleNext: () => void;
}

const FlashCardModalItem = (props: IProps) => {
  const { item, activeIndex, index, setLearnedIds, handleNext } = props;
  const playerRef = useRef(null);
  const [wordDetailModal, setWordDetailModal] = useState(false);

  const wordGrammarJson =
    item?.grammatical_json?.length > 0
      ? JSON.parse(item?.grammatical_json)?.sentence?.words?.find(
          (node: { id: number }) => node.id === item?.word_rel
        )
      : "";

  const toggleWordInfoModal = () => setWordDetailModal((prev) => !prev);

  const updateFlashcardHandler = async (
    isLearned: boolean,
    times_seen: number
  ) => {
    await PatchEducationFlashcardsUpdate({
      id: item?.id,
      body: {
        is_learned: isLearned,
        times_seen: Number(times_seen) + 1,
      },
    }).then(() => {
      if (isLearned) {
        setLearnedIds((prev) => [...prev, item?.id]);
      }
      handleNext();
    });
  };

  const updateFlashcardMutation = useMutation({
    mutationFn: ({
      isLearned,
      times_seen,
    }: {
      isLearned: boolean;
      times_seen: number;
    }) => updateFlashcardHandler(isLearned, times_seen),
  });

  const learnedStatusAction = (isLearned: boolean) => {
    updateFlashcardMutation.mutate({
      isLearned: isLearned,
      times_seen: item?.times_seen,
    });
  };

  return (
    <div className="bg-backgroundMain p-4 rounded-xl flex flex-col w-full max-w-[472px] sm:w-[91.11%] sm:mx-auto sm:p-3">
      {/* Video Player */}
      <div className="w-full h-[calc(100vw*0.55)] max-h-64 mb-4">
        {activeIndex - 1 === index && (
          <PlayerBox
            playerRef={playerRef}
            height="unset"
            file={item?.file}
            handleAction={() => console.log("")}
            withControlled={false}
            playerState
          />
        )}
      </div>

      {/* Word Box */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-gray400 text-xl sm:text-lg">
          {item?.word_translation}
        </span>
        <span className="text-main text-2xl font-semibold border-r border-gray300 pr-3 mr-1 sm:text-xl">
          {item?.word}
        </span>
      </div>

      {/* Word Type and Button */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <WordTypeCard title={wordGrammarJson?.pt} />
        <PrimaryButton onClick={toggleWordInfoModal}>توضیح بیشتر</PrimaryButton>
      </div>

      {/* Sentence Box */}
      <div className="my-3 py-4 border-t border-b border-gray300">
        <div className="text-lg text-main text-center dir-ltr sm:text-base">
          <HighlightWord sentence={item?.text} targetWord={item?.word} />
        </div>
        <div className="text-gray400 text-lg text-center mt-2 sm:text-base">
          {item?.translation}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 sm:justify-between sm:gap-4">
        <Button
          className="rounded-full border border-gray300 bg-white/10 text-gray300 px-6 py-3 hover:bg-white/20 transition-colors sm:text-sm sm:px-3"
          onClick={() => learnedStatusAction(false)}
        >
          <RetryRoundedIcon className="w-6 h-6 sm:w-5 sm:h-5" />
          <span className="mr-2">دوره دوباره</span>
        </Button>

        <Button
          className="rounded-full border border-gray300 bg-white/10 p-3 hover:bg-white/20 transition-colors"
          onClick={() => learnedStatusAction(true)}
        >
          <FlashCardModalTickIcon className="w-8 h-8 sm:w-6 sm:h-6" />
        </Button>

        <Button
          className="rounded-full border border-gray300 bg-white/10 text-gray300 px-6 py-3 hover:bg-white/20 transition-colors sm:text-sm sm:px-3"
          onClick={() => learnedStatusAction(false)}
        >
          <CloseLightIcon className="w-6 h-6 sm:w-5 sm:h-5" />
          <span className="mr-2">یاد نگرفتم</span>
        </Button>
      </div>

      {wordDetailModal && (
        <WordDetailModal
          word={{ text: item?.word, id: item?.word_rel }}
          open={wordDetailModal}
          toggleModal={toggleWordInfoModal}
          hasFlashcardButton={false}
        />
      )}
    </div>
  );
};

export default FlashCardModalItem;
