"use client";

import useThemeCreator from "@/hooks/use-theme";
import { isMobile } from "react-device-detect";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetUnits } from "@/api/services/learning";
import { CheckCircle, LockIcon, ChevronDown, X } from "lucide-react";
import PrimaryLink from "@/components/shared/PrimaryLink";
import { Autorenew, Check } from "@mui/icons-material";
import { Unit } from "./types";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import UnitsSkeleton from "./components/UnitsSkeleton";
import { useAuth } from "@/hooks/use-auth";
import { MenuItem, Select } from "@mui/material";

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
  const { whoAmI } = useAuth();
  const [knowledgeLevel, setKnowledgeLevel] = useState<string | null>(
    whoAmI?.userpreference?.knowledge_level?.toString() || null
  );
  const [showInfoBox, setShowInfoBox] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hide = localStorage.getItem("hideUnitsInfoBox");
      if (hide === "1") setShowInfoBox(false);
    }
  }, []);

  useEffect(() => {
    queryClient.refetchQueries({ queryKey: ["get-who-am-i"] });
  }, [queryClient]);

  const handleCloseInfoBox = () => {
    setShowInfoBox(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("hideUnitsInfoBox", "1");
    }
  };

  const {
    data: units,
    isLoading,
    isFetching,
  } = useQuery<Unit[]>({
    queryKey: ["get-units-list", knowledgeLevel],
    queryFn: () =>
      GetUnits(
        knowledgeLevel ||
          whoAmI?.userpreference?.knowledge_level?.toString() ||
          ""
      ),
    enabled: !!whoAmI?.userpreference?.knowledge_level,
  });

  console.log(whoAmI?.userpreference?.knowledge_level);

  const grouped = React.useMemo(() => {
    if (!units) return [];
    const sorted = [...units].sort(
      (a, b) => Number(a.unit_id) - Number(b.unit_id)
    );
    const groupedUnits = groupUnitsByLevel(sorted);

    // Add progress statistics to each group
    return groupedUnits.map((group) => ({
      ...group,
      unitsCompleted: group.units.filter((unit) => unit.is_finished).length,
      totalUnits: group.units.length,
      reviewClasses: group.units
        .filter((unit) => unit.is_finished)
        .map((unit) => ({
          id: unit.id,
          title: unit.title,
          unit_id: unit.unit_id,
        })),
    }));
  }, [units]);

  return (
    <div
      className="min-h-screen w-full bg-backgroundLayout pt-6 px-4"
      dir="rtl"
    >
      <div className="w-full max-w-3xl mx-auto mb-4 md:mb-8">
        <div className="flex items-center justify-between flex-col md:flex-row bg-gradient-to-r from-primary to-blue-500 rounded-xl shadow-lg px-4 md:px-8 py-4 md:py-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1 flex items-center gap-2">
              <span>سطح درسی شما</span>
              <svg
                className="w-7 h-7 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2l2.39 4.84L18 7.27l-3.91 3.81L15.18 18 10 14.77 4.82 18l1.09-6.92L2 7.27l5.61-.43L10 2z" />
              </svg>
            </h2>
            <p className="text-white/80 text-sm">
              پیشرفت خود را در این سطح مشاهده کنید
            </p>
          </div>
          <div className="relative">
            <select
              className="appearance-none bg-backgroundLayout text-main font-bold px-5 py-2 rounded-lg shadow border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              value={knowledgeLevel || ""}
              onChange={(e) => setKnowledgeLevel(e.target.value)}
              dir="ltr"
            >
              <option value="">سطح شما</option>
              <option value="1">مبتدی</option>
              <option value="2">پیش متوسط</option>
              <option value="3">متوسط</option>
              <option value="4">بالاتر از متوسط</option>
              <option value="5">مقدمه سطح پیشرفته</option>
              <option value="6">پیشرفته</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
              <ChevronDown className="w-5 h-5" />
            </span>
          </div>
        </div>
      </div>
      {showInfoBox && (
        <div className="w-full max-w-2xl mx-auto mb-6 relative">
          <button
            className="absolute left-2 top-2 text-yellow-500 hover:text-yellow-700 transition-colors z-10"
            onClick={handleCloseInfoBox}
            aria-label="بستن راهنما"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-6 py-4 text-yellow-900 text-sm shadow flex items-start gap-3">
            <div>
              🎯 اینجا نقطه شروع مسیر یادگیری شماست!
              <br />
              سطح موردنظرت رو انتخاب کن، پیشرفتت رو لحظه‌به‌لحظه ببین و هر درس
              رو با یک کلیک شروع کن.
              <br />
              هرچه بیشتر پیش بری، درس‌های جدیدتر و جذاب‌تری برات باز میشه.
              <br />
              آماده‌ای برای یک تجربه یادگیری متفاوت؟{" "}
              <span
                className="font-bold text-primary"
                onClick={handleCloseInfoBox}
              >
                شروع کن!
              </span>
            </div>
          </div>
        </div>
      )}
      {isLoading || isFetching ? (
        <UnitsSkeleton />
      ) : isMobile ? (
        <div className="flex flex-col gap-4 ">
          {grouped?.map((group) => (
            <React.Fragment key={group.level_id}>
              {/* Level Header Box */}
              <div className="mb-2 px-2 py-3 rounded-lg bg-backgroundLayout border-2 border-borderMain cards-sm-box-shadow flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <CircularProgressBox
                    completed={group.unitsCompleted}
                    total={group.totalUnits}
                  />
                  <div className="flex flex-col gap-2 flex-1">
                    <div className="font-bold text-main text-lg">
                      سطح {group.level_text}
                    </div>
                    <div className="flex items-center justify-between mb-1 w-full">
                      <span className="text-xs font-medium text-gray400">
                        تعداد درس های کامل شده
                      </span>
                      <span className="text-xs font-medium text-gray400">
                        {group.unitsCompleted}/{group.totalUnits}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-4 pt-1 pb-2">
                  <div className="flex items-center gap-[2px] mb-2">
                    {[...Array(group.totalUnits)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-2 rounded ${
                          i < group.unitsCompleted
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
                  const progress = unit.is_finished ? 100 : 0;
                  return (
                    <Link
                      href={unit.is_locked ? "" : `/app/units/${unit.id}`}
                      key={unit.id}
                      className={`flex items-stretch rounded-xl bg-backgroundMain border-2 border-borderMain overflow-hidden min-h-[110px] ${
                        unit.is_locked ? "cursor-not-allowed" : ""
                      }`}
                    >
                      <div className="relative w-24 min-w-[96px] h-[150px] flex-shrink-0">
                        <Image
                          width={101}
                          height={150}
                          src={image}
                          alt={unit.title}
                          className={`object-cover w-full h-full ${
                            unit.is_locked ? "brightness-50" : ""
                          }`}
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
                        {!!unit.is_finished ? (
                          <div className="flex items-center gap-2">
                            <span className="material-icons text-green-500 text-lg">
                              <CheckCircle />
                            </span>
                            <span className="text-xs font-medium text-green-500">
                              تکمیل شده
                            </span>
                          </div>
                        ) : unit?.is_locked ? (
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <span className="material-icons text-gray300 text-lg">
                                <LockIcon />
                              </span>
                              <span className="text-xs font-medium text-gray300">
                                {!!whoAmI?.has_subscription
                                  ? "ابتدا درس های قبلی را کامل کنید"
                                  : "محتوای ویژه"}
                              </span>
                            </div>
                            {!whoAmI?.has_subscription ? (
                              <PrimaryLink
                                href="/app/subscriptions"
                                className="!text-xs font-medium text-primary w-fit mx-0"
                              >
                                خرید اشتراک
                              </PrimaryLink>
                            ) : (
                              <></>
                            )}
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
              <div className="mb-2 px-2 py-3 rounded-lg bg-backgroundLayout border border-gray-200 flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <CircularProgressBox
                    completed={group.unitsCompleted}
                    total={group.totalUnits}
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
                      {[...Array(group.totalUnits)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-6 h-2 rounded ${
                            i < group.unitsCompleted
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
                  const progress = unit.is_finished ? 100 : 0;
                  return (
                    <Link
                      href={unit.is_locked ? "" : `/app/units/${unit.id}`}
                      key={unit.id}
                      className={`rounded-2xl overflow-hidden flex flex-col bg-backgroundMain w-full ${
                        unit.is_locked ? "cursor-not-allowed" : ""
                      }`}
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
                          className={`object-cover w-full ${
                            unit.is_locked ? "brightness-50" : ""
                          }`}
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
                              <CheckCircle />
                            </span>
                            <span className="text-xs font-medium text-green-500">
                              تکمیل شده
                            </span>
                          </div>
                        ) : unit?.is_locked ? (
                          <div className="flex items-center justify-between mt-2 w-full">
                            <div className="flex items-center gap-2">
                              <span className="material-icons text-gray300 text-lg">
                                <LockIcon />
                              </span>
                              <span className="text-xs font-medium text-gray300">
                                {!!whoAmI?.has_subscription
                                  ? "ابتدا درس های قبلی را کامل کنید"
                                  : "محتوای ویژه"}
                              </span>
                            </div>
                            {!whoAmI?.has_subscription ? (
                              <PrimaryLink
                                href="/app/subscriptions"
                                className="!text-xs font-medium text-primary w-fit mx-0"
                              >
                                خرید اشتراک
                              </PrimaryLink>
                            ) : (
                              <></>
                            )}
                          </div>
                        ) : (
                          <div className="flex gap-2 mt-2 flex-col">
                            <div className="w-full flex items-center gap-2">
                              <Autorenew />
                              <span className="text-xs font-medium text-primary">
                                در حال پیشرفت
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
  );
};

export default UnitView;
