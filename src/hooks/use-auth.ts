"use client";

import { getAuthWhoAmI } from "@/api/services/auth";
import { useUserInfo } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface PreferredLanguageDisplay {
  name: string;
  code: string;
  icon: string;
}

interface UserPreference {
  preferred_language: number;
  preferred_accent: number;
  daily_goal: number;
  knowledge_level: number;
  preferred_accent_display: string;
  knowledge_level_display: string;
  preferred_language_display: PreferredLanguageDisplay;
}

interface Discount {
  code: string;
  amount: number | null;
  percentage: number;
  package: number;
  is_active: boolean;
}

interface ReferralInfo {
  referral_code: string;
  discount: Discount;
  referred_count: number;
  referred_users: any[];
}

interface WhoAmIResponse {
  phone: string;
  name: string;
  email: string;
  birthday: string;
  channel_info: {
    public_user_channel: string;
    token: string;
  };
  userpreference?: UserPreference;
  total_score: number;
  has_subscription: boolean;
  is_compeleted: boolean;
  referral_info: ReferralInfo;
}

export const useAuth = () => {
  const userToken = getCookie("zabano-access-token");
  const isGuest: boolean = !userToken || userToken === "";
  const { updateUser } = useUserInfo();
  const router = useRouter();
  const pathName = usePathname();

  const { data: whoAmI, isLoading: whoAmILoading } = useQuery<{
    data: WhoAmIResponse;
  }>({
    queryKey: ["get-who-am-i"],
    queryFn: getAuthWhoAmI,
    retryOnMount: true,
    refetchOnMount: true,
    enabled: !isGuest,
  });

  useEffect(() => {
    if (whoAmI && !whoAmI?.data?.userpreference) {
      updateUser({ is_onboard: false });
      router.replace(`/app/on-boarding?rdc=${encodeURIComponent(pathName)}`);
    }
  }, []);

  const hasSubscription: boolean = !isGuest && !!whoAmI?.data?.has_subscription;

  return {
    userToken,
    isGuest,
    whoAmI: whoAmI?.data,
    whoAmILoading,
    hasSubscription,
  };
};
