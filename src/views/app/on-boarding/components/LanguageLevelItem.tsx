import React from "react";

import LanguageLevelBorderIcon from "@/assets/language-level-border.svg";
import { ILanguageLevel } from "@/types/on-boarding";

interface IProps {
  item: ILanguageLevel;
  selected: number;
  setSelected: (e: number) => void;
  isInModal?: boolean;
}

const LanguageLevelItem = (props: IProps) => {
  const { item, selected, setSelected, isInModal } = props;
  return (
    <div
      className={`language-item py-[14px] rounded-lg border border-borderMain bg-transparent grid place-items-center w-[45%] md:w-[28.9%] mb-6 cursor-pointer hover:border-gray400 ${
        item?.disabled && "disabled-language brightness-50 cursor-not-allowed"
      } ${selected === item?.id && "selected-language bg-[#3a3a3a]"} ${
        isInModal ? "!w-[47%] p-[17px] flex items-center justify-start" : ""
      }`}
      key={item?.id}
      onClick={!item?.disabled ? () => setSelected(item?.id) : () => {}}
    >
      <div className="language-level text-[#f9fafb] text-base font-medium border-l border-borderMain md:border-l-0 pl-3 md:pl-0 ml-[11px] md:ml-0">
        {item?.englishLevel}
      </div>
      <div className="border-image hidden md:flex justify-center w-full overflow-hidden my-3">
        <LanguageLevelBorderIcon />
      </div>
      <div className={`level-translated text-gray400 text-sm`}>
        {item?.translatedLevel}
      </div>
    </div>
  );
};

export default LanguageLevelItem;
