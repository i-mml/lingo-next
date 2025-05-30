"use client";

import React, { useMemo, useState, useEffect } from "react";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { useParams } from "next/navigation";
import { localesDictionary } from "@/constants/locales";
import Image from "next/image";
import { GetAcademySchedules } from "@/api/services/academy";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import WaveLoading from "@/components/shared/WaveLoading";
import moment from "moment-jalaali";
import OutlineButton from "@/components/shared/OutlineButton";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import ClassRegistrationModal from "@/components/shared/ClassRegistrationModal";
import GroupClassInfoCard from "@/components/shared/GroupClassInfoCard";
import { getPaymentPackageStart } from "@/api/services/payment";
import { toast } from "react-toastify";

// TypeScript type for group class
export type GroupClass = {
  id: number;
  course: {
    id: number;
    title: string;
    level: string;
    type: string;
    description: string;
    fee: number;
    total_sessions: number;
    is_online: boolean;
  };
  day_of_week: string;
  start_time: string;
  end_time: string;
  start_date: string;
  end_date: string;
  capacity: number;
  current_enrollment: number;
  available_capacity: number;
  payment_link: string;
};

const GroupClassList: React.FC = () => {
  const { locale } = useParams();
  const { isGuest } = useAuth();

  const { data: groupClasses = [], isLoading } = useQuery<GroupClass[]>({
    queryKey: ["get-group-classes-list"],
    queryFn: () =>
      GetAcademySchedules().then((res) => {
        setSelectedLevel(res?.[0]?.course?.title);
        return res;
      }),
  });

  // Extract unique levels for tabs and sort them naturally
  const levels = useMemo(() => {
    // Helper to extract a comparable value from level string
    const parseLevel = (level: string | undefined | null) => {
      if (!level || typeof level !== "string") return ["Z", 0, 0];
      const match = level.match(/^([A-Z]+)([0-9]?(?:\.[0-9])?)?(-U)?/i);
      if (!match) return [level];
      const [, letter, number, bu] = match;
      return [
        letter ? letter.toUpperCase() : "Z",
        number ? parseFloat(number) : 0,
        bu ? 1 : 0,
      ];
    };
    const uniqueLevels = Array.from(
      new Set(groupClasses.map((cls) => cls.course.title))
    );
    uniqueLevels.sort((a, b) => {
      const aCourse = groupClasses.find(
        (cls) => cls.course.title === a
      )?.course;
      const bCourse = groupClasses.find(
        (cls) => cls.course.title === b
      )?.course;
      const aParsed = parseLevel(aCourse?.level);
      const bParsed = parseLevel(bCourse?.level);
      for (let i = 0; i < Math.max(aParsed.length, bParsed.length); i++) {
        if ((aParsed[i] || 0) < (bParsed[i] || 0)) return -1;
        if ((aParsed[i] || 0) > (bParsed[i] || 0)) return 1;
      }
      return 0;
    });
    return uniqueLevels;
  }, [groupClasses]);
  const [selectedLevel, setSelectedLevel] = useState(levels[0] || "");

  // Ensure selectedLevel is always set to the first sorted level on first load or when levels change
  useEffect(() => {
    if (levels.length > 0) {
      setSelectedLevel(levels[0]);
    }
  }, [levels]);

  // Filter and sort classes
  const filteredClasses = useMemo(() => {
    return groupClasses
      .filter((cls) => cls.course.title === selectedLevel)
      .sort((a, b) => a.available_capacity - b.available_capacity);
  }, [groupClasses, selectedLevel]);

  const getRowStyle = (available: number, capacity: number) => {
    if (available >= 5) return { color: "#388e3c" };
    if (available >= 4 && available < 5) return { color: "#ffc107" };
    if (available < 4) return { color: "#d32f2f" };
    return {};
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPaymentLink, setSelectedPaymentLink] = useState<string | null>(
    null
  );
  const [selectedClass, setSelectedClass] = useState<GroupClass | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleGetGateWay = async (gateWayLink: string) => {
    try {
      setIsRedirecting(true);
      await getPaymentPackageStart(gateWayLink).then((res) => {
        if (res?.data?.url) {
          window.location.href = res?.data?.url;
        } else {
          toast.error("خطا در انتقال به درگاه");
          setIsRedirecting(false);
        }
      });
    } catch {
      setIsRedirecting(false);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-backgroundMain flex flex-col items-center px-2 py-8">
        <WaveLoading />
      </div>
    );

  return (
    <div className="min-h-screen bg-backgroundMain flex flex-col items-center px-2 pt-10 pb-8">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-xl md:text-3xl font-bold text-main text-center">
          کلاس‌های گروهی زبان{" "}
          {
            localesDictionary?.[locale as keyof typeof localesDictionary]
              ?.persian
          }{" "}
        </h1>
        {!!localesDictionary?.[locale as keyof typeof localesDictionary]
          ?.language_flag ? (
          <Image
            width={24}
            height={24}
            src={
              localesDictionary?.[locale as keyof typeof localesDictionary]
                ?.language_flag
            }
            alt="language flag"
            className="w-6 h-6"
          />
        ) : (
          <></>
        )}
      </div>
      {!isGuest && (
        <div className="text-sm text-main w-full max-w-md md:mt-3 mb-6">
          <Link href="/app/group-classes/my-classes">
            <OutlineButton className="w-full">کلاس های من</OutlineButton>
          </Link>
        </div>
      )}

      <div className="p-4 md:p-8 w-full max-w-6xl">
        {/* Tabs */}
        <div className="flex gap-4 border-b mb-8 overflow-x-auto scrollbar-hide">
          {levels.map((level) => (
            <button
              key={level}
              className={`px-6 py-3 text-lg font-semibold transition rounded-t-lg
                ${
                  selectedLevel === level
                    ? "border-b-4 border-yellow-400 text-yellow-400 bg-backgroundLayout"
                    : "text-gray-300 hover:text-yellow-400"
                }
              `}
              onClick={() => setSelectedLevel(level)}
            >
              {level}
            </button>
          ))}
        </div>
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredClasses.map((cls) => (
            <div
              key={cls.id}
              className="bg-backgroundLayout rounded-2xl shadow-xl p-6 flex flex-col justify-between transition hover:shadow-2xl"
            >
              <GroupClassInfoCard course={cls} variant="list" />
              <div className="flex justify-end">
                {cls.available_capacity === 0 ? (
                  <button
                    className="px-6 py-2 rounded-full bg-gray-700 text-gray-400 font-bold cursor-not-allowed"
                    disabled
                  >
                    ناموجود
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setSelectedPaymentLink(cls.payment_link);
                        setSelectedClass(cls);
                        setModalOpen(true);
                      }}
                      className="inline-flex items-center gap-2 px-8 py-2 rounded-full bg-green-400 text-white font-extrabold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      <span>ثبت نام</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14m-7-7l7 7-7 7"
                        />
                      </svg>
                    </button>
                    <ClassRegistrationModal
                      open={modalOpen}
                      toggleModal={() => setModalOpen(false)}
                      onConfirm={handleGetGateWay}
                      paymentLink={selectedPaymentLink}
                      course={selectedClass}
                      isRedirecting={isRedirecting}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
          {filteredClasses.length === 0 && (
            <div className="col-span-full py-8 text-gray-500 bg-backgroundMain rounded-xl text-center">
              هیچ کلاسی برای این سطح موجود نیست.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupClassList;
