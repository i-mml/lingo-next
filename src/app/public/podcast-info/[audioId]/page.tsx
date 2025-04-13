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
  title: "آموزش زبان انگلیسی با پادکست | زبانو",
  description:
    "یادگیری زبان انگلیسی با پادکست‌های آموزشی جذاب. دسترسی به مجموعه کامل پادکست‌های آموزشی با متن فارسی و انگلیسی. تقویت مهارت شنیداری و تلفظ با پادکست‌های آموزشی.",
  keywords: [
    "پادکست آموزش زبان",
    "آموزش زبان با پادکست",
    "پادکست انگلیسی",
    "یادگیری زبان با پادکست",
    "پادکست زبان انگلیسی",
    "آموزش زبان آنلاین",
    "تقویت مهارت شنیداری",
    "پادکست آموزشی",
    "یادگیری زبان رایگان",
  ],
  alternates: {
    canonical: "https://zabano.com/public/podcast-info",
  },
  openGraph: {
    title: "آموزش زبان انگلیسی با پادکست | زبانو",
    description:
      "یادگیری زبان انگلیسی با پادکست‌های آموزشی جذاب. تقویت مهارت شنیداری و تلفظ با پادکست‌های آموزشی.",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com/public/podcast-info",
    images: [
      {
        url: "https://zabano.com/zabano-main-logo.png",
        width: 1200,
        height: 630,
        alt: "آموزش زبان انگلیسی با پادکست",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "آموزش زبان انگلیسی با پادکست | زبانو",
    description: "یادگیری زبان انگلیسی با پادکست‌های آموزشی جذاب",
    images: ["https://zabano.com/zabano-main-logo.png"],
  },
};
