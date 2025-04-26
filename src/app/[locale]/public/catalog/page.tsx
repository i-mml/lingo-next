import { GetCmsByBanner, GetCmsByContentType } from "@/api/services/cms";
import CatalogView from "@/views/catalog";
import { cookies } from "next/headers";
import React from "react";
import { Metadata } from "next";
import { localesDictionary } from "@/constants/locales";

// Catalog FAQs data
const catalogFaqs = [
  {
    question: "چرا یادگیری زبان با فیلم و سریال مؤثر است؟",
    answer:
      "فیلم و سریال‌ها زبان را در بافت واقعی و کاربردی نشان می‌دهند. شما با لهجه‌های مختلف، اصطلاحات روزمره و فرهنگ زبان آشنا می‌شوید. همچنین، داستان جذاب و تصاویر بصری به یادگیری عمیق‌تر و ماندگارتر کمک می‌کند. تماشای فیلم‌ها باعث تقویت همزمان مهارت‌های شنیداری، خواندن (با زیرنویس) و درک مطلب می‌شود.",
  },
  {
    question: "آیا تمام فیلم‌ها و سریال‌های زبانو زیرنویس فارسی دارند؟",
    answer:
      "بله، تمام فیلم‌ها و سریال‌های موجود در زبانو دارای زیرنویس فارسی و انگلیسی هستند. همچنین امکان نمایش همزمان هر دو زیرنویس وجود دارد که به درک بهتر محتوا کمک می‌کند.",
  },
  {
    question: "فیلم‌ها و سریال‌ها برای چه سطحی از زبان‌آموزان مناسب هستند؟",
    answer:
      "زبانو فیلم‌ها و سریال‌ها را برای سطوح مختلف زبان‌آموزی دسته‌بندی کرده است. برای مبتدیان، محتوای ساده‌تر با زبان روزمره و برای افراد پیشرفته‌تر، فیلم‌های پیچیده‌تر با موضوعات متنوع‌تر ارائه شده‌اند. هر فیلم با سطح دشواری مشخص دسته‌بندی شده است تا انتخاب مناسب آسان‌تر باشد.",
  },
  {
    question: "چطور می‌توانم از فیلم‌ها برای یادگیری زبان استفاده کنم؟",
    answer:
      "ابتدا بخشی از فیلم را بدون زیرنویس تماشا کنید و سعی کنید تا حد امکان محتوا را درک کنید. سپس با زیرنویس انگلیسی و در صورت نیاز با زیرنویس فارسی تماشا کنید. روی کلمات و عبارات ناآشنا متمرکز شوید و آن‌ها را فلش‌کارت کنید. تکرار جملات مهم به بهبود تلفظ و مهارت گفتاری شما کمک می‌کند. می‌توانید بخش‌های مورد علاقه خود را چندین بار تماشا کنید.",
  },
  {
    question: "مزیت استفاده از زبانو برای تماشای فیلم‌های زبان اصلی چیست؟",
    answer:
      "زبانو با استفاده از هوش مصنوعی، امکانات ویژه‌ای مانند کلیک روی کلمات برای دیدن معنی و تلفظ، ذخیره لغات جدید، تمرین تلفظ و دسترسی به توضیحات گرامری را فراهم می‌کند. همچنین، پیشرفت یادگیری شما را ردیابی می‌کند و محتوای متناسب با سطح زبانی شما پیشنهاد می‌دهد.",
  },
];

const CatalogPage = async ({ params }: { params: { locale: string } }) => {
  const { locale } = params;

  const catalogs = await GetCmsByContentType(
    1,
    "",
    localesDictionary?.[locale as keyof typeof localesDictionary]?.language_id
  );
  const banners = await GetCmsByBanner(
    1,
    "",
    localesDictionary?.[locale as keyof typeof localesDictionary]?.language_id
  );

  return (
    <>
      <CatalogView
        catalogData={catalogs}
        banners={banners}
        faqData={catalogFaqs}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "یادگیری زبان انگلیسی با فیلم و سریال | زبانو",
          description:
            "مجموعه فیلم و سریال ها برای یادگیری زبان به کمک هوش مصنوعی با زبانو",
          mainEntity: [
            ...banners.map((banner) => ({
              "@type": "CreativeWork",
              name: banner?.title,
              description: banner?.description,
              image: banner?.image,
            })),
            ...catalogs?.map((node) =>
              node?.movies?.map((item) => ({
                "@type": "CreativeWork",
                name: item?.title,
                description: item?.description,
                image: item?.image,
              }))
            ),
          ],
        })}
      </script>
    </>
  );
};

export default CatalogPage;

export const metadata: Metadata = {
  title: "یادگیری زبان انگلیسی با فیلم و سریال | زبانو",
  description:
    "مجموعه فیلم و سریال ها برای یادگیری زبان به کمک هوش مصنوعی با زبانو",
  keywords: [
    "فیلم آموزش زبان انگلیسی",
    "سریال آموزش زبان",
    "یادگیری زبان با فیلم",
    "یادگیری زبان با سریال",
    "فیلم زبان انگلیسی",
    "سریال زبان انگلیسی",
    "آموزش زبان با فیلم",
    "آموزش زبان با سریال",
    "زیرنویس فارسی انگلیسی",
  ],
  alternates: {
    canonical: "https://zabano.com/public/catalog",
  },
  openGraph: {
    title: "یادگیری زبان با فیلم و سریال | زبانو",
    description:
      "مجموعه فیلم و سریال ها برای یادگیری زبان به کمک هوش مصنوعی با زبانو",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com/public/catalog",
    images: [
      {
        url: "https://zabano.com/zabano-main-logo.png",
        width: 1200,
        height: 630,
        alt: "یادگیری زبان با فیلم و سریال | زبانو",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "یادگیری زبان با فیلم و سریال | زبانو",
    description: "یادگیری زبان انگلیسی با بهترین فیلم‌ها و سریال‌های روز دنیا",
    images: ["https://zabano.com/zabano-main-logo.png"],
  },
  other: {
    "application/ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "یادگیری زبان انگلیسی با فیلم و سریال | زبانو",
        description:
          "مجموعه فیلم و سریال ها برای یادگیری زبان به کمک هوش مصنوعی با زبانو",
        mainEntity: [], // This will be filled at runtime
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: catalogFaqs.map((faq) => ({
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
            name: "فیلم و سریال انگلیسی با زیرنویس",
            item: "https://zabano.com/public/catalog",
          },
        ],
      },
    ]),
  },
};
