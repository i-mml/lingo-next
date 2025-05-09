"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";
import LoginModal from "@/components/modals/LoginModal";
import WaveLoading from "@/components/shared/WaveLoading";
import { useAuth } from "@/hooks/use-auth";
import { useLoginModal } from "@/store/use-login-modal";
import { usePathname,useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {  setCookie } from "cookies-next";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isGuest } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const ztoken = searchParams.get("ZTOKEN");

  useEffect(() => {
    if (ztoken) {
      // Set the zabano-access-token cookie
      setCookie("zabano-access-token", ztoken, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });

      setCookie("zabano-embed", true, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });

      // Remove ZTOKEN from URL and redirect
      const url = new URL(window.location.href);
      url.searchParams.delete("ZTOKEN");
      router.replace(url.pathname + url.search);
    }
  }, [searchParams, router]);

  useEffect(() => {
    if (isGuest && pathname !== "/app/subscriptions" && !ztoken) {
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
