import Image from "next/image";
import { useEffect, useState } from "react";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import InputWithIcon from "./InputWithIcon";
import CalenderIcon from "@/assets/calender.svg";

const weekDays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
];

const CustomDatePicker = ({
  title,
  handleDateChange,
  placeholder,
  date,
  wrapperClassName,
  childeClassName,
}: {
  handleDateChange: (date: DateObject | null) => void;
  title: string;
  placeholder?: string;
  date: string;
  wrapperClassName?: string;
  childeClassName?: string;
}) => {
  const [value, setValue] = useState<DateObject | null>(null);

  useEffect(() => {
    if (date) {
      setValue(new DateObject({ date: new Date(date), calendar: persian }));
    }
  }, [date]);

  const handleChange = (newDate: DateObject | null) => {
    setValue(newDate);
    handleDateChange(newDate);
  };

  return (
    <>
      <DatePicker
        value={value}
        arrow={false}
        weekDays={weekDays}
        containerStyle={{ display: "block", width: "100%" }}
        calendarPosition="bottom-center"
        style={{ width: "320px" }}
        calendar={persian}
        onChange={handleChange}
        className="relative !rounded-xl mt-4 !bg-backgroundMain   w-full !text-main  "
        locale={persian_fa}
        placeholder="تاریخ تولد"
        render={(_, openCalendar) => (
          <div
            className={`${wrapperClassName} relative flex-1 bg-backgroundMain dark:!bg-[#23272b] placeholder:text-gray400 dark:placeholder:text-white placeholder:text-sm text-right outline-none border-none rounded-lg dark:!text-white w-full`}
            onClick={openCalendar}
          >
            <label className="text-sm text-gray400 dark:text-white">
              {title}
            </label>
            <InputWithIcon
              icon={<CalenderIcon />}
              inputProps={{
                value: value ? value.format("YYYY/MM/DD") : "",
                readOnly: true,
                placeholder: placeholder,
                className: `${childeClassName} mt-1 !bg-transparent border-none outline-none !text-main !cursor-pointer w-full`,
              }}
            />
          </div>
        )}
        showOtherDays={true}
        renderButton={(direction: string, handleClick: () => void) =>
          direction === "right" ? (
            <button
              onClick={handleClick}
              className="ml-2 bg-primary dark:bg-primary-10 w-6 h-6 rounded flex justify-center items-center hover:opacity-80 drop-shadow-lg"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 3L6.5 8L10.5 13"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleClick}
              className="mr-2 bg-primary dark:bg-primary-10 w-6 h-6 rounded flex justify-center items-center hover:opacity-80 drop-shadow-lg"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 3L9.5 8L5.5 13"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )
        }
      >
        <div className="flex justify-center items-center gap-1 top-4 absolute left-2"></div>
        <div className="w-11/12 bg-borderMain h-0.5 absolute top-14 ml-2" />
        <div className="flex flex-col gap-3 justify-end"></div>
      </DatePicker>
      <style jsx global>{`
        .rmdp-calendar {
          background-color: var(--background-main);
        }
        .rmdp-day {
          color: var(--main);
        }
        .rmdp-calendar {
          min-width: 300px;
          div {
            width: 300px;
          }
        }
        .rmdp-week {
          overflow: hidden;
        }
        .rmdp-week-day {
          margin-top: 20px;
          color: var(--primary);
        }
        .rmdp-selected {
          span {
            background-color: var(--primary) !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomDatePicker;
