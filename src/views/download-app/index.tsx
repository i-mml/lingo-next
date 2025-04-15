"use client";

import OutlineButton from "@/components/shared/OutlineButton";
import TabsWithBorder from "@/components/shared/TabsWithBorder";
import AdbIcon from "@mui/icons-material/Adb";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple"; 
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import IosShareIcon from "@mui/icons-material/IosShare";
import { isIOS, isMobile } from "react-device-detect";
import clsx from "clsx";
import Image from "next/image";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

const DownloadAppView = () => {
  const { t: translate } = useTranslation();

  const [currentTab, setCurrentTab] = useState(1);

  const tabsList = [
    {
      id: 1,
      title: translate("pages.downloadApp.Android App"),
      icon: <AndroidIcon />,
    },
    {
      id: 2,
      title: translate("pages.downloadApp.Pwa App"),
      icon: <AppleIcon />,
    },
  ];

  return (
    <div>
      <h1 className="text-main text-xl md:text-3xl px-4 pt-6 pb-4">
        دانلود اپلیکیشن زبانو
      </h1>
      <h2 className="px-4 text-gray400 text-lg md:text-xl mb-6">
        با دانلود اپلیکیشن زبانو تجربه کاربری بهتری را تجربه کنید.
      </h2>
      <TabsWithBorder
        activeTab={currentTab}
        onTabClick={(e) => setCurrentTab(e)}
        tabList={tabsList}
      />
      {currentTab === 1 ? (
        <div className="mt-4 px-[5%] bg-backgroundLayout flex items-center gap-4 flex-wrap md:flex-nowrap">
          <Link
            download
            target="_self"
            href={"https://api.zabano.com/download/android-app/"}
            className="w-full md:w-1/3 block"
          >
            <OutlineButton
              className="flex items-center w-full justify-center gap-4"
              onClick={() => {}}
            >
              <AdbIcon className="text-green-500 text-lg w-10" />
              دانلود مستقیم
            </OutlineButton>
          </Link>
          <OutlineButton
            buttonProps={{ disabled: true }}
            className="flex items-center w-full justify-center gap-4 md:w-1/3"
            onClick={() => {}}
          >
            <img
              alt="bazar"
              src="/images/cafe-bazar.webp"
              className="text-green-500 text-lg w-10"
            />
            دانلود از بازار {"(به زودی)"}
          </OutlineButton>
        </div>
      ) : (
        <div className="px-[5%] bg-backgroundLayout">
          <div
            className={clsx(
              "w-full lg:w-[500px] min-h-[60vh]",
              isIOS && isMobile ? "min-h-[90vh]" : ""
            )}
          >
            <p className="text-center text-main font-medium my-6">
              {"نحوه افزودن زبانو به صفحه اصلی خود."}
            </p>
            {isMobile && isIOS && (
              <>
                <div className="flex items-center gap-4 mb-5">
                  <div className="bg-primary rounded-lg grid place-items-center w-11 h-11">
                    <IosShareIcon className="!text-3xl text-white" />
                  </div>

                  <div className="">
                    <div className="mb-2 font-bold text-lg md:text-xl text-main">
                      Share
                    </div>
                    <div className="text-[16px] md:text-lg text-gray400">
                      این گزینه را از نوارد پایین انتخاب کنید
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="bg-primary rounded-lg grid place-items-center w-11 h-11">
                    <AddBoxOutlinedIcon className="!text-3xl text-white" />
                  </div>

                  <div className="">
                    <div className="mb-2 font-bold text-lg md:text-xl text-main">
                      Add to homescreen
                    </div>
                    <div className="text-[16px] md:text-lg text-gray400">
                      در منوی باز شده این گزینه را انتخاب کنید
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Image
                    width={44}
                    height={44}
                    src="/zabano-main-logo.png"
                    alt="main logo"
                    className="w-11 h-11"
                  />

                  <div className="">
                    <div className="mb-2 font-bold text-lg md:text-xl text-main">
                      Add
                    </div>
                    <div className="text-[16px] md:text-lg text-gray400">
                      در مرحله بعدی روی گزینه Add کلیک کنید
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default DownloadAppView;
