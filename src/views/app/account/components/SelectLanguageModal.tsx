import CustomModal from "@/components/shared/CustomModal";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { availableLanguageAccent } from "../../on-boarding/components/steps/SelectAccent";
import { IAvailableLanguage } from "@/types/on-boarding";
import AvailableLanguageItem from "../../on-boarding/components/AvailableLanguageItem";
import { availableLanguage } from "../../on-boarding/components/steps/SelectLanguage";

const SelectLanguageModal = ({ open, toggleModal, setLanguageData }: any) => {
  const [selected, setSelected] = useState<any>(null);
  const { t: translate } = useTranslation();

  const handleSelect = (e: any) => {
    setSelected(e);
    setLanguageData((prev: any) => ({ ...prev, preferred_language: e }));
    toggleModal();
  };

  return (
    <CustomModal open={open} toggle={toggleModal}>
      <div dir="rtl">
        <div className="select-language-moda-title text-center text-main text-lg font-medium">
          {translate("pages.profile.Select Learning Language")}
        </div>

        <div className="language-level-list w-full md:min-w-[450px] mt-8 flex items-start justify-between flex-wrap">
          {availableLanguage?.map((item: IAvailableLanguage) => (
            <AvailableLanguageItem
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

export default SelectLanguageModal;
