import { GetCmsByContentType } from "@/api/services/cms";
import AudioBookView from "@/views/audio-book";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

// FAQs for Audio Book page - matching those in the component
const audioBookFaqs = [
  {
    question: "چگونه کتاب‌های صوتی به یادگیری زبان انگلیسی کمک می‌کنند؟",
    answer:
      "کتاب‌های صوتی با تقویت مهارت شنیداری، آشنایی با تلفظ صحیح کلمات، افزایش دایره لغات و درک مفاهیم به صورت کاربردی به یادگیری زبان انگلیسی کمک می‌کنند. همچنین، شنیدن داستان‌ها و متون مختلف انگلیسی در قالب صوتی باعث می‌شود گوش شما به ریتم و آهنگ زبان انگلیسی عادت کند.",
  },
  {
    question: "آیا می‌توانم کتاب‌های صوتی را دانلود کنم؟",
    answer:
      "بله، امکان دانلود کتاب‌های صوتی برای اعضای زبانو فراهم است. پس از دانلود، می‌توانید بدون نیاز به اینترنت به آن‌ها گوش دهید. برای اینکار باید روی کتاب صوتی موردنظر کلیک کرده و در صفحه جزئیات، گزینه دانلود را انتخاب کنید.",
  },
  {
    question: "آیا کتاب‌های صوتی برای همه سطوح زبان‌آموزی مناسب هستند؟",
    answer:
      "بله، در زبانو کتاب‌های صوتی برای تمامی سطوح زبان‌آموزی از مبتدی تا پیشرفته طبقه‌بندی شده‌اند. شما می‌توانید متناسب با سطح زبان خود، کتاب صوتی مناسب را انتخاب کنید. برای زبان‌آموزان مبتدی، کتاب‌های ساده‌تر با سرعت گویش کمتر و برای افراد پیشرفته‌تر، کتاب‌های پیچیده‌تر با سرعت طبیعی ارائه شده است.",
  },
  {
    question: "تفاوت کتاب‌های صوتی با پادکست چیست؟",
    answer:
      "کتاب‌های صوتی معمولاً شامل خوانش کامل یک کتاب یا داستان هستند که توسط یک گوینده حرفه‌ای ضبط شده‌اند، در حالی که پادکست‌ها بیشتر گفتگو محور بوده و می‌توانند شامل مصاحبه، بحث یا آموزش موضوعات خاص باشند. کتاب‌های صوتی معمولاً ساختار منسجم‌تری داشته و برای تقویت مهارت خواندن و شنیدن همزمان مناسب‌تر هستند.",
  },
  {
    question:
      "چطور می‌توانم بیشترین بهره را از گوش دادن به کتاب‌های صوتی ببرم؟",
    answer:
      "برای بهره‌گیری بیشتر، توصیه می‌شود ابتدا به بخش‌های کوتاه گوش دهید و آن‌ها را تکرار کنید. سعی کنید بدون نگاه کردن به متن، محتوا را درک کنید. سپس متن را مطالعه کرده و مجدداً به صوت گوش دهید. یادداشت‌برداری از لغات و اصطلاحات جدید و تمرین تلفظ آن‌ها نیز به پیشرفت شما کمک خواهد کرد.",
  },
  {
    question: "چرا زبانو برای کتاب‌های صوتی، سطح‌بندی قائل شده است؟",
    answer:
      "سطح‌بندی کتاب‌های صوتی به شما کمک می‌کند تا متناسب با توانایی زبانی خود، منابع مناسب را انتخاب کنید. شروع از منابع خیلی دشوار می‌تواند باعث دلسردی شود، در حالی که منابع خیلی ساده ممکن است چالش‌برانگیز نباشند. سطح‌بندی «ابتدایی» و «فوق ابتدایی» در زبانو، به شما امکان می‌دهد مسیر یادگیری تدریجی و موفقیت‌آمیزی را طی کنید.",
  },
];

export const metadata: Metadata = {
  title: "کتاب‌های صوتی | زبانو",
  description:
    "دسترسی به مجموعه کامل کتاب‌های صوتی انگلیسی با ترجمه فارسی. یادگیری زبان انگلیسی با گوش دادن به کتاب‌های صوتی معتبر و شنیدن تلفظ صحیح کلمات. مناسب برای تقویت مهارت شنیداری و گفتاری.",
  keywords: [
    "کتاب صوتی انگلیسی",
    "دانلود کتاب صوتی انگلیسی",
    "کتاب صوتی زبان انگلیسی",
    "کتاب صوتی انگلیسی با ترجمه",
    "کتاب صوتی آموزش زبان",
    "کتاب صوتی انگلیسی رایگان",
    "کتاب صوتی انگلیسی برای تقویت listening",
    "کتاب صوتی انگلیسی با متن",
  ],
  alternates: {
    canonical: "https://zabano.com/public/audio-book",
  },
  openGraph: {
    title: "کتاب‌های صوتی انگلیسی | زبانو",
    description:
      "دسترسی به مجموعه کامل کتاب‌های صوتی انگلیسی با ترجمه فارسی. یادگیری زبان انگلیسی با گوش دادن به کتاب‌های صوتی معتبر و شنیدن تلفظ صحیح کلمات.",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com/public/audio-book",
    images: [
      {
        url: "https://zabano.com/zabano-main-logo.png",
        width: 1200,
        height: 630,
        alt: "کتاب‌های صوتی انگلیسی",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "کتاب‌های صوتی | زبانو",
    description:
      "دسترسی به مجموعه کامل کتاب‌های صوتی انگلیسی با ترجمه فارسی. یادگیری زبان انگلیسی با گوش دادن به کتاب‌های صوتی معتبر.",
    images: ["https://zabano.com/zabano-main-logo.png"],
  },
  other: {
    "application/ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "کتاب‌های صوتی انگلیسی با ترجمه فارسی",
        description:
          "مجموعه کتاب‌های صوتی انگلیسی با زیرنویس فارسی برای یادگیری زبان",
        numberOfItems: 100,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "Audiobook",
              name: "کتاب‌های صوتی آموزش زبان انگلیسی",
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
        mainEntity: audioBookFaqs.map((faq) => ({
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
            name: "کتاب‌های صوتی انگلیسی",
            item: "https://zabano.com/public/audio-book",
          },
        ],
      },
    ]),
  },
};

const AudioBookPage = async () => {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const audioBooks = await GetCmsByContentType(3, accessToken);

  return <AudioBookView audioBooks={audioBooks} contentType={3} />;
};

export default AudioBookPage;
