import React from "react";
import { VocabularyListItem } from "@/api/types/education";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import HeroLottie from "./components/HeroLottie";

const VocabularyView = ({ data }: { data: VocabularyListItem[] }) => {
  return (
    <div className={`min-h-[80vh] md:min-h-[60vh] pt-[5vh] gap-6 px-[5%]`}>
      <header className="mb-6 w-full flex items-center flex-wrap gap-5 ">
        <HeroLottie />
        <h1 className="text-lg lg:text-3xl font-bold text-main">
          منابع بین‌المللی یادگیری لغات انگلیسی با استاندارد جهانی
        </h1>
        <p className="text-lg text-gray-700 leading-8 w-full">
          یادگیری لغات انگلیسی با استفاده از معتبرترین کتاب‌های آموزشی جهان مثل{" "}
          <strong>Oxford 3000</strong>، <strong>Longman Communication</strong> و{" "}
          <strong>Essential Words</strong>
          <br /> مسیر یادگیری زبان رو برای شما شیرین و آسان کردیم! از سطح پایه
          تا پیشرفته، همراه با سیستم آموزشی هوشمند و طبقه‌بندی حرفه‌ای لغات.
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 content-between gap-4 md:gap-5">
        {data?.map((item: VocabularyListItem) => (
          <Link
            href={`/public/vocabulary/${item?.id}`}
            key={item?.id}
            className="w-full gird place-items-center"
          >
            <Image
              width={179}
              height={290}
              alt={item?.title}
              src={item?.image}
              className="w-[179px] h-[290px] md:w-[212px] md:h-[344px] rounded-lg object-cover"
            />
            <div
              dir="ltr"
              className="text-main mt-2 text-lg md:text-xl font-medium text-left line-clamp-1"
            >
              {item?.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VocabularyView;
