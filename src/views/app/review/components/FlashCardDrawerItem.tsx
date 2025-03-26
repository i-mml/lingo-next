import React, { useEffect, useRef, useState } from "react";

import CircleCheckedIcon from "@/assets/circle-checked-flashcard.svg";
import PinkTrashIcon from "@/assets/pink-trash.svg";
import {
  DeleteEducationFlashcards,
  PatchEducationFlashcardsUpdate,
} from "@/api/services/education";
import WordDetailModal from "@/components/modals/WordDetailModal";
import { PlayerBox } from "@/components/shared/PlayerBox";
import WordTypeCard from "./WordTypeCard";
import PrimaryButton from "@/components/shared/PrimaryButton";
import HighlightWord from "@/components/shared/HighlightWord";
import Play from "@/assets/play.svg";
import OutlineButton from "@/components/shared/OutlineButton";

const FlashCardDrawerItem = ({
  item,
  onClose,
}: {
  item: any;
  onClose: () => void;
}) => {
  const playerRef = useRef(null);
  const updateFlashcardHandler = async (
    learned: boolean,
    onCloseCall: boolean
  ) => {
    await PatchEducationFlashcardsUpdate({
      id: item?.id,
      body: {
        is_learned: learned,
        times_seen: Number(item?.times_seen) + 1,
      },
    }).then(() => {
      if (onCloseCall) {
        onClose();
      }
    });
  };

  const deleteFlashCard = async () => {
    await DeleteEducationFlashcards({
      id: item?.id,
    }).then(() => {
      onClose();
    });
  };

  const [wordDetailModal, setWordDetailModal] = useState(false);
  const wordGrammarJson =
    item?.grammatical_json?.length > 0
      ? JSON.parse(item?.grammatical_json)?.sentence?.words?.find(
          (node: { id: number }) => node.id === item?.word_rel
        )
      : "";
  const toggleWordInfoModal = () => setWordDetailModal((prev) => !prev);

  useEffect(() => {
    updateFlashcardHandler(item?.is_learned, false);
  }, [item?.is_learned]);

  return (
    <div className="bg-backgroundMain p-4 flex flex-col rounded-xl w-full sm:max-w-[472px] h-full dir-rtl">
      {/* Video Player */}
      <div className="w-full h-[calc(100vw*0.55)] max-h-[260px] mb-4">
        <PlayerBox
          playerRef={playerRef}
          height="unset"
          file={item?.file}
          handleAction={() => console.log("")}
          withControlled={false}
          playerState
        />
      </div>

      {/* Word Box */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-gray400 text-sm sm:text-xs">
          {item?.word_translation}
        </span>
        <span className="text-main text-base font-semibold border-r border-gray300 pr-3 mr-1 sm:text-sm">
          {item?.word}
        </span>
      </div>

      {/* Word Type and Button */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <WordTypeCard title={wordGrammarJson?.pt} />
        <PrimaryButton onClick={toggleWordInfoModal}>توضیح بیشتر</PrimaryButton>
      </div>

      {/* Sentence Box */}
      <div className="my-6 py-4 border-t border-b border-gray300">
        <div className="text-sm text-main text-center dir-ltr sm:text-xs">
          <HighlightWord sentence={item?.text} targetWord={item?.word} />
        </div>
        <div className="text-sm text-gray400 text-center mt-2 sm:text-xs">
          {item?.translation}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col mt-auto">
        <div className="flex items-center justify-center gap-2 text-gray400 text-sm sm:text-xs">
          <Play className="text-gray400" />
          <span>{item?.movie_detail?.title || ""}</span>
        </div>

        <div className="flex justify-center gap-6 mt-6 sm:justify-between sm:gap-4">
          <PrimaryButton
            onClick={() => updateFlashcardHandler(true, true)}
            className="flex-1 bg-green-100 text-green-600 hover:bg-green-200"
          >
            <div className="flex items-center gap-2">
              <CircleCheckedIcon className="w-5 h-5" />
              <span>یاد گرفتم</span>
            </div>
          </PrimaryButton>

          <OutlineButton
            onClick={deleteFlashCard}
            className="border-pink-200 text-pink-400 hover:border-pink-300 hover:text-pink-500"
          >
            <div className="flex items-center gap-2">
              <PinkTrashIcon className="w-5 h-5" />
              <span>حذف</span>
            </div>
          </OutlineButton>
        </div>
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

export default FlashCardDrawerItem;
