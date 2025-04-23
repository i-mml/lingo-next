import { GetCmsByBanner, GetCmsByContentType } from "@/api/services/cms";
import CatalogView from "@/views/catalog";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "آموزش رایگان زبان انگلیسی | دسترسی به محتوای رایگان | زبانو",
  description:
    "محتوای آموزشی رایگان برای یادگیری زبان انگلیسی در زبانو. دسترسی به فیلم‌ها، کتاب‌های صوتی، پادکست‌ها و منابع آموزشی رایگان برای مبتدیان تا پیشرفته. شروع یادگیری زبان انگلیسی بدون هزینه، همین امروز!",
  keywords: [
    "آموزش رایگان زبان انگلیسی",
    "منابع رایگان آموزش انگلیسی",
    "یادگیری رایگان انگلیسی",
    "کتاب صوتی انگلیسی رایگان",
    "فیلم آموزش انگلیسی رایگان",
    "پادکست انگلیسی رایگان",
    "محتوای آموزشی رایگان",
    "زبان انگلیسی بدون هزینه",
    "آموزش آنلاین رایگان انگلیسی",
  ],
  alternates: {
    canonical: "https://zabano.com/public/start-free",
  },
  openGraph: {
    title: "آموزش رایگان زبان انگلیسی | دسترسی به محتوای رایگان | زبانو",
    description:
      "محتوای آموزشی رایگان برای یادگیری زبان انگلیسی در زبانو. دسترسی به فیلم‌ها، کتاب‌های صوتی، پادکست‌ها و منابع آموزشی رایگان. شروع کنید، بدون نیاز به پرداخت!",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com/public/start-free",
    images: [
      {
        url: "https://zabano.com/zabano-main-logo.png",
        width: 1200,
        height: 630,
        alt: "آموزش رایگان زبان انگلیسی در زبانو",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "آموزش رایگان زبان انگلیسی | زبانو",
    description:
      "محتوای آموزشی رایگان برای یادگیری زبان انگلیسی در زبانو. دسترسی به فیلم‌ها، کتاب‌های صوتی و پادکست‌های رایگان برای همه سطوح.",
    images: ["https://zabano.com/zabano-main-logo.png"],
  },
};

const StartFreePage = async () => {
  const catalogs = await GetCmsByContentType(1);
  const banners = await GetCmsByBanner(1);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalPage",
            name: "آموزش رایگان زبان انگلیسی | زبانو",
            description:
              "محتوای آموزشی رایگان برای یادگیری زبان انگلیسی در زبانو. دسترسی به فیلم‌ها، کتاب‌های صوتی، پادکست‌ها و منابع آموزشی رایگان برای مبتدیان تا پیشرفته.",
            provider: {
              "@type": "Organization",
              name: "زبانو",
              url: "https://zabano.com",
            },
            about: {
              "@type": "Thing",
              name: "آموزش زبان انگلیسی",
            },
            audience: {
              "@type": "Audience",
              audienceType: "همه علاقمندان به یادگیری زبان انگلیسی",
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "IRR",
              availability: "https://schema.org/InStock",
            },
            learningResourceType: "محتوای چندرسانه‌ای",
            educationalLevel: "همه سطوح از مبتدی تا پیشرفته",
            inLanguage: "fa-IR",
            potentialAction: {
              "@type": "StartAction",
              target: "https://zabano.com/public/start-free",
            },
          }),
        }}
      />
      <CatalogView catalogData={catalogs} banners={banners} isFreeOnly />
    </>
  );
};

export default StartFreePage;
