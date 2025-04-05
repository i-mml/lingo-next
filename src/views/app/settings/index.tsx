import Lottie from "lottie-react";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import SettingsLottie from "@/assets/lotties/settings-lineal.json";
import SettingsItem from "./components/SettingsItem";
import { useRouter } from "next/navigation";
import BackIconComponent from "@/components/shared/BackIconComponent";
import { Logout } from "@mui/icons-material";
import LogoutModal from "@/components/modals/LogoutModal";

const SettingsView = () => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const [open, setOpen] = useState(false);

  const settingsList = [
    {
      id: 1,
      title: "ویرایش حساب کاربری",
      link: "/app/settings/change-profile-information",
      icon: "/images/settings/settings-edit-profile.png",
    },
    {
      id: 2,
      title: "مدیریت رمز عبور",
      link: "/app/settings/password-management",
      icon: "/images/settings/settings-lock.svg",
    },
    {
      id: 3,
      title: "انتخاب زبان",
      link: "/app/settings/select-language",
      icon: "/images/settings/settings-languages.png",
    },
    {
      id: 4,
      title: "دعوت از دوستان",
      link: "/app/settings/add-friends",
      icon: "/images/settings/settings-add-friends.png",
    },
    {
      id: 5,
      title: "سوالات متداول و نحوه استفاده",
      link: "/public/how-to-use",
      icon: "/images/settings/settings-chat.png",
    },
  ];

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="grid place-items-center py-4 md:py-6 px-[5%]">
      <div className="flex items-center justify-start w-full">
        <BackIconComponent
          clickHandler={() => router.push("/app/account")}
          className="back-icon !flex-row-reverse !ml-0 !pb-0"
        />
      </div>
      <div className="flex items-center !justify-between w-full">
        <div className="flex items-center gap-2">
          <Lottie
            animationData={SettingsLottie}
            className="w-16 h-16 lg:w-20 lg:h-20"
          />
          <h1 className="text-xl lg:text-3xl font-bold text-main">
            تنظیمات کاربری
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
      {settingsList.map((item) => (
        <SettingsItem {...item} key={item?.id} />
      ))}

      {open && <LogoutModal onClose={toggle} open={open} />}
    </div>
  );
};

export default SettingsView;
