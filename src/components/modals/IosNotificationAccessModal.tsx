import useThemeCreator from "@/hooks/use-theme";
import NotificationsIcon from "@mui/icons-material/Notifications";
import clsx from "clsx";
import Lottie from "lottie-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { isIOS, isMobile } from "react-device-detect";
import CustomModal from "../shared/CustomModal";
import Messaging from "@/assets/lotties/messaging-linear.json";
import { requestForToken } from "@/app/firebase";
import OutlineButton from "../shared/OutlineButton";

const IosNotificationAccessModal = () => {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const { theme }: any = useThemeCreator();

  useEffect(() => {
    const isPwa = window.matchMedia("(display-mode: standalone)").matches;
    const hasSeenModal = localStorage.getItem("hasSeenIosAccessNotification");
    const isInPUblicPages = location.pathname.includes("/public/");
    const isInApplication = location.pathname.includes("/application");

    if (
      !hasSeenModal &&
      isMobile &&
      isIOS &&
      isPwa &&
      isInPUblicPages &&
      !isInApplication
    ) {
      setTimeout(() => {
        setShowModal(true);
      }, 2000);
    }
  }, [location.pathname]);

  const closeModal = () => {
    localStorage.setItem("hasSeenIosAccessNotification", "true");
    setShowModal(false);
  };

  return (
    <CustomModal open={showModal} toggle={closeModal}>
      <div className={clsx("w-full lg:w-[500px] min-h-[60vh]")}>
        <div className="earth-icon">
          <Lottie
            animationData={Messaging}
            className="w-20 h-20 lg:w-22 lg:h-22 mx-auto"
          />
        </div>
        <div className="mt-4 w-[90%] mx-auto text-lg font-medium text-main">
          با دسترسی به نوتیفیکیشن، کلی{" "}
          <span className="text-primary font-bold">کد تخفیف</span> جدید رو
          دریافت میکنی و در کنارش بهت یادآوری میکنم تا{" "}
          <span className="text-primary font-bold">مستمر</span> تمرین کنی.
        </div>
        <div className="mt-6 text-[16px] font-medium w-[90%] mx-auto text-main">
          حالا دکمه Allow رو بزن
        </div>

        <div
          className="border border-gray-600 shadow-md shadow-gray-500 w-[90%] max-w-[360px] mx-auto rounded-lg py-4 px-5 mt-4 mb-6"
          dir="ltr"
        >
          <div className="text-main font-medium text-[16px] lg:text-lg text-left">
            www.zabano.com wants to
          </div>
          <div className="flex items-center gap-2 !justify-start">
            <NotificationsIcon style={{ color: theme.palette.text.main }} />{" "}
            <div className="text-left text-main text-[16px] lg:text-lg">
              Show notifications
            </div>
          </div>
          <div className="w-full flex items-center !justify-end gap-3 mt-3">
            <button
              className="text-primary border border-gray-500 text-[16px] lg:text-lg font-bold rounded-md p-3"
              onClick={requestForToken}
            >
              ALLOW
            </button>
          </div>
        </div>

        <OutlineButton
          onClick={closeModal}
          className="!w-full mx-auto block mt-14"
        >
          بستن
        </OutlineButton>
      </div>
    </CustomModal>
  );
};

export default IosNotificationAccessModal;
