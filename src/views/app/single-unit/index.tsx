"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getActivitiesByUniId, getUnitById } from "@/api/services/learning";
import { LockIcon, CheckCircle } from "lucide-react";
import Link from "next/link";
import { isMobile } from "react-device-detect";
import { useTheme } from "next-themes";
import SingleUnitSkeleton from "./components/SingleUnitSkeleton";
import { activitiesDictionary } from "@/mock/units";
import IUnitActivity from "@/api/types/learning";
import { ArrowForward } from "@mui/icons-material";

// TODOS =>  /learning/user-activity-progress?activity__unit=5

const SingleUnitView = () => {
  const { unitId } = useParams();
  const { theme: appTheme } = useTheme();

  const { data: activities, isLoading } = useQuery({
    queryKey: ["get-activities-by-unit-id", unitId],
    queryFn: () => getActivitiesByUniId(Number(unitId)),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const { data: unit, isLoading: unitLoading } = useQuery({
    queryKey: ["get-unit-by-id", unitId],
    queryFn: () => getUnitById(Number(unitId)),
  });

  if (isLoading || !activities || unitLoading) return <SingleUnitSkeleton />;

  const isLocked = activities.is_locked;
  const activeIdx = 4;
  return (
    <div
      className="min-h-screen w-full bg-backgroundLayout bg-no-repeat h-full absolute"
      style={{
        backgroundImage: `url(${unit.covers?.[0]})`,
        backgroundPosition: !isMobile ? "0 100%" : "0 -80%",
        backgroundSize: !isMobile ? "60% auto" : "100%",
      }}
    >
      {/* GradientOverlay */}
      <div
        className=""
        style={{
          backgroundImage:
            appTheme === "dark"
              ? !isMobile
                ? "linear-gradient(90deg,#c8c8c880,#000 50%,#000)"
                : "linear-gradient(180deg,#c8c8c880,#000 50%,#000)"
              : !isMobile
              ? "linear-gradient(90deg,#c8c8c880,#fff 50%,#fff)"
              : "linear-gradient(180deg,#c8c8c880,#fff 50%,#fff)",
          height: "100%",
          left: 0,
          overflow: "auto",
          position: "absolute",
          top: 0,
          width: "100%",
          zIndex: 1,
        }}
      ></div>
      <div
        className="px-2 pt-8 pb-[200px] backdrop-grayscale-[70%] md:backdrop-grayscale-0 backdrop-blur-sm"
        style={{
          height: "100%",
          left: 0,
          right: 0,
          position: "absolute",
          overflow: "auto",
          top: 0,
          width: "100%",
          zIndex: 2,
        }}
      >
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8 ">
            <div className="flex items-center justify-center gap-2 w-full relative">
              <Link
                href={`/app/units`}
                className="font-bold text-sm md:text-base text-main absolute right-4 md:right-10 -top-2"
              >
                <ArrowForward /> بازگشت
              </Link>
              <div className="text-xs text-main font-bold mb-2">
                UNIT {unit.unit_id}
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-main mb-1">
              {unit.title}
            </h1>
            <div className="text-base text-main mb-2">
              {unit.grammar_description}
            </div>
            <div className="text-sm text-main mb-2" dir="ltr">
              <div className="text-left">{unit.summary}</div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center text-xs text-main">
              <span>
                <span className="font-bold">کلمات جدید:</span> {unit.words}
              </span>
              <span>
                <span className="font-bold">لهجه:</span>{" "}
                {unit?.accents?.join(", ")}
              </span>
            </div>
          </div>
          {/* Activities */}
          <div className="flex flex-col gap-4">
            {activities.map((activity: IUnitActivity, idx: number) => {
              const isFirstUnfinished =
                !activity.is_finished &&
                activities.findIndex((a: IUnitActivity) => !a.is_finished) ===
                  idx;
              const isLocked = activity.is_locked;

              return (
                <Link
                  href={
                    !isLocked
                      ? `/app/units/${unitId}/activities/${activity.id}`
                      : ""
                  }
                  key={activity.id}
                  className={`relative flex items-center gap-2 rounded-xl px-4 py-4 bg-backgroundMain border transition-all
                  ${
                    isFirstUnfinished && !isLocked
                      ? "border-2 border-primary shadow-lg"
                      : "border border-borderMain shadow-sm"
                  }
                  ${
                    isLocked
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:shadow-md"
                  }`}
                >
                  <div
                    className={`w-12 h-12 flex items-center justify-center text-2xl rounded-full mr-3 ${
                      isLocked ? "text-gray400" : ""
                    }`}
                  >
                    {
                      activitiesDictionary?.[
                        activity.type as keyof typeof activitiesDictionary
                      ]?.icon
                    }
                  </div>
                  <div className="flex-1 flex flex-col items-start justify-center">
                    <div
                      className={`font-bold text-base mb-1 flex items-center gap-2 ${
                        isLocked ? "text-gray400" : "text-main"
                      }`}
                    >
                      {activity.title}
                      <span className="text-xs text-gray400">
                        ({activity.duration ? `${activity.duration} دقیقه` : ""}
                        )
                      </span>
                    </div>
                    <div
                      className={`text-xs font-medium ${
                        isLocked ? "text-gray400" : "text-primary"
                      }`}
                    >
                      {activity.type}
                    </div>
                  </div>
                  {/* Right: Lock icon if locked or Check icon if finished */}
                  {isLocked ? (
                    <span className="ml-2 text-yellow-500">
                      <LockIcon size={22} />
                    </span>
                  ) : activity.is_finished ? (
                    <span className="ml-2 text-green-500">
                      <CheckCircle size={22} />
                    </span>
                  ) : null}
                  {/* Active: Start button at bottom center */}
                  {isFirstUnfinished && !isLocked && (
                    <div className="absolute left-1/2 -bottom-4 -translate-x-1/2 z-10">
                      <button className="bg-primary text-white px-6 py-1.5 rounded-full shadow font-bold text-sm border-2 border-white">
                        شروع
                      </button>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
          {/* Unlock box */}
          {isLocked && (
            <div className="rounded-xl bg-yellow-50 border border-yellow-200 shadow px-6 py-5 flex items-center gap-4 mb-8">
              <span className="text-yellow-500">
                <LockIcon size={32} />
              </span>
              <div className="flex-1 text-yellow-900">
                Unlock all of the activities and much more.
                <br />
                <Link
                  href="/app/subscriptions"
                  className="font-bold text-yellow-700 hover:underline"
                >
                  Unlock →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleUnitView;
