import { GetCmsByContentType } from "@/api/services/cms";
import { GetEducationGrammars } from "@/api/services/education";
import AudioBookView from "@/views/audio-book";
import GrammarListView from "@/views/grammar-list";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "آموزش گرامر زبان انگلیسی | زبانو",
  description:
    "یادگیری گرامر زبان انگلیسی به صورت کامل و جامع. دسترسی به درس‌های گرامر با مثال‌های کاربردی و تمرین‌های تعاملی. آموزش قواعد زبان انگلیسی به روشی ساده و موثر.",
  keywords: [
    "آموزش گرامر انگلیسی",
    "گرامر زبان انگلیسی",
    "قواعد زبان انگلیسی",
    "یادگیری گرامر انگلیسی",
    "آموزش زبان انگلیسی",
    "گرامر انگلیسی",
    "آموزش قواعد زبان",
    "گرامر پیشرفته انگلیسی",
    "یادگیری زبان رایگان",
  ],
  alternates: {
    canonical: "https://zabano.com/public/grammar-list",
  },
  openGraph: {
    title: "آموزش گرامر زبان انگلیسی | زبانو",
    description:
      "یادگیری گرامر زبان انگلیسی به صورت کامل و جامع. آموزش قواعد زبان انگلیسی به روشی ساده و موثر.",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com/public/grammar-list",
    images: [
      {
        url: "https://zabano.com/zabano-main-logo.png",
        width: 1200,
        height: 630,
        alt: "آموزش گرامر زبان انگلیسی با زبانو",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "آموزش گرامر زبان انگلیسی | زبانو",
    description: "یادگیری گرامر زبان انگلیسی به روشی ساده و موثر",
    images: ["https://zabano.com/zabano-main-logo.png"],
  },
};

const GrammarListPage = async () => {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const grammars = await GetEducationGrammars("", accessToken);

  return <GrammarListView grammars={grammars?.results} />;
};

export default GrammarListPage;
