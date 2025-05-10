"use client";

import React, { useMemo, useState } from "react";
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

  // Extract unique levels for tabs
  const levels = useMemo(
    () => Array.from(new Set(groupClasses.map((cls) => cls.course.title))),
    [groupClasses]
  );
  const [selectedLevel, setSelectedLevel] = useState(levels[0] || "");

  // Filter and sort classes
  const filteredClasses = useMemo(() => {
    return groupClasses
      .filter((cls) => cls.course.title === selectedLevel)
      .sort((a, b) => a.available_capacity - b.available_capacity);
  }, [groupClasses, selectedLevel]);

  const getRowStyle = (available: number, capacity: number) => {
    if (capacity === 0 || available <= capacity / 4)
      return { color: "#d32f2f" };
    if (available <= capacity / 2) return { color: "#ffc107" };
    return { color: "#388e3c" };
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

      <div className="p-4 md:p-8 w-full max-w-5xl">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-4 border-b-2 border-borderMain">
          {levels.map((level) => (
            <button
              key={level}
              className={`px-4 py-2 rounded-t-lg font-bold text-base border-b-4 transition-all duration-200 ${
                selectedLevel === level
                  ? "border-primary text-primary bg-backgroundMain"
                  : "border-transparent text-gray300 bg-backgroundMain"
              }`}
              onClick={() => setSelectedLevel(level)}
            >
              {level}
            </button>
          ))}
        </div>
        {/* Mobile Cards */}
        <div className="flex flex-col gap-4 md:hidden">
          {filteredClasses.map((cls) => (
            <div
              key={cls.id}
              className="rounded-xl shadow-lg mb-4 overflow-hidden bg-backgroundLayout"
            >
              <div className="flex flex-col divide-y divide-borderMain">
                <div className="flex justify-between py-3 px-2 text-main">
                  <span className="font-bold">سطح دوره</span>
                  <span>{cls.course.title}</span>
                </div>
                <div className="flex justify-between py-3 px-2 text-main">
                  <span className="font-bold">نوع دوره</span>
                  <span>
                    {cls.course.type === "group"
                      ? cls.course.is_online
                        ? "آنلاین"
                        : "حضوری"
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between py-3 px-2 text-main">
                  <span className="font-bold">روز</span>
                  <span>{cls.day_of_week}</span>
                </div>
                <div className="flex justify-between py-3 px-2 text-main">
                  <span className="font-bold">ساعت</span>
                  <span>
                    {cls.start_time}-{cls.end_time}
                  </span>
                </div>
                <div className="flex justify-between py-3 px-2 text-main">
                  <span className="font-bold">تاریخ شروع</span>
                  <span>{moment(cls.start_date).format("jYYYY/jMM/jDD")}</span>
                </div>
                <div className="flex justify-between py-3 px-2 text-main">
                  <span className="font-bold">تاریخ پایان</span>
                  <span>{moment(cls.end_date).format("jYYYY/jMM/jDD")}</span>
                </div>
                <div className="flex justify-between py-3 px-2 text-main">
                  <span className="font-bold">ظرفیت</span>
                  <span
                    style={getRowStyle(cls.available_capacity, cls.capacity)}
                    className="px-2 py-1 rounded font-bold"
                  >
                    {cls.available_capacity === 0
                      ? "صفر"
                      : cls.available_capacity}
                  </span>
                </div>
                <div className="flex justify-between py-3 px-2 text-main">
                  <span className="font-bold">تعداد جلسات</span>
                  <span>{cls.course.total_sessions}</span>
                </div>
                <div className="flex justify-between py-3 px-2 text-main">
                  <span className="font-bold">شهریه</span>
                  <span>{cls.course.fee.toLocaleString()} تومان</span>
                </div>
              </div>
              <div className="p-4">
                {cls.available_capacity === 0 ? (
                  <button
                    className="w-full bg-gray-100 text-gray-400 py-2 rounded-lg cursor-not-allowed"
                    disabled
                  >
                    ناموجود
                  </button>
                ) : (
                  <a
                    href={cls.payment_link}
                    className="w-full block text-center bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary/90"
                  >
                    ثبت نام
                  </a>
                )}
              </div>
            </div>
          ))}
          {filteredClasses.length === 0 && (
            <div className="py-8 text-gray-500 bg-backgroundMain rounded-xl text-center">
              هیچ کلاسی برای این سطح موجود نیست.
            </div>
          )}
        </div>
        {/* Desktop Table */}
        <div className="overflow-x-auto rounded-xl shadow-lg hidden md:block">
          <table className="min-w-[900px] w-full text-center border-separate border-spacing-0">
            <thead>
              <tr className="bg-backgroundLayout text-main text-base">
                <th className="py-3 px-0">سطح دوره</th>
                <th className="py-3 px-0">شهریه</th>
                <th className="py-3 px-0">تعداد جلسات</th>
                <th className="py-3 px-0">ظرفیت</th>
                <th className="py-3 px-0">تاریخ شروع</th>
                <th className="py-3 px-0">تاریخ پایان</th>
                <th className="py-3 px-0">ساعت</th>
                <th className="py-3 px-0">روز</th>
                <th className="py-3 px-0">نوع دوره</th>
                <th className="py-3 px-0">ثبت نام</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((cls) => (
                <tr
                  key={cls.id}
                  className="text-base font-bold border-b border-borderMain bg-backgroundLayout"
                >
                  <td className="py-2 px-2 text-main">{cls.course.title}</td>
                  <td className="py-2 px-2 text-main">
                    {cls.course.fee.toLocaleString()} تومان
                  </td>
                  <td className="py-2 px-2 text-main">
                    {cls.course.total_sessions}
                  </td>
                  <td
                    className="py-2 px-2 text-main"
                    style={getRowStyle(cls.available_capacity, cls.capacity)}
                  >
                    {cls.available_capacity === 0
                      ? "صفر"
                      : cls.available_capacity}
                  </td>
                  <td className="py-2 px-2 text-main">
                    {moment(cls.start_date).format("jYYYY/jMM/jDD")}
                  </td>
                  <td className="py-2 px-2 text-main">
                    {moment(cls.end_date).format("jYYYY/jMM/jDD")}
                  </td>
                  <td className="py-2 px-2 text-main">
                    {cls.start_time.slice(0, 5)}-{cls.end_time.slice(0, 5)}
                  </td>
                  <td className="py-2 px-2 text-main">{cls.day_of_week}</td>
                  <td className="py-2 px-2 text-main">
                    {cls.course.type === "group"
                      ? cls.course.is_online
                        ? "آنلاین"
                        : "حضوری"
                      : "-"}
                  </td>
                  <td className="py-2 px-2 text-main">
                    {cls.available_capacity === 0 ? (
                      <span className="opacity-60">-</span>
                    ) : (
                      <a
                        href={cls.payment_link}
                        className="bg-primary text-white px-3 py-1 rounded-lg hover:bg-primary/90 transition"
                      >
                        ثبت نام
                      </a>
                    )}
                  </td>
                </tr>
              ))}
              {filteredClasses.length === 0 && (
                <tr>
                  <td
                    colSpan={10}
                    className="py-8 text-gray-500 bg-white text-center"
                  >
                    هیچ کلاسی برای این سطح موجود نیست.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GroupClassList;
