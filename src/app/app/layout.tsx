"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import LoginModal from "@/components/modals/LoginModal";
import WaveLoading from "@/components/shared/WaveLoading";
import { useAuth } from "@/hooks/use-auth";
import { useLoginModal } from "@/store/use-login-modal";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isGuest } = useAuth();

  useEffect(() => {
    if (isGuest) {
      // router.push("/public/catalog");
      toast.info("برای دسترسی به این صفحه باید وارد حساب کاربری خود شوید");
    }
  }, [isGuest]);

  if (isGuest) {
    return (
      <>
        <WaveLoading />
        {isGuest && <LoginModal open={true} onClose={() => {}} />}
      </>
    );
  }
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
