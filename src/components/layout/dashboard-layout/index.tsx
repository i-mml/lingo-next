"use client";

import React, { ReactNode, useEffect, useMemo, useState } from "react";
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
import BottomNavigation from "@/components/shared/BottomNavigation";

const NO_HEADER_ROUTES = ["/quiz", "app/on-boarding"];
const NO_LAYOUT_PATTERNS = [
  "video-info",
  "/show/",
  "/on-boarding",
  "/app/units/",
  "/app/activities/",
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { isOpen, toggleLoginModal } = useLoginModal();
  const [showDeviceBrowserModal, setShowDeviceBrowserModal] = useState(false);
  const zabanoNoHeader = getCookie("zabano-embed");

  const shouldSkipHeader = useMemo(
    () => NO_HEADER_ROUTES.some((r) => pathname.includes(r)),
    [pathname]
  );

  const shouldSkipLayout = useMemo(() => {
    return (
      NO_LAYOUT_PATTERNS.some((pattern) => {
        if (typeof pattern === "string") {
          return pathname.includes(pattern);
        }
        return false;
      }) ||
      (!isMobile && pathname.includes("video-info"))
    );
  }, [pathname]);

  const toggleDeviceBrowserModal = () => {
    setCookie("zabano-browser-suggest-modal", "true");
    setShowDeviceBrowserModal((prev) => !prev);
  };

  useEffect(() => {
    const isInstagramBrowser = /Instagram/.test(navigator?.userAgent);
    const seenModal = getCookie("zabano-browser-suggest-modal");

    if (isInstagramBrowser && !seenModal) {
      toggleDeviceBrowserModal();
    }
  }, []);

  if (shouldSkipLayout) {
    return <div className="w-full overflow-hidden">{children}</div>;
  }
  return (
    <div className="flex items-start bg-backgroundLayout">
      {!zabanoNoHeader && <Sidebar />}

      <div className="w-full flex-1 md:w-[calc(100%-200px)] relative md:pb-10">
        {!shouldSkipHeader && !zabanoNoHeader && <AppHeader />}

        <div
          className={
            shouldSkipHeader || zabanoNoHeader ? "pb-12" : "pt-24 pb-12"
          }
        >
          {children}
        </div>

        {!zabanoNoHeader && <BottomNavigation />}
      </div>

      {/* Global modals and helpers */}
      {isOpen && <LoginModal open={isOpen} onClose={toggleLoginModal} />}
      <PlatformModal />
      <IosNotificationAccessModal />
      <ActiveUserTracker />

      {showDeviceBrowserModal && (
        <DeviceBrowserModal
          open={showDeviceBrowserModal}
          toggleModal={toggleDeviceBrowserModal}
          page="ROOT"
        />
      )}
    </div>
  );
};

export default DashboardLayout;
