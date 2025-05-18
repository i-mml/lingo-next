"use client";

import React from "react";
import OutlineButton from "@/components/shared/OutlineButton";
import RemainDate from "./RemainDate";
import { getDayDifference } from "@/utils/get-day-difference";
import PrimaryButton from "@/components/shared/PrimaryButton";
import WaveLoading from "@/components/shared/WaveLoading";
import { getPaymentCurrentSubscription } from "@/api/services/payment";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import moment from "moment-jalaali";
import BackIconComponent from "@/components/shared/BackIconComponent";
import { useRouter } from "next/navigation";

const MySubscription = () => {
  const { whoAmI, whoAmILoading } = useAuth();
  const { t: translate } = useTranslation();
  const router = useRouter();

  const { data: currentSubData, isLoading: currentSubLoading } = useQuery({
    queryKey: ["get-current-sub", whoAmI?.has_subscription],
    queryFn: getPaymentCurrentSubscription,
    enabled: !!whoAmI?.has_subscription,
  });

  if (currentSubLoading || whoAmILoading)
    return (
      <div className="flex items-center justify-center h-full">
        <WaveLoading />
      </div>
    );

  return (
    <section className="bg-backgroundLayout pt-0 py-6 md:pt-6 min-h-[100vh] ">
      <div className="py-8">
        <BackIconComponent
          clickHandler={() => router.push("/app/account")}
          className="mb-5 px-[5%]"
        />
        <div className="profile-content mt-4 bg-backgroundMain w-[91.11%] md:w-[96%] md:min-w-[684px] mx-auto !mb-5 py-4 px-4 md:px-6 rounded-2xl flex items-start gap-[10%] flex-col lg:flex-row">
          {!!currentSubData?.data?.package && (
            <>
              <div className="flex-1 w-full mb-5 lg:mb-0">
                <div className="flex items-center justify-between w-full">
                  <h2 className="page-title text-main text-base md:text-lg font-semibold">
                    {translate("pages.profile.Subscription Information")}
                  </h2>

                  <Link href="/app/subscriptions">
                    <PrimaryButton className="min-w-[35%] lg:min-w-[140px] !mb-0">
                      خرید اشتراک
                    </PrimaryButton>
                  </Link>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <div className="text-gray400 text-sm">
                    {translate("pages.profile.Subscription Type")}:
                  </div>
                  <div className="text-main text-[16px] md:text-lg ">
                    اشتراک {currentSubData?.data?.package?.title}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-5">
                  <div className="text-gray400 text-sm">
                    {translate("pages.profile.Subscription Whole Duration")}:
                  </div>
                  <div className="text-main text-[16px] md:text-lg ">
                    {currentSubData?.data?.package?.duration} روز
                  </div>
                </div>

                <div className="flex items-center justify-between mt-5">
                  <div className="text-gray400 text-sm">تاریخ شروع:</div>
                  <div className="text-main text-[16px] md:text-lg ">
                    {moment(currentSubData?.data?.start_date).format(
                      "jYYYY/jMM/jDD"
                    )}
                  </div>
                </div>
                <Link
                  href="/app/account/transactions"
                  className="block w-full mt-5"
                >
                  <OutlineButton className="block w-full max-w-[500px] md:max-w-[140px] mr-auto lg:min-w-[140px]">
                    تراکنش‌ها
                  </OutlineButton>
                </Link>
              </div>

              <RemainDate
                remainDay={getDayDifference(currentSubData?.data?.end_date)}
                wholePeriod={currentSubData?.data?.package?.duration}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default MySubscription;
