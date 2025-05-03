"use client";

import { useState } from "react";
import useThemeCreator from "@/hooks/use-theme";
import { isMobile } from "react-device-detect";
import { motion } from "framer-motion";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { GetUnits } from "@/api/services/units";
import { LockIcon } from "lucide-react";
import PrimaryLink from "@/components/shared/PrimaryLink";
import { Autorenew, Check } from "@mui/icons-material";
import { Unit } from "./types";
import Link from "next/link";
import React from "react";
import UnitsSkeleton from "./components/UnitsSkeleton";

function groupUnitsByLevel(units: Unit[]) {
  const groups: { [level_id: number]: { level_text: string; units: Unit[] } } =
    {};
  units.forEach((unit) => {
    if (!groups[unit.level_id]) {
      groups[unit.level_id] = { level_text: unit.level_text, units: [] };
    }
    groups[unit.level_id].units.push(unit);
  });
  return Object.entries(groups).map(([level_id, { level_text, units }]) => ({
    level_id: Number(level_id),
    level_text,
    units,
  }));
}

function CircularProgressBox({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percent = total === 0 ? 0 : completed / total;
  const strokeDashoffset = circumference - percent * circumference;
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#10b981"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset, transition: "stroke-dashoffset 0.5s" }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-main">
        {completed}/{total}
      </div>
    </div>
  );
}

