"use client";

import { GetAuthActivityHistory } from "@/api/services/auth";
import { getPaymentCurrentSubscription } from "@/api/services/payment";
import WaveLoading from "@/components/shared/WaveLoading";
import { useAuth } from "@/hooks/use-auth";
import SettingsIcon from "@mui/icons-material/Settings";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import moment from "moment-jalaali";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import StreakLineal from "@/assets/lotties/streak.json";
import UserLottie from "@/assets/lotties/user_lineal.json";
import TabsWithBorder from "@/components/shared/TabsWithBorder";
import UserActivityCalendar from "./components/UserActivityCalendar";
import UserActivityBarChart from "./components/UserActivityBarChart";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Link from "next/link";
import OutlineButton from "@/components/shared/OutlineButton";
import RemainDate from "./components/RemainDate";
import { getDayDifference } from "@/utils/get-day-difference";
import UserInformationForm from "./components/UserInformationForm";

moment.loadPersian();

const AccountView = () => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const { whoAmI, whoAmILoading } = useAuth();

  const [currentTab, setCurrentTab] = useState(1);

  const { data: activityData } = useQuery({
    queryKey: ["get-activity-history"],
    queryFn: GetAuthActivityHistory,
  });
  const { data: currentSubData, isLoading: currentSubLoading } = useQuery({
    queryKey: ["get-current-sub", whoAmI?.has_subscription],
    queryFn: getPaymentCurrentSubscription,
    enabled: !!whoAmI?.has_subscription && currentTab === 2,
  });

  const redirectToSettings = () => {
    router.push("/app/settings");
  };

  const tabs = [
    { id: 1, title: "آمار فعالیت من", component: "ACTIVITY", hide: false },
    {
      id: 2,
      title: "اشتراک من",
      component: "ACTIVITY",
      hide: !whoAmI?.has_subscription,
    },
    { id: 3, title: "اطلاعات حساب", component: "ACTIVITY", hide: false },
  ];

  if (!whoAmI && whoAmILoading) {
    return (
      <div className="h-[75vh] w-full flex items-center justify-center">
        <WaveLoading />
      </div>
    );
  }
  return (
    <section className="bg-backgroundLayout pt-0 py-6 md:pt-6 ">
      <div className="flex items-center justify-between mb-0 lg:mb-5 px-[5%] pt-8 lg:pt-3">
        <div className="flex items-center gap-4 !justify-start">
          <Lottie
            animationData={UserLottie}
            className="w-16 h-16 lg:w-20 lg:h-20"
          />
          <h1 className="text-lg lg:text-3xl font-bold text-main">
            مدیریت حساب
          </h1>
        </div>

        <div
          className="flex items-center gap-2 justify-center cursor-pointer"
          onClick={redirectToSettings}
        >
          <SettingsIcon className="text-primary" />
          <div className="text-primary font-bold">تنظیمات</div>
        </div>
      </div>

      <TabsWithBorder
        activeTab={currentTab}
        onTabClick={setCurrentTab}
        tabList={tabs}
      />
      {currentTab === 1 && (
        <div className="profile-content mt-4 bg-backgroundMain w-[91.11%] md:w-[96%] md:min-w-[684px] mx-auto !mb-5 py-4 px-4 md:px-6 rounded-2xl">
          <h2 className="page-title text-main text-base md:text-lg font-semibold">
            فعالیت من
          </h2>
          <div className="flex items-start gap-5 md:gap-8 flex-col md:flex-row">
            <div className="w-full md:w-[20%]">
              <div className="flex items-center justify-between text-main gap-3 bg-backgroundMain my-3">
                <div className="text-[16px] md:text-lg text-gray400">
                  فعالیت پی‌در‌پی:
                </div>
                <div className="flex items-center">
                  <div className="text-xl lg:text-2xl font-medium">
                    {activityData?.current_streak} روز
                  </div>
                  <Lottie
                    animationData={StreakLineal}
                    className="w-12 h-12 lg:w-[64px] lg:h-[64px]"
                  />
                </div>
              </div>

              <div className="w-full flex-1">
                <div className="w-full rounded-lg border border-borderMain bg-backgroundMain py-2 px-3  flex items-center gap-3">
                  <span className="text-[#e5e7eb] text-[16px] md:text-lg font-semibold">{`${activityData?.current_streak}/${activityData?.max_streak}`}</span>

                  <div
                    className="bg-[#262626] h-2 rounded-full w-full"
                    dir="ltr"
                  >
                    <span
                      className="block bg-[#e28f00] h-2 rounded-full"
                      style={{
                        width: `${
                          (activityData?.current_streak /
                            activityData?.max_streak) *
                          100
                        }%`,
                      }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
            <UserActivityCalendar userActivities={activityData} />
            {activityData?.history?.length > 0 && (
              <UserActivityBarChart userActivities={activityData?.history} />
            )}
          </div>
        </div>
      )}

      {!!whoAmI?.has_subscription && currentTab === 2 && (
        <div className="profile-content mt-4 bg-backgroundMain w-[91.11%] md:w-[96%] md:min-w-[684px] mx-auto !mb-5 py-4 px-4 md:px-6 rounded-2xl flex items-start gap-[10%] flex-col lg:flex-row">
          {currentSubLoading ? (
            <WaveLoading />
          ) : (
            !!currentSubData?.data?.package && (
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
            )
          )}
        </div>
      )}
      {currentTab === 3 && <UserInformationForm userData={whoAmI} />}
    </section>
  );
};

export default AccountView;
