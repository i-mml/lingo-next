"use client";

import AdbIcon from "@mui/icons-material/Adb";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IosShareIcon from "@mui/icons-material/IosShare";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { isIOS, isMobile } from "react-device-detect";
import CustomModal from "../shared/CustomModal";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "../shared/PrimaryButton";
import OutlineButton from "../shared/OutlineButton";

const PlatformModal = () => {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const isPwa = window.matchMedia("(display-mode: standalone)").matches;
    const hasSeenModal = localStorage.getItem("hasSeenPlatformModal");
    const isInPUblicPages = pathname.includes("/public/");
    const isInApplication = pathname.includes("/application");

    if (
      !hasSeenModal &&
      isMobile &&
      !isPwa &&
      isInPUblicPages &&
      !isInApplication
    ) {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
    }
  }, [pathname]);

  const closeModal = () => {
    localStorage.setItem("hasSeenPlatformModal", "true");
    setShowModal(false);
  };

  return (
    <CustomModal open={showModal} toggle={closeModal}>
      <div
        className={clsx(
          "w-full lg:w-[500px] min-h-[60vh]",
          isIOS && isMobile ? "min-h-[90vh]" : ""
        )}
      >
        <Image
          width={80}
          height={80}
          src="/zabano-main-logo.png"
          alt="main logo"
          className="w-20 h-20 mx-auto mt-5 mb-8 shadow-lg shadow-primary rounded-lg"
        />
        <h2 className="text-main text-xl md:text-2xl text-center font-semibold mb-3">
          {isMobile && isIOS ? "وب‌اپلیکیشن زبانو" : "اپلیکیشن اندروید زبانو"}
        </h2>
        <p className="text-center text-primary font-medium mb-6">
          {isMobile && isIOS
            ? "با این 3 اقدام زبانو را به صفحه اصلی خود اضافه کنید."
            : "برای تجربه کاربری بهتر، حتما اپلیکیشن اندروید زبانو را نصب کنید. "}
        </p>
        {isMobile && isIOS ? (
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
        ) : (
          <>
            <div className="text-[16px] md:text-lg mb-4 text-main">
              جهت دانلود روی دکمه زیر کلیک کنید.
            </div>
            <Link
              download
              target="_self"
              href={"https://api.zabano.com/download/android-app/"}
              className="w-full md:w-1/3 block"
            >
              <PrimaryButton
                className="flex items-center w-full justify-center gap-2"
                onClick={() => {}}
              >
                <AdbIcon className="text-green-500 !text-3xl" />
                دانلود مستقیم
              </PrimaryButton>
            </Link>
          </>
        )}

        <OutlineButton className="w-full mt-20" onClick={closeModal}>
          بستن
        </OutlineButton>
      </div>
    </CustomModal>
  );
};

export default PlatformModal;
