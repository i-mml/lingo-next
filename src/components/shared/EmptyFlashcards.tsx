"use client";

import React from "react";
import EmptyFlashcardIcon from "@/assets/empty-flashcards.svg";
import { useTranslation } from "react-i18next";

const EmptyFlashcards = ({
  customTitle,
  hasDesc = true,
  customDesc,
}: {
  customTitle?: string;
  hasDesc?: boolean;
  customDesc?: string;
}) => {
  const { t: translate } = useTranslation();
  return (
    <div className="h-[calc(100vh-110px)] md:h-[calc(100vh-96px-96px)] w-full grid place-items-center ">
      <div className="grid place-items-center w-[91%] md:w-[55%] text-main ">
        <EmptyFlashcardIcon className="w-60 lg:w-80" />
        <div className="text-lg font-medium leading-5 mt-10 text-gray400">
          {customTitle || translate("pages.review.empty.title")}
        </div>
        {hasDesc && (
          <div className="mt-6 text-[16px] max-w-[450px] text-center text-gray400 leading-8">
            {customDesc || translate("pages.review.empty.description")}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyFlashcards;
