import { GetCmsByContentType } from "@/api/services/cms";
import { GetEducationGrammars } from "@/api/services/education";
import AudioBookView from "@/views/audio-book";
import GrammarListView from "@/views/grammar-list";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "آموزش گرامر زبان انگلیسی از صفر تا صد (کتاب Grammar in Use)",
  description:
    "بخش گرامر آموزش زبان انگلیسی شامل دروس طبقه بندی شده در سطح های مختلف است. برای یادگیری گرامر زبان انگلیسی کلیک کنید",
  keywords: [
    "آموزش گرامر",
    "گرامر انگلیسی",
    "کتاب grammar in use",
    "آموزش گرامر زبان",
    "کتاب آموزش گرامر",
  ],
  openGraph: {
    title: "زبانو - آموزش گرامر زبان انگلیسی از صفر تا صد",
    description:
      "با گرامر های زبانو تقریبا تمام مباحث گرامری برای سطوح مختلف رو میتونی یاد بگیری",
    images: `${process.env.NEXT_PUBLIC_BASE_URL}/zabano-main-logo.png`,
  },
  alternates: {
    canonical: "https://www.zabano.com/public/grammar-list",
  },
};

const GrammarListPage = async () => {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const grammars = await GetEducationGrammars("", accessToken);

  return <GrammarListView grammars={grammars?.results} />;
};

export default GrammarListPage;
