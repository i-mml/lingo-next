"use client";

import React, { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import AppHeader from "./components/AppHeader";
import { isMobile } from "react-device-detect";
import { usePathname } from "next/navigation";
import LoginModal from "@/components/modals/LoginModal";
import { useLoginModal } from "@/store/use-login-modal";
import dynamic from "next/dynamic";

// Dynamically import the PWA install prompt component to avoid SSR issues
const PWAInstallPrompt = dynamic(
  () => import("@/components/PWAInstallPrompt"),
  {
    ssr: false,
  }
);

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { isOpen, toggleLoginModal } = useLoginModal();

  const noHeaderRoutes = ["/quiz", `app/on-boarding`];
  const noLayoutRotes = [!isMobile && "video-info", "/show/", "/on-boarding"];

  const includesNoHeaderRotes = (pathname: string, strings: string[]) => {
    return strings.some((string) => pathname.includes(string));
  };

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
      <PWAInstallPrompt />
    </div>
  );
};

export default DashboardLayout;
