"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import LoginModal from "@/components/modals/LoginModal";
import WaveLoading from "@/components/shared/WaveLoading";
import { useAuth } from "@/hooks/use-auth";
import { useLoginModal } from "@/store/use-login-modal";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isGuest } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (isGuest && pathname !== "/app/subscriptions") {
      toast.info("برای دسترسی به این صفحه باید وارد حساب کاربری خود شوید");
    }
  }, [isGuest, pathname]);

  if (isGuest && pathname !== "/app/subscriptions") {
    return (
      <>
        <WaveLoading />
        <LoginModal open={true} onClose={() => {}} />
      </>
    );
  }
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
