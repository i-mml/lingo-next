import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import React from "react";
import { TeacherItem } from "@/api/types/auth";
import Link from "next/link";
import EnglishFlag from "@/assets/english-flag.svg";
import PrimaryButton from "@/components/shared/PrimaryButton";
import OutlineButton from "@/components/shared/OutlineButton";

const TeacherCard = (teacher: TeacherItem) => {
  return (
    <div className="bg-backgroundMain rounded-lg px-4 md:px-6 py-4 md:py-6 cursor-pointer border border-borderMain hover:border-primary">
      <div className="flex flex-col md:flex-row">
        <Link
          href={`/public/teachers/${teacher.id}`}
          className="flex items-center gap-4"
        >
          <img
            src={teacher.avatar || ""}
            alt={teacher.name}
            className="w-14 h-14 md:w-20 md:h-20 rounded-full object-cover"
          />
          <div>
            <div className="text-[16px] md:text-lg font-bold text-main">
              {teacher?.name}
            </div>
            <div className="flex items-center gap-2 mt-3 md:mt-5">
              {["A1", "A2"]?.map((level: string, index: number) => (
                <span
                  key={index}
                  className="bg-primary text-white font-semibold text-[12px] md:text-sm rounded-lg px-2 py-1"
                >
                  {level || ""}
                </span>
              ))}
            </div>
          </div>
        </Link>
        <div className="mr-auto w-fit mt-4 md:mt-0 flex items-center gap-2">
          <PrimaryButton onClick={() => {}} className="">
            رزرو آزمایشی
          </PrimaryButton>
          <OutlineButton onClick={() => {}} className="w-10">
            <BookmarkBorderIcon />
          </OutlineButton>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-2">
        <div className="bg-backgroundLayout flex items-center justify-center gap-2 rounded-lg py-2">
          <span className="text-sm md:text-[16px] text-gray400 ">زبان:</span>
          <div className="flex items-center gap-1 text-main">
            <EnglishFlag className="w-5 h-5" />
            <span>انگلیسی</span>
          </div>
        </div>
        {/* <div className="bg-gray-200 dark:bg-gray-400 flex items-center justify-center gap-2 rounded-lg py-2">
          <span className="text-sm md:text-[16px] text-gray-500 dark:text-gray-300">زبان‌آموز:</span>
          <div className="flex items-center gap-0.5">
            <PeopleOutlineIcon />
            <span>{teacher?.students} نفر</span>
          </div>
        </div> */}
        {/* <div className="bg-gray-200 dark:bg-gray-400 flex items-center justify-center rounded-lg py-2">
          <div className="flex items-center gap-0.5">
            <StarIcon className="!text-primary" />
            <span>{teacher?.rate?.rate_number}</span>
            <span>{`(${teacher?.rate?.total}) نظر`}</span>
          </div>
        </div>
        <div className="bg-gray-200 dark:bg-gray-400 flex items-center justify-center gap-2 rounded-lg py-2">
          <span className="text-sm md:text-[16px] text-gray-500 dark:text-gray-300">کلاس برگزار شده:</span>
          <div className="flex items-center gap-0.5">
            <MenuBookIcon />
            <span>{teacher?.sessions}</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TeacherCard;
