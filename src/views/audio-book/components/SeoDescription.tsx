"use client";

import React, { FC, useState } from "react";
import { isMobile } from "react-device-detect";

// Importing FAQ data types
interface FaqItem {
  question: string;
  answer: string;
}

interface SeoDescriptionProps {
  contentType: number;
  audioBookFaqs: FaqItem[];
  musicFaqs: FaqItem[];
  podcastFaqs: FaqItem[];
  preferredLanguage?: number;
}

const SeoDescription: FC<SeoDescriptionProps> = ({
  contentType,
  audioBookFaqs,
  musicFaqs,
  podcastFaqs,
  preferredLanguage = 2,
}) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  let title = "";
  let description = "";
  let faqs = audioBookFaqs;

  const language =
    preferredLanguage === 2
      ? "انگلیسی"
      : preferredLanguage === 5
      ? "آلمانی"
      : "انگلیسی";

  if (contentType === 2) {
    title = `منابع موسیقی ${language} برای یادگیری زبان`;
    description = `یادگیری زبان ${language} با استفاده از موسیقی یکی از مؤثرترین و لذت‌بخش‌ترین روش‌هاست. موسیقی به شما کمک می‌کند تا ریتم و آهنگ زبان ${language} را بهتر درک کنید، با لغات و اصطلاحات جدید آشنا شوید، تلفظ صحیح را بیاموزید و زبان را در بافت طبیعی و کاربردی آن تجربه کنید. در زبانو، مجموعه‌ای از بهترین موسیقی‌های ${language} را با زیرنویس و ترجمه فارسی گردآوری کرده‌ایم تا تجربه یادگیری شما را غنی‌تر سازیم. موسیقی‌ها در دو سطح ابتدایی و فوق ابتدایی دسته‌بندی شده‌اند تا متناسب با سطح زبانی خود، بهترین گزینه را انتخاب کنید.`;
    faqs = musicFaqs;
  } else if (contentType === 3) {
    title = `منابع کتاب‌های صوتی ${language} برای تقویت مهارت‌های زبانی`;
    description = `کتاب‌های صوتی ابزاری قدرتمند برای تقویت مهارت‌های شنیداری و درک مطلب در زبان ${language} هستند. با گوش دادن به کتاب‌های صوتی، نه تنها دایره لغات خود را گسترش می‌دهید، بلکه با تلفظ صحیح کلمات، الگوهای جمله‌سازی و ریتم طبیعی زبان ${language} آشنا می‌شوید. زبانو مجموعه‌ای از بهترین کتاب‌های صوتی ${language} را در سطوح مختلف ارائه می‌دهد که همگی با زیرنویس ${language} و ترجمه فارسی همراه هستند. کتاب‌های صوتی در دو سطح ابتدایی و فوق ابتدایی طبقه‌بندی شده‌اند تا بتوانید متناسب با توانایی زبانی خود، منابع مناسب را انتخاب کنید.`;
    faqs = audioBookFaqs;
  } else {
    title = `مجموعه پادکست‌های ${language} برای بهبود مهارت شنیداری`;
    description = `پادکست‌ها منبع عالی برای تقویت مهارت شنیداری و آشنایی با ${language} محاوره‌ای روزمره هستند. با گوش دادن به پادکست‌های ${language}، شما با لهجه‌ها و سبک‌های گفتاری مختلف آشنا می‌شوید، اصطلاحات کاربردی و عبارات رایج را می‌آموزید و مهارت درک شنیداری خود را در موقعیت‌های واقعی تقویت می‌کنید. در زبانو، مجموعه‌ای متنوع از پادکست‌های ${language} با موضوعات جذاب و کاربردی را با زیرنویس و ترجمه فارسی گردآوری کرده‌ایم. این پادکست‌ها در سطوح مختلف دسته‌بندی شده‌اند تا بتوانید متناسب با توانایی خود، بهترین منابع را انتخاب کنید.`;
    faqs = podcastFaqs;
  }

  const maxDescriptionLength = isMobile ? 150 : 250;
  const shouldTruncate = description.length > maxDescriptionLength;
  const displayDescription =
    shouldTruncate && !showMore
      ? `${description.substring(0, maxDescriptionLength)}...`
      : description;

  return (
    <div className="w-[90%] px-3 md:px-6 mx-auto py-6 md:pt-10 bg-backgroundMain rounded-lg mb-10">
      <h2 className="text-xl md:text-2xl font-bold text-main mb-4">{title}</h2>
      <p className="text-base md:text-lg text-gray400 leading-7 text-justify">
        {displayDescription}
      </p>
      {shouldTruncate && (
        <button
          onClick={toggleShowMore}
          className="w-full mt-2 text-sm text-main hover:text-opacity-80 md:text-base"
        >
          {showMore ? "نمایش کمتر" : "مشاهده بیشتر"}
        </button>
      )}
    </div>
  );
};

export default SeoDescription;
