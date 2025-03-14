"use client";

import React, { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import AppHeader from "./components/AppHeader";
import { isMobile } from "react-device-detect";
import { usePathname } from "next/navigation";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const noHeaderRoutes = ["/quiz", `app/on-boarding`];
  const includesNoHeaderRotes = (pathname: string, strings: string[]) => {
    return strings.some((string) => pathname.includes(string));
  };

  return (
    <div className="flex items-start bg-backgroundLayout">
      <Sidebar />

      <div className="w-full flex-1 md:w-[calc(100%-210px)] relative pb-10">
        {!includesNoHeaderRotes(pathname, noHeaderRoutes) && <AppHeader />}

        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
