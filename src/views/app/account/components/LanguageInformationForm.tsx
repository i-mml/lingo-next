"use client";

import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { languageLevels } from "@/constants/language-levels";
import { availableLevels } from "@/constants/available-levels";
import AnouncementIcon from "@/assets/anouncement.svg";
import LeadingIcon from "@/assets/leading.svg";
import NewsWorldIcon from "@/assets/news-world.svg";
import { preferred_accent_list } from "@/mock/preferred-accent-list";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostUserPreferences } from "@/api/services/user-preferences";
import OutlineButton from "@/components/shared/OutlineButton";
import ProfileLanguageButton from "./ProfileLanguageButton";
import SelectAccentModal from "./SelectAccentModal";
import SelectLevelModal from "./SelectLevelModal";
import SelectLanguageModal from "./SelectLanguageModal";

const LanguageInformationForm = ({ userPereferenceData }: any) => {
  const { t: translate } = useTranslation();
  const { whoAmI } = useAuth();

  const [openLanguageModal, setOpenLanguageModal] = useState(false);
  const [openAccentModal, setOpenAccentModal] = useState(false);
  const [openLevelModal, setOpenLevelModal] = useState(false);
  const [languageData, setLanguageData] = useState(userPereferenceData);

  const queryClient = useQueryClient();

  const disabledLanguageAction =
    !languageData?.knowledge_level &&
    !languageData?.preferred_language?.id &&
    !languageData?.preferred_accent?.id;

  const userPreferanceMutate = useMutation({
    mutationFn: () =>
      PostUserPreferences({
        preferred_language:
          languageData?.preferred_language?.id ||
          languageData?.preferred_language,
        preferred_accent:
          languageData?.preferred_language?.id === 2
            ? languageData?.preferred_accent?.id ||
              preferred_accent_list?.[languageData?.preferred_accent_display]
            : 1,
        knowledge_level:
          languageData?.knowledge_level ||
          availableLevels?.find(
            (node) =>
              node?.englishLevel === languageData?.knowledge_level_display
          )?.id ||
          "",
      }),

    onSuccess: () => {
      toast.success("ویرایش اطلاعات با موفقیت انجام شد.");
      if (
        whoAmI?.userpreference?.preferred_language !==
        languageData?.preferred_language?.id
      ) {
        queryClient.invalidateQueries();
        queryClient.removeQueries();
      }
    },
  });

  const toggleLanguageModal = () => {
    setOpenLanguageModal((prev) => !prev);
  };
  const toggleAccentModal = () => {
    setOpenAccentModal((prev) => !prev);
  };
  const toggleLevelModal = () => {
    setOpenLevelModal((prev) => !prev);
  };

  return (
    <div className="profile-content mt-4 bg-backgroundMain w-[91.11%] md:w-[96%] md:min-w-[684px] mx-auto !mb-5 py-4 px-4 md:px-6 rounded-2xl">
      <div className="flex-title flex items-center justify-between mb-4 md:mb-6 w-full">
        <h2 className="page-title text-main text-base md:text-lg font-semibold">
          {translate("pages.profile.Learning Language Info")}
        </h2>
        <OutlineButton
          className="save-change-button hidden md:block text-center text-sm font-semibold leading-4 py-3 px-5 rounded-xl disabled:!text-[#525252] !border-[#525252] border-primary w-[130px]"
          buttonProps={{
            disabled: disabledLanguageAction,
          }}
          onClick={() => userPreferanceMutate.mutate()}
        >
          {translate("pages.profile.Save Changes")}
        </OutlineButton>
      </div>

      <div className="input-box w-full mt-6">
        <div className="input-label text-gray400 text-xs font-medium mb-2">
          {translate("pages.profile.Learning Language")}
        </div>
        <ProfileLanguageButton
          icon={<NewsWorldIcon />}
          onClick={toggleLanguageModal}
          value={
            languageData?.preferred_language?.name ||
            userPereferenceData?.preferred_language_display?.name
          }
        />
      </div>
      {!languageData?.preferred_language?.id ? (
        whoAmI?.userpreference?.preferred_language === 2 ? (
          <div className="input-box w-full mt-6">
            <div className="input-label disabled-label text-gray400 text-xs font-medium mb-2">
              {translate("pages.profile.Accent")}
            </div>
            <ProfileLanguageButton
              icon={<AnouncementIcon />}
              value={
                languageData?.preferred_accent?.name ||
                userPereferenceData?.preferred_accent_display ||
                1
              }
              onClick={toggleAccentModal}
            />
          </div>
        ) : null
      ) : (
        languageData?.preferred_language?.id === 2 && (
          <div className="input-box w-full mt-6">
            <div className="input-label disabled-label text-gray400 text-xs font-medium mb-2">
              {translate("pages.profile.Accent")}
            </div>
            <ProfileLanguageButton
              icon={<AnouncementIcon />}
              value={
                languageData?.preferred_accent?.name ||
                userPereferenceData?.preferred_accent_display ||
                1
              }
              onClick={toggleAccentModal}
            />
          </div>
        )
      )}
      <div className="input-box w-full mt-6">
        <div className="input-label disabled-label text-gray400 text-xs font-medium mb-2">
          {translate("pages.profile.My Language Level")}
        </div>
        <ProfileLanguageButton
          icon={<LeadingIcon />}
          value={
            languageLevels?.[languageData?.knowledge_level]?.standart_level ||
            userPereferenceData?.knowledge_level_display
          }
          onClick={toggleLevelModal}
        />
      </div>
      <OutlineButton
        className="mobile-save-change-button md:hidden block mt-8 text-center text-sm font-semibold leading-4 py-3 px-5 disabled:!text-[#525252] !border-[#525252] border-primary w-full md:w-[130px]"
        buttonProps={{
          disabled: disabledLanguageAction,
        }}
        onClick={() => userPreferanceMutate.mutate()}
      >
        {translate("pages.profile.Save Changes")}
      </OutlineButton>
      {openLanguageModal && (
        <SelectLanguageModal
          open={openLanguageModal}
          toggleModal={toggleLanguageModal}
          setLanguageData={setLanguageData}
        />
      )}
      {openLevelModal && (
        <SelectLevelModal
          open={openLevelModal}
          toggleModal={toggleLevelModal}
          setLanguageData={setLanguageData}
        />
      )}
      {openAccentModal && (
        <SelectAccentModal
          open={openAccentModal}
          toggleModal={toggleAccentModal}
          setLanguageData={setLanguageData}
        />
      )}
    </div>
  );
};

export default LanguageInformationForm;
