import { GetCmsByContentType } from "@/api/services/cms";
import AudioBookView from "@/views/audio-book";
import { cookies } from "next/headers";
import React from "react";
import { Metadata } from "next";

// Import musicFaqs from the view component
const musicFaqs = [
  {
    question: "چگونه گوش دادن به موسیقی انگلیسی به یادگیری زبان کمک می‌کند؟",
    answer:
      "موسیقی انگلیسی به بهبود تلفظ، درک شنیداری، یادگیری اصطلاحات و لغات جدید، و آشنایی با فرهنگ زبان انگلیسی کمک می‌کند. همچنین، ریتم و ملودی موسیقی باعث می‌شود کلمات و عبارات راحت‌تر در ذهن ماندگار شوند.",
  },
  {
    question: "آیا همه موسیقی‌های موجود در زبانو زیرنویس و ترجمه دارند؟",
    answer:
      "بله، تمام موسیقی‌های ارائه شده در زبانو دارای زیرنویس انگلیسی و ترجمه فارسی هستند. این ویژگی به شما کمک می‌کند معنای دقیق اشعار را درک کنید و با کلمات و اصطلاحات جدید آشنا شوید.",
  },
  {
    question: "موسیقی‌های با سطح ابتدایی و فوق ابتدایی چه تفاوتی دارند؟",
    answer:
      "موسیقی‌های سطح ابتدایی دارای کلمات ساده‌تر، تلفظ واضح‌تر و ریتم آرام‌تری هستند که برای زبان‌آموزان تازه‌کار مناسب‌تر است. موسیقی‌های سطح فوق ابتدایی شامل اصطلاحات پیچیده‌تر، سرعت بیشتر و گاهی اسلنگ و اصطلاحات عامیانه هستند که برای تقویت مهارت‌های پیشرفته‌تر مناسب است.",
  },
  {
    question: "چطور می‌توانم از موسیقی‌ها برای یادگیری بهتر استفاده کنم؟",
    answer:
      "ابتدا بدون مشاهده متن به موسیقی گوش دهید و سعی کنید تا حد امکان آن را درک کنید. سپس با زیرنویس موسیقی را گوش کنید و لغات جدید را یادداشت کنید. تکرار و همخوانی با موسیقی به بهبود تلفظ و روان‌تر شدن صحبت کردن شما کمک می‌کند. همچنین، می‌توانید با استفاده از بخش تمرین، درک خود را بسنجید.",
  },
];

export const metadata: Metadata = {
  title: "موزیک انگلیسی با ترجمه فارسی | زبانو",
  description:
    "دانلود و گوش دادن به بهترین آهنگ‌های انگلیسی با زیرنویس فارسی و متن دو زبانه. یادگیری زبان انگلیسی از طریق موسیقی روز دنیا، تقویت مهارت شنیداری و تلفظ صحیح کلمات با گوش دادن به موزیک‌های اصلی انگلیسی همراه با ترجمه.",
  keywords: [
    "آهنگ انگلیسی با ترجمه فارسی",
    "یادگیری انگلیسی با موسیقی",
    "دانلود موزیک انگلیسی با متن",
    "آهنگ انگلیسی برای تقویت لیسنینگ",
    "موزیک انگلیسی با زیرنویس فارسی",
    "موزیک برای یادگیری زبان انگلیسی",
    "آهنگ‌های محبوب انگلیسی با ترجمه",
    "گوش دادن به موسیقی انگلیسی",
    "متن دوزبانه آهنگ‌های انگلیسی",
    "یادگیری لغات انگلیسی با آهنگ",
    "تلفظ صحیح انگلیسی با موسیقی",
    "آموزش زبان با موزیک",
  ],
  alternates: {
    canonical: "https://zabano.com/public/music-list",
  },
  openGraph: {
    title: "موزیک انگلیسی با ترجمه فارسی | یادگیری زبان با آهنگ",
    description:
      "مجموعه بی‌نظیری از آهنگ‌های انگلیسی با زیرنویس فارسی و متن دو زبانه. تقویت مهارت شنیداری و یادگیری لغات جدید با گوش دادن به موزیک‌های اصلی انگلیسی روز دنیا.",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com/public/music-list",
    images: [
      {
        url: "https://zabano.com/images/zabano-music-learning.jpg",
        width: 1200,
        height: 630,
        alt: "یادگیری زبان انگلیسی با موسیقی - زبانو",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "موزیک انگلیسی با ترجمه فارسی | زبانو",
    description:
      "یادگیری زبان انگلیسی با گوش دادن به آهنگ‌های روز دنیا همراه با زیرنویس فارسی و متن دوزبانه.",
    images: ["https://zabano.com/images/zabano-music-learning.jpg"],
  },
  other: {
    "application/ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "MusicPlaylist",
        name: "آهنگ‌های انگلیسی با ترجمه فارسی",
        description:
          "مجموعه آهنگ‌های انگلیسی با زیرنویس فارسی برای یادگیری زبان",
        numTracks: 50,
        inLanguage: ["en", "fa"],
        educationalUse: "language learning",
        provider: {
          "@type": "Organization",
          name: "زبانو",
          url: "https://zabano.com",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: musicFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
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
            name: "موزیک انگلیسی با ترجمه",
            item: "https://zabano.com/public/music-list",
          },
        ],
      },
    ]),
  },
};

const MusicListPage = async () => {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const audioBooks = await GetCmsByContentType(2, accessToken);

  return <AudioBookView audioBooks={audioBooks} contentType={2} />;
};

export default MusicListPage;
