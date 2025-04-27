"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import WaveLoading from "@/components/shared/WaveLoading";
import { useAuth } from "@/hooks/use-auth";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isGuest } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isGuest) {
      router.push("/public/catalog");
      toast.info("برای دسترسی به این صفحه باید وارد حساب کاربری خود شوید");
    }
  }, [isGuest]);

  if (isGuest) {
    return (
      <>
        <WaveLoading />
      </>
    );
  }
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
