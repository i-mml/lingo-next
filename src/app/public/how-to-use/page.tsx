import HowToUseView from "@/views/how-to-use";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "راهنمای استفاده از زبانو | آموزش زبان با فیلم و سریال",
  description:
    "راهنمای کامل و تصویری استفاده از اپلیکیشن زبانو برای یادگیری زبان انگلیسی. آموزش گام به گام تمام بخش‌های سایت، نحوه تماشای فیلم‌ها و سریال‌ها با زیرنویس دوزبانه، گوش دادن به موسیقی و کتاب صوتی، یادگیری گرامر، لغات و تمرین مکالمه به زبان انگلیسی.",
  keywords: [
    "راهنمای اپلیکیشن زبانو",
    "آموزش استفاده از زبانو",
    "نحوه کار با سایت زبانو",
    "راهنمای تصویری زبانو",
    "آموزش ویژگی‌های زبانو",
    "آموزش زبان انگلیسی با فیلم",
    "یادگیری انگلیسی با سریال",
    "زیرنویس دوزبانه زبانو",
    "نحوه یادگیری زبان با زبانو",
    "راهنمای بخش‌های مختلف سایت زبانو",
  ],
  alternates: {
    canonical: "https://zabano.com/public/how-to-use",
  },
  openGraph: {
    title: "راهنمای کامل استفاده از اپلیکیشن زبانو | آموزش تصویری",
    description:
      "راهنمای تصویری و گام به گام استفاده از تمام امکانات اپلیکیشن زبانو برای یادگیری زبان انگلیسی. مشاهده آموزش تصویری نحوه کار با بخش‌های مختلف سایت.",
    type: "article",
    locale: "fa_IR",
    url: "https://zabano.com/public/how-to-use",
    images: [
      {
        url: "https://zabano.com/images/zabano-website-guide.jpg",
        width: 1200,
        height: 630,
        alt: "راهنمای تصویری استفاده از اپلیکیشن زبانو",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "راهنمای استفاده از اپلیکیشن زبانو | آموزش تصویری",
    description:
      "آموزش تصویری و گام به گام استفاده از تمام امکانات اپلیکیشن زبانو برای یادگیری زبان انگلیسی با فیلم و سریال.",
    images: ["https://zabano.com/images/zabano-website-guide.jpg"],
  },
  other: {
    "application/ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "راهنمای استفاده از اپلیکیشن زبانو",
        description:
          "آموزش گام به گام استفاده از تمام امکانات اپلیکیشن زبانو برای یادگیری زبان انگلیسی",
        totalTime: "PT10M",
        tool: {
          "@type": "HowToTool",
          name: "اپلیکیشن زبانو",
        },
        step: [
          {
            "@type": "HowToStep",
            name: "ثبت نام و ورود",
            text: "حساب کاربری بسازید یا با حساب موجود وارد شوید تا به تمامی امکانات وبسایت دسترسی داشته باشید.",
          },
          {
            "@type": "HowToStep",
            name: "انتخاب محتوای آموزشی",
            text: "از بین فیلم‌ها، سریال‌ها، پادکست‌ها و کتاب‌های صوتی، محتوای مورد نظر خود را انتخاب کنید.",
          },
          {
            "@type": "HowToStep",
            name: "یادگیری با زیرنویس دوزبانه",
            text: "از زیرنویس‌های فارسی و انگلیسی همزمان استفاده کنید تا درک بهتری از محتوا داشته باشید.",
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "چطور میتوانم از زیرنویس دوزبانه استفاده کنم؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "در صفحه پخش فیلم یا سریال، دکمه زیرنویس را انتخاب کرده و گزینه دوزبانه را فعال کنید تا همزمان زیرنویس فارسی و انگلیسی را مشاهده کنید.",
            },
          },
          {
            "@type": "Question",
            name: "آیا امکان ذخیره کلمات جدید وجود دارد؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "بله، با کلیک روی هر کلمه در زیرنویس انگلیسی، معنی آن را مشاهده کرده و میتوانید آن را به لیست لغات ذخیره شده خود اضافه کنید.",
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
            name: "راهنمای استفاده",
            item: "https://zabano.com/public/how-to-use",
          },
        ],
      },
    ]),
  },
};

const HowToUsePage = () => {
  return <HowToUseView />;
};

export default HowToUsePage;
