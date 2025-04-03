import { UserActivity } from "@/api/types/auth";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import clsx from "clsx";
import moment from "moment-jalaali";
import React, { useState } from "react";

const daysInMonth = (year: number, month: number) => {
  return moment.jDaysInMonth(year, month);
};

const weekDays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];

const UserActivityCalendar: React.FC<{
  userActivities: {
    history: UserActivity[];
    max_streak: number;
    current_streak: number;
  };
}> = ({ userActivities }) => {
  const [currentDate, setCurrentDate] = useState(moment());

  const year = currentDate.jYear();
  const month = currentDate.jMonth();
  const days = Array.from({ length: daysInMonth(year, month) }, (_, i) =>
    moment(`${year}/${month + 1}/${i + 1}`, "jYYYY/jM/jD")
  );

  const getActivityForDate = (
    date: moment.Moment
  ): UserActivity | undefined => {
    return userActivities?.history?.find(
      (activity) => activity?.date === date?.format("YYYY-MM-DD")
    );
  };

  const handlePrevMonth = () =>
    setCurrentDate(currentDate.clone().subtract(1, "jMonth"));
  const handleNextMonth = () =>
    setCurrentDate(currentDate.clone().add(1, "jMonth"));

  const formatTimeSpent = (milliseconds: number) => {
    const minutes = milliseconds / 60000;
    if (minutes >= 60) {
      const hours = (minutes / 60).toFixed(1);
      const formattedHours = hours.replace(/\.0$/, "");
      return `${formattedHours} H`;
    } else {
      return `${Math.round(minutes)} m`;
    }
  };

  return (
    <div className="w-full md:w-[35%]">
      <div className="flex justify-between mb-4 text-main">
        <button onClick={handlePrevMonth} className="text-primary">
          <ArrowForwardIosIcon />
        </button>
        <h2 className="text-main font-medium text-lg md:text-xl">
          {currentDate.format("jMMMM jYYYY")}
        </h2>
        <button onClick={handleNextMonth} className="text-primary">
          <ArrowBackIosIcon />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center font-bold text-main text-[10px] md:text-sm mb-1">
        {weekDays.map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days?.map((day) => {
          const activity = getActivityForDate(day);
          const spentTime = activity ? activity.time_spent : 0;
          const formattedTime = formatTimeSpent(spentTime);

          return (
            <div
              key={day.toISOString()}
              className={clsx(`text-center rounded-xl`)}
              title={
                activity
                  ? `مدت زمان: ${formattedTime} دقیقه`
                  : "فعالیتی وجود ندارد"
              }
            >
              <div
                className={clsx(
                  "px-2 h-10 grid place-items-center rounded-t-xl text-black",
                  activity?.active ? "bg-green-500 text-white" : "bg-gray-200"
                )}
              >
                {day.format("jD")}
              </div>

              <div
                dir="ltr"
                className={clsx(
                  "text-[12px] md:text-sm h-10 grid place-items-center rounded-b-xl",
                  activity?.active ? "bg-green-400 text-white" : "bg-gray-100"
                )}
              >
                {activity?.active ? formattedTime : ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserActivityCalendar;
