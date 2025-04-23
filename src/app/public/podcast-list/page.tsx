import { GetCmsByContentType } from "@/api/services/cms";
import AudioBookView from "@/views/audio-book";
import { cookies } from "next/headers";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پادکست‌های انگلیسی با ترجمه فارسی | زبانو",
  description:
    "دانلود و گوش دادن به پادکست‌های انگلیسی آموزشی با زیرنویس فارسی و متن دو زبانه. یادگیری زبان انگلیسی با پادکست‌های روز دنیا، تقویت مهارت شنیداری و مکالمه، و آشنایی با فرهنگ و اصطلاحات کاربردی.",
  keywords: [
    "پادکست انگلیسی با ترجمه فارسی",
    "پادکست آموزش زبان انگلیسی",
    "دانلود پادکست انگلیسی با متن",
    "پادکست انگلیسی برای تقویت مکالمه",
    "پادکست با زیرنویس فارسی",
    "یادگیری انگلیسی با پادکست",
    "پادکست‌های آموزشی انگلیسی",
    "گوش دادن به پادکست انگلیسی",
    "متن دوزبانه پادکست",
    "تقویت لیسنینگ با پادکست",
    "آموزش اصطلاحات انگلیسی با پادکست",
    "پادکست رایگان زبان انگلیسی",
  ],
  alternates: {
    canonical: "https://zabano.com/public/podcast-list",
  },
  openGraph: {
    title: "پادکست‌های انگلیسی با ترجمه فارسی | یادگیری زبان با پادکست",
    description:
      "مجموعه‌ای از بهترین پادکست‌های انگلیسی با زیرنویس فارسی و متن دو زبانه. تقویت مهارت شنیداری، مکالمه و یادگیری لغات و اصطلاحات کاربردی با گوش دادن به پادکست‌های آموزشی.",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com/public/podcast-list",
    images: [
      {
        url: "https://zabano.com/images/zabano-podcast-learning.jpg",
        width: 1200,
        height: 630,
        alt: "یادگیری زبان انگلیسی با پادکست - زبانو",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "پادکست‌های انگلیسی با ترجمه فارسی | زبانو",
    description:
      "یادگیری زبان انگلیسی با گوش دادن به پادکست‌های آموزشی همراه با زیرنویس فارسی و متن دوزبانه.",
    images: ["https://zabano.com/images/zabano-podcast-learning.jpg"],
  },
  other: {
    "application/ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "پادکست‌های انگلیسی با ترجمه فارسی",
        description:
          "مجموعه پادکست‌های آموزشی انگلیسی با زیرنویس فارسی برای یادگیری زبان",
        numberOfItems: 100,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "PodcastEpisode",
              name: "پادکست‌های آموزشی زبان انگلیسی",
              inLanguage: ["en", "fa"],
            },
          },
        ],
        provider: {
          "@type": "Organization",
          name: "زبانو",
          url: "https://zabano.com",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "پادکست چگونه به یادگیری زبان انگلیسی کمک می‌کند؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "پادکست به تقویت مهارت شنیداری و درک مطلب، آشنایی با لهجه‌های مختلف، یادگیری اصطلاحات روزمره و بهبود مکالمه کمک می‌کند. با استفاده از پادکست‌های زبانو که همراه با زیرنویس فارسی و انگلیسی هستند، می‌توانید زبان انگلیسی را در بافت واقعی و کاربردی یاد بگیرید.",
            },
          },
          {
            "@type": "Question",
            name: "امکانات ویژه پادکست‌های زبانو چیست؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "در زبانو می‌توانید روی کلمات پادکست کلیک کنید و معنی، تلفظ و مثال‌های آن را ببینید، کلمات را به فلش‌کارت اضافه کنید، تمرین تلفظ انجام دهید، نکات گرامری را بررسی کنید و با تکرار جملات، مهارت شنیداری و گفتاری خود را تقویت کنید.",
            },
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "زبانو",
            item: "https://zabano.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "آموزش زبان انگلیسی",
            item: "https://zabano.com/public",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "پادکست انگلیسی با ترجمه",
            item: "https://zabano.com/public/podcast-list",
          },
        ],
      },
    ]),
  },
};

const PodcastListPage = async () => {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const podcastList = await GetCmsByContentType(4, accessToken);

  return <AudioBookView audioBooks={podcastList} contentType={4} />;
};

export default PodcastListPage;
