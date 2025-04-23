import { GetCmsByContentType } from "@/api/services/cms";
import AudioBookView from "@/views/audio-book";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

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
};

const AudioBookPage = async () => {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const audioBooks = await GetCmsByContentType(3, accessToken);

  return <AudioBookView audioBooks={audioBooks} contentType={3} />;
};

export default AudioBookPage;