const UnitView = () => {
  const { theme }: any = useThemeCreator();
  const unitsCompleted = 12;
  const totalUnits = 24;
  const reviewClasses = 12;

  const {
    data: units,
    isLoading,
    isFetching,
  } = useQuery<Unit[]>({
    queryKey: ["units"],
    queryFn: () => GetUnits(),
  });

  const grouped = React.useMemo(() => {
    if (!units) return [];
    const sorted = [...units].sort(
      (a, b) => Number(a.unit_id) - Number(b.unit_id)
    );
    return groupUnitsByLevel(sorted);
  }, [units]);

  return (
    <div className="min-h-screen w-full bg-backgroundLayout pt-6" dir="rtl">
      <div className="px-2 pt-2 pb-8">
        {isLoading || isFetching ? (
          <UnitsSkeleton />
        ) : isMobile ? (
          <div className="flex flex-col gap-4">
            {grouped?.map((group) => (
              <React.Fragment key={group.level_id}>
                {/* Level Header Box */}
                <div className="mb-2 px-2 py-3 rounded-lg bg-gray-100 border-2 border-borderMain cards-sm-box-shadow flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <CircularProgressBox
                      completed={unitsCompleted}
                      total={totalUnits}
                    />
                    <span className="font-bold text-main text-base">
                      سطح {group.level_text}
                    </span>
                  </div>
                  <div className="px-4 pt-4 pb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-main">
                        تعداد درس های کامل شده
                      </span>
                      <span className="text-xs font-medium text-main">
                        {unitsCompleted}/{totalUnits}
                      </span>
                    </div>
                    <div className="flex items-center gap-[2px] mb-2">
                      {[...Array(24)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-6 h-2 rounded ${
                            i < reviewClasses
                              ? "bg-green-400"
                              : "bg-gray-200 dark:bg-gray-800"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  {group.units.map((unit) => {
                    const image =
                      unit.covers?.[0] ||
                      unit.images?.[0] ||
                      "/units/placeholder.jpg";
                    const progress = unit.finished ? 100 : 0;
                    return (
                      <Link
                        href={`/app/units/${unit.id}`}
                        key={unit.id}
                        className="flex items-stretch rounded-xl bg-backgroundMain border-2 border-borderMain overflow-hidden min-h-[110px]"
                      >
                        <div className="relative w-24 min-w-[96px] h-[150px] flex-shrink-0">
                          <Image
                            width={101}
                            height={150}
                            src={image}
                            alt={unit.title}
                            className="object-cover w-full h-full"
                            onError={(e: any) => {
                              e.target.src = "/units/placeholder.jpg";
                            }}
                          />
                        </div>
                        <div className="flex flex-col justify-between flex-1 p-3 max-w-[70%]">
                          <div dir="ltr">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold text-gray400">
                                UNIT {unit.unit_id}
                              </span>
                            </div>
                            <div className="font-bold text-base mb-1 text-gray300 truncate line-clamp-1 max-w-[90%]">
                              {unit.title}
                            </div>
                            <div className="text-xs text-gray-500 mb-2 truncate line-clamp-1">
                              {unit.grammar_description}
                            </div>
                          </div>
                          {progress === 100 ? (
                            <div className="flex items-center gap-2">
                              <span className="material-icons text-green-500 text-lg">
                                <Check />
                              </span>
                              <span className="text-xs font-medium text-green-500">
                                تکمیل شده
                              </span>
                            </div>
                          ) : unit?.is_locked ? (
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <span className="material-icons text-primary text-lg">
                                  <LockIcon />
                                </span>
                                <span className="text-xs font-medium text-primary">
                                  محتوای ویژه
                                </span>
                              </div>
                              <PrimaryLink
                                href="/app/subscriptions"
                                className="!text-xs font-medium text-primary w-fit mx-0"
                              >
                                خرید اشتراک
                              </PrimaryLink>
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="material-icons text-primary text-lg">
                                  <Autorenew />
                                </span>
                                <span className="text-xs font-medium text-primary">
                                  در حال پیشرفت
                                </span>
                              </div>
                              <div className="w-full flex items-center gap-2">
                                <div className="flex-1 h-1 rounded bg-gray-200 ml-2">
                                  <div
                                    className="h-1 rounded"
                                    style={{
                                      width: `${progress}%`,
                                      background:
                                        theme?.palette?.primary?.main ||
                                        "#00bcd4",
                                    }}
                                  />
                                </div>
                                <span className="text-xs text-gray400">
                                  {progress}%
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {grouped.map((group, groupIdx) => (
              <React.Fragment key={group.level_id}>
                {/* Level Header Box */}
                <div className="mb-2 px-2 py-3 rounded-lg bg-gray-100 border border-gray-200 flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <CircularProgressBox
                      completed={unitsCompleted}
                      total={totalUnits}
                    />
                    <span className="font-bold text-main text-base">
                      سطح {group.level_text}
                    </span>
                  </div>
                  <div className="px-4 pt-4 pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-main">
                        تعداد درس های کامل شده
                      </span>
                      <div className="flex items-center justify-evenly flex-1 w-full">
                        {[...Array(24)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-6 h-2 rounded ${
                              i < reviewClasses
                                ? "bg-green-400"
                                : "bg-gray-200 dark:bg-gray-800"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`w-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center gap-4`}
                >
                  {group.units.map((unit) => {
                    const image =
                      unit.covers?.[0] ||
                      unit.images?.[0] ||
                      "/units/placeholder.jpg";
                    const progress = unit.finished ? 100 : 0;
                    return (
                      <Link
                        href={`/app/units/${unit.id}`}
                        key={unit.id}
                        className="rounded-2xl overflow-hidden flex flex-col bg-backgroundMain w-full"
                        style={{
                          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
                          border: "none",
                        }}
                      >
                        <div className="relative w-full">
                          <Image
                            src={image}
                            alt={unit.title}
                            width={170}
                            height={252}
                            className="object-cover w-full"
                            onError={(e: any) => {
                              e.target.src = "/units/placeholder.jpg";
                            }}
                          />
                        </div>
                        <div className="p-3 flex-1 flex flex-col justify-between">
                          <div dir="ltr">
                            <div className="text-xs font-bold text-gray400">
                              UNIT {unit.unit_id}
                            </div>
                            <div className="text-sm font-semibold text-main line-clamp-1">
                              {unit.title}
                            </div>
                            <div className="text-xs mt-1 text-gray300 line-clamp-1">
                              {unit.grammar_description}
                            </div>
                          </div>
                          {progress === 100 ? (
                            <div className="flex items-center gap-2 mt-2">
                              <span className="material-icons text-green-500 text-lg">
                                <Check />
                              </span>
                              <span className="text-xs font-medium text-green-500">
                                تکمیل شده
                              </span>
                            </div>
                          ) : unit?.is_locked ? (
                            <div className="flex items-center justify-between mt-2 w-full">
                              <div className="flex items-center gap-2">
                                <span className="material-icons text-primary text-lg">
                                  <LockIcon />
                                </span>
                                <span className="text-xs font-medium text-primary">
                                  محتوای ویژه
                                </span>
                              </div>
                              <PrimaryLink
                                href="/app/subscriptions"
                                className="!text-xs font-medium text-primary w-fit mx-0"
                              >
                                خرید اشتراک
                              </PrimaryLink>
                            </div>
                          ) : (
                            <div className="flex gap-2 mt-2 flex-col">
                              <div className="w-full flex items-center gap-2">
                                <Autorenew />
                                <span className="text-xs font-medium text-primary">
                                  در حال پیشرفت
                                </span>
                              </div>
                              <div className="w-full flex items-center gap-2">
                                <div className="flex-1 h-1 rounded bg-gray-200 ml-2">
                                  <div
                                    className="h-1 rounded"
                                    style={{
                                      width: `${progress}%`,
                                      background:
                                        theme?.palette?.primary?.main ||
                                        "#00bcd4",
                                    }}
                                  />
                                </div>
                                <span className="text-xs text-gray400">
                                  {progress}%
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitView;
