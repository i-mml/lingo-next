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

const UnitView = () => {
  const { theme }: any = useThemeCreator();
  const [level] = useState("A2. Lower Intermediate");
  const unitsCompleted = 0;
  const totalUnits = 24;
  const reviewClasses = 0;
  const totalReview = 6;

  const { data: units } = useQuery<Unit[]>({
    queryKey: ["units"],
    queryFn: () => GetUnits(),
  });

  return (
    <div className="min-h-screen w-full bg-backgroundLayout" dir="rtl">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-backgroundMain border-gray200 px-4 py-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <button className="lg:hidden ml-2">
            <span className="material-icons text-2xl text-gray300">menu</span>
          </button>
          <span className="font-bold text-lg text-main">{level}</span>
          <span className="mr-2 text-gray400 text-xs">▼</span>
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray200">
          <span className="material-icons text-gray300">person</span>
        </div>
      </div>

      {/* Progress Bars */}
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

      {/* Units List/Grid */}
      <div className="px-2 pt-2 pb-8">
        {isMobile ? (
          <div className="flex flex-col gap-4">
            {(units || []).map((unit) => {
              const image =
                unit.covers?.[0] ||
                unit.images?.[0] ||
                "/units/placeholder.jpg";
              const progress = unit.finished ? 100 : 0;
              return (
                <motion.div
                  key={unit.id}
                  className="flex items-stretch rounded-xl bg-backgroundMain border-2 border-borderMain overflow-hidden min-h-[110px]"
                  whileHover={{ scale: 1.01 }}
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
                      <div className="text-xs text-gray-500 mb-2 truncate">
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
                                  theme?.palette?.primary?.main || "#00bcd4",
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
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div
            className={`w-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center gap-4`}
          >
            {(units || []).map((unit) => {
              const image =
                unit.covers?.[0] ||
                unit.images?.[0] ||
                "/units/placeholder.jpg";
              const progress = unit.finished ? 100 : 0;
              return (
                <motion.div
                  key={unit.id}
                  className="rounded-2xl overflow-hidden flex flex-col bg-backgroundMain w-full"
                  style={{
                    boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
                    border: "none",
                  }}
                  whileHover={{ scale: 1.01 }}
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
                      <div className="text-xs mt-1 text-gray300">
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
                                  theme?.palette?.primary?.main || "#00bcd4",
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
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitView;
