"use client";

import BackIconComponent from "@/components/shared/BackIconComponent";
import { useAuth } from "@/hooks/use-auth";
import useThemeCreator from "@/hooks/use-theme";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useRouter } from "next/navigation";
import React from "react";

const InviteFriends = () => {
  const { theme } = useThemeCreator();
  const { whoAmI } = useAuth();
  const router = useRouter();

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(
        whoAmI?.referral_info?.referral_code || ""
      );
    } catch (err) {
      console.error("Error copying text: ", err);
    }
  };

  return (
    <section className="bg-backgroundLayout pt-0 py-6 md:pt-6 min-h-[100vh] ">
      <div className="pt-10 md:pt-2">
        <BackIconComponent
          clickHandler={() => router.push("/app/account")}
          className="mb-5 px-[5%]"
        />

        <div>
          <div className="flex items-center justify-between gap-4 w-[90%] mx-auto py-4 px-[5%] rounded-lg border border-dotted border-gray400">
            <span className="text-main font-semibold text-lg lg:text-xl">
              کد معرف من:
            </span>
            <div
              className="p-2 px-4 rounded-full cards-md-box-shadow flex items-center gap-6 cursor-pointer"
              onClick={handleCopyText}
            >
              <ContentCopyIcon
                style={{ color: theme.palette.text.primary, fontSize: 28 }}
              />
              <span className="text-primary text-xl lg:text-2xl font-bold">
                {whoAmI?.referral_info?.referral_code}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InviteFriends;
