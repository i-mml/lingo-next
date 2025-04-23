import DownloadAppView from "@/views/download-app";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "دانلود اپلیکیشن زبانو | آموزش زبان انگلیسی در موبایل و تبلت",
  description:
    "دانلود اپلیکیشن زبانو برای گوشی‌های اندروید و آیفون. یادگیری زبان انگلیسی با اپلیکیشن زبانو در هر زمان و هر مکان. دسترسی به فیلم، پادکست و کتاب صوتی با ترجمه فارسی روی موبایل.",
  keywords: [
    "دانلود اپلیکیشن زبانو",
    "اپلیکیشن آموزش زبان انگلیسی",
    "دانلود اپلیکیشن اندروید زبانو",
    "یادگیری زبان با موبایل",
    "اپلیکیشن زبان با ترجمه فارسی",
    "آموزش زبان آنلاین",
    "اپلیکیشن زبان رایگان",
    "دانلود برنامه زبانو",
    "اپلیکیشن موبایل یادگیری زبان",
    "نرم افزار آموزش زبان انگلیسی",
  ],
  alternates: {
    canonical: "https://zabano.com/public/download-app",
  },
  openGraph: {
    title: "دانلود اپلیکیشن زبانو | آموزش زبان انگلیسی در موبایل",
    description:
      "دانلود اپلیکیشن زبانو برای گوشی‌های اندروید و آیفون. یادگیری زبان انگلیسی با اپلیکیشن زبانو در هر زمان و هر مکان.",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com/public/download-app",
    images: [
      {
        url: "https://zabano.com/zabano-app-screenshot.png",
        width: 1200,
        height: 630,
        alt: "اپلیکیشن زبانو - آموزش زبان انگلیسی",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "دانلود اپلیکیشن زبانو | آموزش زبان انگلیسی در موبایل",
    description:
      "یادگیری زبان انگلیسی با اپلیکیشن زبانو در هر زمان و هر مکان. دانلود رایگان برای اندروید و آیفون.",
    images: ["https://zabano.com/zabano-app-screenshot.png"],
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "زبانو",
      operatingSystem: "Android, iOS",
      applicationCategory: "EducationalApplication",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "IRR",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1250",
      },
      description:
        "اپلیکیشن آموزش زبان انگلیسی با فیلم، پادکست و کتاب صوتی همراه با ترجمه فارسی",
    }),
  },
};

const DownloadAppPage = () => {
  return <DownloadAppView />;
};

export default DownloadAppPage;
