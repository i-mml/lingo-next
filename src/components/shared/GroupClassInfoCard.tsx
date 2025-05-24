import React from "react";
import type { GroupClass } from "@/views/group-class-list";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import PaidIcon from "@mui/icons-material/Paid";

const GroupClassInfoCard = ({
  course,
  variant = "modal",
}: {
  course: GroupClass;
  variant?: "modal" | "list";
}) => {
  const cardBg =
    variant === "modal"
      ? "bg-backgroundLayout border border-borderMain shadow-sm"
      : "bg-backgroundMain border border-gray-200 shadow-sm dark:bg-[#181c20] dark:border-[#222]";
  return (
    <div className={`mb-6 p-4 rounded-2xl text-main text-sm ${cardBg}`}>
      <div className="flex items-center gap-2 mb-3">
        <SchoolIcon className="text-yellow-500" />
        <span className="font-bold text-lg text-main">
          {course.course.title}
        </span>
        <span className="ml-2 px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-semibold dark:bg-blue-900 dark:text-blue-200">
          {course.course.level}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-main text-sm">
        <div className="flex items-center gap-1">
          <CalendarMonthIcon className="text-gray-400 text-base" />
          <span>تاریخ شروع:</span>
        </div>
        <div className="font-semibold">{course.start_date}</div>
        <div className="flex items-center gap-1">
          <CalendarMonthIcon className="text-gray-400 text-base" />
          <span>تاریخ پایان:</span>
        </div>
        <div className="font-semibold">{course.end_date}</div>
        <div className="flex items-center gap-1">
          <AccessTimeIcon className="text-gray-400 text-base" />
          <span>زمان:</span>
        </div>
        <div className="font-semibold">
          {course.start_time.slice(0, 5)} - {course.end_time.slice(0, 5)}
        </div>
        <div className="flex items-center gap-1">
          <PeopleIcon className="text-gray-400 text-base" />
          <span>تعداد جلسات:</span>
        </div>
        <div className="font-semibold">{course.course.total_sessions}</div>
        <div className="flex items-center gap-1">
          <PaidIcon className="text-green-600 text-base" />
          <span>شهریه:</span>
        </div>
        <div className="font-bold text-green-700 dark:text-green-400">
          {course.course.fee.toLocaleString()} تومان
        </div>
        <div className="flex items-center gap-1">
          <PeopleIcon className="text-blue-400 text-base" />
          <span>ظرفیت باقی‌مانده:</span>
        </div>
        <div className="font-bold text-blue-700 dark:text-blue-300">
          {course.available_capacity}
        </div>
      </div>
    </div>
  );
};

export default GroupClassInfoCard;
