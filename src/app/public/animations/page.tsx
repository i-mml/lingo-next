import { GetCmsByBanner, GetCmsByContentType } from "@/api/services/cms";
import CatalogView from "@/views/catalog";
import { cookies } from "next/headers";
import React from "react";
import { Metadata } from "next";

// Animation FAQs data
const animationFaqs = [
  {
    question: "چرا انیمیشن برای یادگیری زبان مفید است؟",
    answer:
      "انیمیشن‌ها با زبان ساده‌تر و تلفظ واضح‌تر، محیط یادگیری جذابی را فراهم می‌کنند. آن‌ها موقعیت‌های روزمره را با تصاویر بصری همراه می‌کنند که به درک بهتر مفاهیم کمک می‌کند. همچنین، داستان‌های سرگرم‌کننده انیمیشن‌ها انگیزه بیشتری برای یادگیری ایجاد می‌کند.",
  },
  {
    question: "انیمیشن‌های زبانو برای چه سنینی مناسب هستند؟",
    answer:
      "انیمیشن‌های زبانو برای همه سنین مناسب هستند. برای کودکان و نوجوانان، انیمیشن‌های ساده‌تر با زبان روزمره و برای بزرگسالان، انیمیشن‌های پیچیده‌تر با موضوعات متنوع‌تر ارائه شده‌اند. هر انیمیشن با سطح دشواری مشخص دسته‌بندی شده است.",
  },
  {
    question: "آیا انیمیشن‌ها زیرنویس فارسی دارند؟",
    answer:
      "بله، تمام انیمیشن‌های موجود در زبانو دارای زیرنویس فارسی و انگلیسی هستند. همچنین امکان نمایش همزمان هر دو زیرنویس وجود دارد که به درک بهتر محتوا کمک می‌کند.",
  },
  {
    question: "چطور می‌توانم از انیمیشن‌ها برای یادگیری زبان استفاده کنم؟",
    answer:
      "ابتدا انیمیشن را بدون زیرنویس تماشا کنید و سعی کنید تا حد امکان محتوا را درک کنید. سپس با زیرنویس انگلیسی و در صورت نیاز با زیرنویس فارسی تماشا کنید. روی کلمات و عبارات ناآشنا متمرکز شوید و آن‌ها را فلش‌کارت کنید. تکرار جملات مهم به بهبود تلفظ و مهارت گفتاری شما کمک می‌کند.",
  },
  {
    question: "مزیت استفاده از زبانو برای تماشای انیمیشن‌های زبان اصلی چیست؟",
    answer:
      "زبانو با استفاده از هوش مصنوعی، امکانات ویژه‌ای مانند کلیک روی کلمات برای دیدن معنی و تلفظ، ذخیره لغات جدید، تمرین تلفظ و دسترسی به توضیحات گرامری را فراهم می‌کند. همچنین، پیشرفت یادگیری شما را ردیابی می‌کند و محتوای متناسب با سطح زبانی شما پیشنهاد می‌دهد.",
  },
];

export const metadata: Metadata = {
  title: "یادگیری زبان انگلیسی با انیمیشن | زبانو",
  description:
    "تماشای انیمیشن‌های انگلیسی با زیرنویس فارسی و انگلیسی برای یادگیری زبان به کمک هوش مصنوعی. انیمیشن‌های جذاب و آموزنده برای تقویت مهارت‌های زبانی.",
  keywords: [
    "یادگیری زبان با انیمیشن",
    "انیمیشن انگلیسی با زیرنویس فارسی",
    "آموزش زبان با انیمیشن",
    "انیمیشن برای یادگیری زبان",
    "انیمیشن با زیرنویس دوزبانه",
    "تقویت زبان با انیمیشن",
    "انیمیشن‌های آموزشی زبان انگلیسی",
    "یادگیری لغات با انیمیشن",
  ],
  alternates: {
    canonical: "https://zabano.com/public/animations",
  },
  openGraph: {
    title: "یادگیری زبان انگلیسی با انیمیشن | زبانو",
    description:
      "تماشای انیمیشن‌های انگلیسی با زیرنویس فارسی برای یادگیری مؤثر زبان. انیمیشن‌های جذاب با امکانات ویژه هوش مصنوعی برای تقویت همه مهارت‌های زبانی.",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com/public/animations",
    images: [
      {
        url: "https://zabano.com/images/animations-learning.jpg",
        width: 1200,
        height: 630,
        alt: "یادگیری زبان با انیمیشن - زبانو",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "یادگیری زبان انگلیسی با انیمیشن | زبانو",
    description:
      "تماشای انیمیشن‌های انگلیسی با زیرنویس فارسی برای یادگیری زبان",
    images: ["https://zabano.com/images/animations-learning.jpg"],
  },
  other: {
    "application/ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "یادگیری زبان با انیمیشن",
        description:
          "مجموعه انیمیشن های جذاب برای یادگیری زبان به کمک هوش مصنوعی",
        mainEntity: [], // This will be filled at runtime
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: animationFaqs.map((faq) => ({
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
            name: "یادگیری زبان با انیمیشن",
            item: "https://zabano.com/public/animations",
          },
        ],
      },
    ]),
  },
};

const CatalogPage = async () => {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const catalogs = await GetCmsByContentType(6, accessToken);
  const banners = await GetCmsByBanner(6, accessToken);

  return (
    <>
      <CatalogView
        catalogData={catalogs}
        banners={banners}
        isAnimation={true}
        faqData={animationFaqs}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "یادگیری زبان با انیمیشن",
          description:
            "مجموعه انیمیشن های جذاب برای یادگیری زبان به کمک هوش مصنوعی",
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
