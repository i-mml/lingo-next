import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import React from "react";
import { TeacherItem } from "@/api/types/auth";
import Link from "next/link";
import EnglishFlag from "@/assets/english-flag.svg";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import OutlineButton from "@/components/shared/OutlineButton";
import { Star } from "@mui/icons-material";

const TeacherCard = (teacher: TeacherItem) => {
  return (
    <div className="bg-backgroundMain backdrop-blur-md rounded-2xl shadow-xl border border-borderMain p-6 flex flex-col md:flex-row items-center gap-6 max-w-2xl mx-auto my-6 transition hover:shadow-2xl">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <Image
          src={teacher.avatar}
          alt={teacher.name}
          width={90}
          height={90}
          className="w-24 h-24 rounded-full border-4 border-primary object-cover"
        />
      </div>
      {/* Info */}
      <div className="flex-1 flex flex-col gap-2 text-right">
        <div className="flex flex-row items-start gap-2 md:gap-4 mb-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <span className="text-xl font-bold text-main">{teacher.name}</span>
            <span className="text-sm text-gray300">
              {/* NEED {teacher.title} */}
              مدرس ارشد زبان انگلیسی
            </span>
          </div>

          <span className="flex items-center mr-auto gap-1 text-yellow-500 font-bold text-sm">
            <Star className="w-5 h-5" /> {/* NEED {teacher.rating} */}
            <span>4.8</span>
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-1">
          {/* NEED {teacher.levels} */}
          {["A1", "A2", "B1"].map((level) => (
            <span
              key={level}
              className="bg-backgroundLayout text-main px-3 py-1 rounded-full text-xs font-bold shadow shadow-backgroundDisabled"
            >
              {level}
            </span>
          ))}
        </div>

        <div className="text-gray300 text-xs mt-2">
          {/* NEED {teacher.bio} */}
          با بیش از 7 سال تجربه تدرس و رویکرد تعاملی برای یادگیر بهتر
        </div>
        <div className="flex flex-wrap gap-4 mt-2 items-center">
          <span className="text-xs text-gray400">
            کلاس برگزار‌شده:{" "}
            <span className="font-bold text-main">
              {/* NEED {teacher.classesCount}  */}
              563 ساعت
            </span>
          </span>
          <span className="text-xs text-gray400">
            دانش‌آموزان:{" "}
            <span className="font-bold text-main">
              {/* NEED {teacher.students} */}
              198
            </span>
          </span>
          <span className="text-xs text-gray400">
            قیمت هر جلسه:{" "}
            <span className="font-semibold text-green-500">
              {/* NEED {teacher.price} */}
              100000 تومان
            </span>
          </span>
        </div>
        <div className="flex gap-3 mt-4">
          <PrimaryButton
            className="w-1/2 text-base rounded-xl shadow-md"
            // disabled={!teacher.available}
          >
            {/* NEED {teacher.available ? "رزرو آزمایشی" : "فعلاً ناموجود"} */}
            رزرو آزمایشی
          </PrimaryButton>
          <OutlineButton className=" w-1/2 text-base">
            مشاهده پروفایل
          </OutlineButton>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
