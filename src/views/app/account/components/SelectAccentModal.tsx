import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { GetUserPreferencesAccents } from "@/api/services/user-preferences";
import CustomModal from "@/components/shared/CustomModal";
import { availableLanguageAccent } from "../../on-boarding/components/steps/SelectAccent";
import AvailableAccentItem from "../../on-boarding/components/AvailableAccentItem";

const SelectAccentModal = ({ open, toggleModal, setLanguageData }: any) => {
  const [selected, setSelected] = useState<any>(null);
  const { t: translate } = useTranslation();

  const handleSelect = (e: any) => {
    setSelected(e);
    setLanguageData((prev: any) => ({ ...prev, preferred_accent: e }));
    toggleModal();
  };

  const { isLoading } = useQuery({
    queryKey: ["get-accents-list"],
    queryFn: () => GetUserPreferencesAccents(2),
  });

  return (
    <CustomModal open={open} toggle={toggleModal}>
      <div>
        <div className="select-language-moda-title text-center text-main text-lg font-medium">
          {translate("pages.profile.Select Language Accent")}
        </div>

        {isLoading ? (
          <CircularProgress className="circular-spinner" />
        ) : (
          <div className="available-accent-list w-full min-h-[350px] md:min-h-60 md:min-w-[450px] mt-8 flex items-stretch justify-between flex-wrap">
            {availableLanguageAccent?.map((item: any) => (
              <AvailableAccentItem
                item={item}
                selected={selected}
                setSelected={handleSelect}
                key={item?.id}
              />
            ))}
          </div>
        )}
      </div>
    </CustomModal>
  );
};

export default SelectAccentModal;
