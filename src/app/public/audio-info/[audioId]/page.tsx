import { GetMovieData } from "@/api/services/cms";
import AudioInfoView from "@/views/audio-info";
import { cookies } from "next/headers";
import React from "react";
import { Metadata } from "next";

const AudioInfoPage = async ({
  params,
}: {
  params: Promise<{ audioId: string }>;
}) => {
  const { audioId } = await params;

  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const audioInfo = await GetMovieData(audioId?.split("-")?.[0], accessToken);

  return <AudioInfoView audioId={audioId} data={audioInfo} />;
};

export default AudioInfoPage;

export const metadata: Metadata = {
  title: "آموزش زبان انگلیسی با کتاب صوتی | زبانو",
  description:
    "یادگیری زبان انگلیسی با کتاب‌های صوتی جذاب. دسترسی به مجموعه کامل کتاب‌های صوتی با متن فارسی و انگلیسی. تقویت مهارت شنیداری و تلفظ با کتاب‌های صوتی آموزشی.",
  keywords: [
    "کتاب صوتی آموزش زبان",
    "آموزش زبان با کتاب صوتی",
    "کتاب صوتی انگلیسی",
    "یادگیری زبان با کتاب صوتی",
    "کتاب صوتی زبان انگلیسی",
    "آموزش زبان آنلاین",
    "تقویت مهارت شنیداری",
    "کتاب صوتی آموزشی",
    "یادگیری زبان رایگان",
  ],
  alternates: {
    canonical: "https://zabano.com/public/audio-info",
  },
  openGraph: {
    title: "آموزش زبان انگلیسی با کتاب صوتی | زبانو",
    description:
      "یادگیری زبان انگلیسی با کتاب‌های صوتی جذاب. تقویت مهارت شنیداری و تلفظ با کتاب‌های صوتی آموزشی.",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com/public/audio-info",
    images: [
      {
        url: "https://zabano.com/zabano-main-logo.png",
        width: 1200,
        height: 630,
        alt: "آموزش زبان انگلیسی با کتاب صوتی",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "آموزش زبان انگلیسی با کتاب صوتی | زبانو",
    description: "یادگیری زبان انگلیسی با کتاب‌های صوتی جذاب",
    images: ["https://zabano.com/zabano-main-logo.png"],
  },
};
