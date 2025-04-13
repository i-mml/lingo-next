import HowToUseView from "@/views/how-to-use";
import React from "react";
import { Metadata } from "next";

const HowToUsePage = () => {
  return <HowToUseView />;
};

export default HowToUsePage;

export const metadata: Metadata = {
  title: "راهنمای استفاده از زبانو | آموزش زبان با فیلم و سریال",
  description:
    "راهنمای کامل استفاده از پلتفرم زبانو برای یادگیری زبان انگلیسی. آموزش نحوه استفاده از فیلم‌ها و سریال‌ها برای یادگیری موثر زبان. شروع یادگیری زبان به روشی جذاب.",
  keywords: [
    "راهنمای زبانو",
    "آموزش استفاده از زبانو",
    "یادگیری زبان با زبانو",
    "راهنمای کاربری زبانو",
    "آموزش زبانو",
    "نحوه استفاده از زبانو",
    "شروع یادگیری زبان",
    "آموزش زبان آنلاین",
    "یادگیری زبان رایگان",
  ],
  alternates: {
    canonical: "https://zabano.com/public/how-to-use",
  },
  openGraph: {
    title: "راهنمای استفاده از زبانو | آموزش زبان با فیلم و سریال",
    description:
      "راهنمای کامل استفاده از پلتفرم زبانو برای یادگیری زبان انگلیسی. شروع یادگیری زبان به روشی جذاب.",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com/public/how-to-use",
    images: [
      {
        url: "https://zabano.com/zabano-main-logo.png",
        width: 1200,
        height: 630,
        alt: "راهنمای استفاده از زبانو",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "راهنمای استفاده از زبانو | آموزش زبان با فیلم و سریال",
    description: "شروع یادگیری زبان انگلیسی به روشی جذاب با زبانو",
    images: ["https://zabano.com/zabano-main-logo.png"],
  },
};
