"use client";

import WaveLoading from "@/components/shared/WaveLoading";
import { useAuth } from "@/hooks/use-auth";
import Lottie from "lottie-react";
import React, { useState } from "react";
import UserLottie from "@/assets/lotties/user_lineal.json";
import moment from "moment-jalaali";
import SettingsItem from "./components/SettingsItem";
import LogoutModal from "@/components/modals/LogoutModal";
import { Logout } from "@mui/icons-material";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";

moment.loadPersian();

const AccountView = () => {
  const { whoAmI, whoAmILoading } = useAuth();
  const [open, setOpen] = useState(false);
  const { t: translate } = useTranslation();

  const settingsList = [
    {
      id: 1,
      title: "حساب کاربری",
      link: "/app/account/change-profile-information",
      icon: "/images/settings/settings-edit-profile.png",
      hide: false,
    },
    {
      id: 2,
      title: "اشتراک من",
      link: "/app/account/my-subscription",
      icon: "/images/settings/settings-money-bag.svg",
      hide: !whoAmI?.has_subscription,
    },
    {
      id: 3,
      title: "آمار فعالیت من",
      link: "/app/account/my-activity",
      icon: "/images/settings/settings-my-activity.svg",
      hide: false,
    },
    {
      id: 4,
      title: "تغییر زبان",
      link: "/app/account/select-language",
      icon: "/images/settings/settings-languages.png",
      hide: false,
    },
    {
      id: 5,
      title: "مدیریت رمز عبور",
      link: "/app/account/password-management",
      icon: "/images/settings/settings-lock.svg",
      hide: false,
    },

    {
      id: 6,
      title: "دعوت از دوستان",
      link: "/app/account/add-friends",
      icon: "/images/settings/settings-add-friends.png",
      hide: false,
    },
    {
      id: 7,
      title: "سوالات متداول و نحوه استفاده",
      link: "/public/how-to-use",
      icon: "/images/settings/settings-chat.png",
      hide: false,
    },
  ];

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  if (!whoAmI && whoAmILoading) {
    return (
      <div className="h-[75vh] w-full flex items-center justify-center">
        <WaveLoading />
      </div>
    );
  }
  return (
    <section className="bg-backgroundLayout pt-4 py-6 md:pt-6 min-h-[100vh] ">
      <div className="flex items-center justify-between mb-5 md:mb-3 px-[5%] pt-3 md:pt-8">
        <div className="flex items-center gap-4 !justify-start">
          <Lottie
            animationData={UserLottie}
            className="w-16 h-16 lg:w-20 lg:h-20"
          />
          <h1 className="text-lg lg:text-3xl font-bold text-main">
            مدیریت حساب
          </h1>
        </div>
        <div
          className="flex items-center gap-2 justify-center cursor-pointer"
          onClick={toggle}
        >
          <Logout className="!text-red-600 text-2xl" />
          <div className="text-red-600 font-bold">
            {translate(
              isMobile
                ? "containers.sidebar.Logout"
                : "containers.sidebar.Logout Of Account"
            )}
          </div>
        </div>
      </div>
      <div className="px-[5%] max-w-md md:max-w-xl mx-auto">
        {settingsList
          .filter((item) => !item?.hide)
          .map((item) => (
            <SettingsItem {...item} key={item?.id} />
          ))}
      </div>

      {open && <LogoutModal onClose={toggle} open={open} />}
    </section>
  );
};

export default AccountView;
