"use client";

import { useAuth } from "@/hooks/use-auth";
import LoginView from "@/views/login";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const { isGuest } = useAuth();

  useEffect(() => {
    if (!isGuest) {
      toast.warning("شما قبلا وارد حساب کاربری خود شدید");
      router.push("/public/home");
    }
  }, [isGuest]);

  return (
    <div className="min-h-[100vh] bg-backgroundLayout grid place-items-center">
      <LoginView />
    </div>
  );
};

export default LoginPage;
