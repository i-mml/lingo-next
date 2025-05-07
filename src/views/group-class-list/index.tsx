"use client";

import React from "react";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { useParams } from "next/navigation";
import { localesDictionary } from "@/constants/locales";
import Image from "next/image";

const groupClasses = [
  {
    id: 1,
    course: "دوره آنلاین A1.1",
    days: "شنبه و دوشنبه",
    startTime: "10:00",
    endTime: "13:00",
    startDate: "1404/02/30",
    endDate: "1404/04/19",
    capacity: 10,
    remaining: 3,
    teacher: "استاد رضایی",
  },
  {
    id: 2,
    course: "دوره آنلاین B1.1",
    days: "یکشنبه و سه‌شنبه",
    startTime: "15:00",
    endTime: "18:00",
    startDate: "1404/03/05",
    endDate: "1404/05/01",
    capacity: 12,
    remaining: 7,
    teacher: "استاد محمدی",
  },
  {
    id: 3,
    course: "دوره آنلاین A2.2",
    days: "چهارشنبه و پنج‌شنبه",
    startTime: "17:30",
    endTime: "20:00",
    startDate: "1404/03/10",
    endDate: "1404/05/15",
    capacity: 8,
    remaining: 2,
    teacher: "استاد کریمی",
  },
];

const GroupClassListView = () => {
  const { locale } = useParams();

  return (
    <div className="min-h-screen bg-backgroundMain flex flex-col items-center justify-center px-2 py-8">
      <div className="flex items-center gap-3 mb-8">
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

      <div className="w-full max-w-3xl flex flex-col gap-8">
        {groupClasses.map((cls) => (
          <div
            key={cls.id}
            className="bg-backgroundMain rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center gap-6 md:gap-10 border border-gray-100 dark:border-gray-800"
          >
            <div className="flex-1 flex flex-col gap-2 text-right">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-lg font-bold text-primary">
                  {cls.course}
                </span>
                <span className="text-xs bg-[var(--primary)] text-white px-3 py-1 rounded-full">
                  {cls.teacher}
                </span>
              </div>
              <div className="text-gray400 mt-1">
                روزهای برگزاری:{" "}
                <span className="font-bold text-main">{cls.days}</span>
              </div>
              <div className="text-gray400">
                ساعت کلاس:{" "}
                <span className="font-bold text-main">
                  {cls.startTime} تا {cls.endTime}
                </span>
              </div>
              <div className="text-gray400">
                تاریخ شروع:{" "}
                <span className="font-bold text-main">{cls.startDate}</span>
              </div>
              <div className="text-gray400">
                تاریخ پایان:{" "}
                <span className="font-bold text-main">{cls.endDate}</span>
              </div>
              <div className="text-gray400">
                ظرفیت:{" "}
                <span className="font-bold text-main">{cls.capacity}</span> نفر
                | ظرفیت باقی‌مانده:{" "}
                <span className="font-bold text-green-600">
                  {cls.remaining}
                </span>
              </div>
            </div>
            <PrimaryButton className="w-full text-lg">
              ثبت‌نام و پرداخت
            </PrimaryButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupClassListView;
