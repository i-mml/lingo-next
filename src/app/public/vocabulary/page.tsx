import { getVocabularyList } from "@/api/services/education";
import VocabularyView from "@/views/vocabulary";
import { cookies } from "next/headers";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "منابع لغات انگلیسی | آموزش زبان با بهترین کتاب‌های جهان",
  description:
    "دسترسی به معتبرترین منابع آموزش لغات انگلیسی شامل آکسفورد 3000، 4000 واژه ضروری و 504 واژه. سیستم آموزشی هوشمند با امکان یادگیری آنلاین و آزمون‌های طبقه‌بندی شده.",
  keywords: [
    "آموزش زبان انگلیسی",
    "لغات آکسفورد",
    "504 واژه",
    "4000 کلمه ضروری",
    "یادگیری آنلاین زبان",
  ],
  alternates: {
    canonical: "https://zabano.com/public/vocabulary",
  },
  openGraph: {
    title: "آموزش تضمینی لغات انگلیسی | بهترین منابع 2025",
    description:
      "یادگیری لغات انگلیسی با استاندارد دانشگاه آکسفورد - دسترسی به تمام کتاب‌های ضروری در یک پلتفرم",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com/public/vocabulary",
    images: [
      {
        url: "https://zabano.com/zabano-main-logo.png",
        width: 1200,
        height: 630,
        alt: "آموزش زبان انگلیسی با زبانیو",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "انقلابی در یادگیری لغات انگلیسی | آموزش آنلاین",
    description: "لغات ضروری انگلیسی رو در نصف زمان معمول یاد بگیرید!",
    images: ["https://zabano.com/zabano-main-logo.png"],
  },
};

const VocabularyPage = async () => {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const vocabularies = await getVocabularyList(accessToken);

  return (
    <>
      <VocabularyView data={vocabularies} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          name: "دوره جامع لغات انگلیسی",
          description:
            "آموزش کامل لغات ضروری انگلیسی با استفاده از کتاب‌های معتبر جهانی",
          provider: {
            "@type": "Organization",
            name: "زبانو",
            sameAs: "https://zabano.com",
          },
        })}
      </script>
    </>
  );
};

export default VocabularyPage;
