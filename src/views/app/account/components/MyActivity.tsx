"use client";
import React from "react";
import UserActivityCalendar from "./UserActivityCalendar";
import UserActivityBarChart from "./UserActivityBarChart";
import StreakLineal from "@/assets/lotties/streak.json";
import Lottie from "lottie-react";
import { GetAuthActivityHistory } from "@/api/services/auth";
import { useQuery } from "@tanstack/react-query";
import moment from "moment-jalaali";
import { useRouter } from "next/navigation";
import BackIconComponent from "@/components/shared/BackIconComponent";

const MyActivity = () => {
  const { data: activityData } = useQuery({
    queryKey: ["get-activity-history"],
    queryFn: GetAuthActivityHistory,
  });
  const router = useRouter();

  return (
    <section className="bg-backgroundLayout pt-0 py-6 md:pt-6 min-h-[100vh] ">
      <div className="py-8">
        <BackIconComponent
          clickHandler={() => router.push("/app/account")}
          className="mb-5 px-[5%]"
        />
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
      </div>
    </section>
  );
};

export default MyActivity;
