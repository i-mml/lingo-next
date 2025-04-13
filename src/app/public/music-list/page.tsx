import { GetCmsByContentType } from "@/api/services/cms";
import AudioBookView from "@/views/audio-book";
import { cookies } from "next/headers";
import React from "react";
import { Metadata } from "next";

const MusicListPage = async () => {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const audioBooks = await GetCmsByContentType(2, accessToken);

  return <AudioBookView audioBooks={audioBooks} contentType={2} />;
};

export default MusicListPage;

export const metadata: Metadata = {
  title: "آموزش زبان انگلیسی با موسیقی | زبانو",
  description:
    "یادگیری زبان انگلیسی با موسیقی‌های آموزشی جذاب. دسترسی به مجموعه کامل موسیقی‌های آموزشی با متن فارسی و انگلیسی. تقویت مهارت شنیداری و تلفظ با موسیقی‌های آموزشی.",
  keywords: [
    "موسیقی آموزش زبان",
    "آموزش زبان با موسیقی",
    "موسیقی انگلیسی",
    "یادگیری زبان با موسیقی",
    "موسیقی زبان انگلیسی",
    "آموزش زبان آنلاین",
    "تقویت مهارت شنیداری",
    "موسیقی آموزشی",
    "یادگیری زبان رایگان",
  ],
  alternates: {
    canonical: "https://zabano.com/public/music-list",
  },
  openGraph: {
    title: "آموزش زبان انگلیسی با موسیقی | زبانو",
    description:
      "یادگیری زبان انگلیسی با موسیقی‌های آموزشی جذاب. تقویت مهارت شنیداری و تلفظ با موسیقی‌های آموزشی.",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com/public/music-list",
    images: [
      {
        url: "https://zabano.com/zabano-main-logo.png",
        width: 1200,
        height: 630,
        alt: "آموزش زبان انگلیسی با موسیقی",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "آموزش زبان انگلیسی با موسیقی | زبانو",
    description: "یادگیری زبان انگلیسی با موسیقی‌های آموزشی جذاب",
    images: ["https://zabano.com/zabano-main-logo.png"],
  },
};
