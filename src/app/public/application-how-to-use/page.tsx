import HowToUseView from "@/views/how-to-use";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "آموزش استفاده از زبانو | راهنمای کامل کار با اپلیکیشن زبانو",
  description:
    "آموزش کامل نحوه استفاده از اپلیکیشن زبانو. راهنمای گام به گام یادگیری زبان انگلیسی با زبانو، از نصب تا استفاده از تمامی قابلیت‌های آموزشی.",
  keywords: [
    "راهنمای زبانو",
    "نحوه استفاده از زبانو",
    "آموزش اپلیکیشن زبانو",
    "راهنمای کار با زبانو",
    "آموزش کار با زبانو",
    "نحوه یادگیری با زبانو",
    "آموزش استفاده از اپلیکیشن زبانو",
  ],
  alternates: {
    canonical: "https://zabano.com/public/application-how-to-use",
  },
  openGraph: {
    title: "آموزش استفاده از زبانو | راهنمای کامل کار با اپلیکیشن زبانو",
    description:
      "آموزش کامل نحوه استفاده از اپلیکیشن زبانو. راهنمای گام به گام یادگیری زبان انگلیسی با زبانو، از نصب تا استفاده از تمامی قابلیت‌های آموزشی.",
    type: "article",
    locale: "fa_IR",
    url: "https://zabano.com/public/application-how-to-use",
    images: [
      {
        url: "https://zabano.com/zabano-main-logo.png",
        width: 1200,
        height: 630,
        alt: "آموزش استفاده از زبانو",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "آموزش استفاده از زبانو | راهنمای کامل کار با اپلیکیشن زبانو",
    description:
      "آموزش کامل نحوه استفاده از اپلیکیشن زبانو. راهنمای گام به گام یادگیری زبان انگلیسی با زبانو.",
    images: ["https://zabano.com/zabano-main-logo.png"],
  },
};

const ApplicationHowToUse = () => {
  return <HowToUseView />;
};

export default ApplicationHowToUse;
