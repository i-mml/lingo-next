import CustomModal from "@/components/shared/CustomModal";
import { availableLevels } from "@/constants/available-levels";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageLevelItem from "../../on-boarding/components/LanguageLevelItem";
import { ILanguageLevel } from "@/types/on-boarding";

const SelectLevelModal = ({ open, toggleModal, setLanguageData }: any) => {
  const [selected, setSelected] = useState<any>(null);
  const { t: translate } = useTranslation();

  const handleSelect = (e: number) => {
    setSelected(e);
    setLanguageData((prev: any) => ({ ...prev, knowledge_level: e }));
    toggleModal();
  };

  return (
    <CustomModal open={open} toggle={toggleModal}>
      <div dir="rtl">
        <div className="select-language-moda-title text-center text-main text-lg font-medium">
          {translate("pages.profile.Select Learning Language")}
        </div>

        <div className="language-level-list w-full md:max-w-[400px] mt-10 mx-auto flex items-start justify-between flex-wrap min-h-[350px] md:min-h-[300px]">
          {availableLevels?.map((item: ILanguageLevel) => (
            <LanguageLevelItem
              item={item}
              selected={selected}
              key={item?.id}
              setSelected={handleSelect}
              isInModal
            />
          ))}
        </div>
      </div>
    </CustomModal>
  );
};

export default SelectLevelModal;
