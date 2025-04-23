"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import AppHeader from "./components/AppHeader";
import { isMobile } from "react-device-detect";
import { usePathname } from "next/navigation";
import LoginModal from "@/components/modals/LoginModal";
import { useLoginModal } from "@/store/use-login-modal";
import ActiveUserTracker from "@/components/providers/ActivityTracker";
import PlatformModal from "@/components/modals/PlatformModal";
import IosNotificationAccessModal from "@/components/modals/IosNotificationAccessModal";
import DeviceBrowserModal from "@/components/modals/DeviceBrowserModal";
import { getCookie, setCookie } from "cookies-next";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { isOpen, toggleLoginModal } = useLoginModal();
  const [deviceBrowserModal, setDeviceBrowserModal] = useState(false);

  const noHeaderRoutes = ["/quiz", `app/on-boarding`];
  const noLayoutRotes = [!isMobile && "video-info", "/show/", "/on-boarding"];

  const includesNoHeaderRotes = (pathname: string, strings: string[]) => {
    return strings.some((string) => pathname.includes(string));
  };

  const toggleDeviceBrowserModal = () => {
    setCookie("zabano-browser-suggest-modal", "true");
    setDeviceBrowserModal((prev) => !prev);
  };

  useEffect(() => {
    const isInstagramInAppBrowser = /Instagram/.test(navigator?.userAgent);
    const isBroswerSuggestSeen = getCookie("zabano-browser-suggest-modal");

    if (isInstagramInAppBrowser && !isBroswerSuggestSeen) {
      toggleDeviceBrowserModal();
    }
  }, []);

  if (!!includesNoHeaderRotes(pathname, noLayoutRotes as string[])) {
    return <div className="w-full overflow-hidden">{children}</div>;
  }
  return (
    <div className="flex items-start bg-backgroundLayout">
      <Sidebar />

      <div className="w-full flex-1 md:w-[calc(100%-200px)] relative md:pb-10">
        {!includesNoHeaderRotes(pathname, noHeaderRoutes) && <AppHeader />}
        <div
          className={
            !includesNoHeaderRotes(pathname, noHeaderRoutes) ? "pt-24" : ""
          }
        >
          {children}
        </div>
      </div>
      {isOpen && <LoginModal open={isOpen} onClose={toggleLoginModal} />}

      {/* helper global components */}
      <PlatformModal />
      <IosNotificationAccessModal />
      <ActiveUserTracker />
      {deviceBrowserModal && (
        <DeviceBrowserModal
          open={deviceBrowserModal}
          toggleModal={toggleDeviceBrowserModal}
          page="ROOT"
        />
      )}
    </div>
  );
};

export default DashboardLayout;
