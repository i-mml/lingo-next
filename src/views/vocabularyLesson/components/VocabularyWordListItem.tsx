"use client";

import { LessonWord } from "@/api/types/education";
import WaveLoading from "@/components/shared/WaveLoading";
import { useTextToAudio } from "@/hooks/use-text-to-audio";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import SpeakerIcon from "@/assets/speaker.svg";
import WordTranslateListItem from "./WordTranslateListItem";
import PrimaryButton from "@/components/shared/PrimaryButton";
import DictionaryModal from "@/components/modals/DictionaryModal";

const VocabularyWordListItem = ({
  index,
  item,
  isBlurred,
}: {
  index: number;
  item: LessonWord;
  isBlurred: boolean;
}) => {
  const { handleTextToSpeech, textToSpeachMutation } = useTextToAudio();
  const [dictionaryModal, setDictionaryModal] = useState(false);
  const [searchedText, setSearchedText] = useState("");

  const onDictionaryClick = (text: string) => {
    setDictionaryModal(true);
    setSearchedText(text);
  };

  return (
    <>
      <Accordion className="w-full !rounded-lg">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className="!rounded-lg [&_.MuiAccordionSummary-expandIconWrapper]:text-gray-400"
        >
          <div
            dir="ltr"
            className="flex items-center justify-between w-full rounded-md px-4 py-3 text-main"
          >
            <div className="flex items-center gap-2">
              <span className="text-main font-medium text-lg lg:text-xl">
                {index + 1}. {item?.text}
              </span>
              <button
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTextToSpeech({ text: item?.text });
                }}
                disabled={
                  textToSpeachMutation?.isLoading &&
                  textToSpeachMutation?.text === item?.text
                }
              >
                {textToSpeachMutation?.isLoading &&
                textToSpeachMutation?.text === item?.text ? (
                  <WaveLoading />
                ) : (
                  <SpeakerIcon />
                )}
              </button>
            </div>
            <WordTranslateListItem
              isBlurred={isBlurred}
              text={item?.persian_translate}
            />
          </div>
        </AccordionSummary>

        <AccordionDetails className="[&_.MuiDivider-root::before]:border-primary [&_.MuiDivider-root::after]:border-primary">
          <PrimaryButton
            className="w-full mr-auto mb-6"
            onClick={() => onDictionaryClick(item?.text)}
          >
            مشاهده در فیلم‌ها
          </PrimaryButton>

          <Divider className="text-primary" textAlign="right">
            Tag
          </Divider>
          <div className="text-right mb-4 pt-1 text-[16px] lg:text-lg text-gray">
            {item?.tag}
          </div>

          <Divider className="text-primary" textAlign="right">
            Definitions
          </Divider>
          {item?.definitions?.length > 0 &&
            item?.definitions?.map((definition, definitionIndex) => (
              <div
                className={`mb-3 ${
                  definition.language === "FA" ? "text-right" : "text-left"
                } px-[5%] rounded-lg py-4 bg-layout w-[100%] mx-auto shadow-md`}
                dir={definition.language === "FA" ? "rtl" : "ltr"}
                key={definitionIndex}
              >
                <div className="text-main text-lg lg:text-[20px] font-medium">
                  {definition?.example}
                </div>
                <div className="text-gray400 text-[16px] lg:text-lg mt-2">
                  {definition?.definition}
                </div>
              </div>
            ))}
        </AccordionDetails>
      </Accordion>
      {dictionaryModal && (
        <DictionaryModal
          searchedText={searchedText}
          open={dictionaryModal}
          toggleModal={() => setDictionaryModal(false)}
          flashCardBody={{
            word: item?.text,
            word_translation: item?.persian_translate,
            word_rel_id: item?.id,
          }}
        />
      )}
    </>
  );
};

export default VocabularyWordListItem;
