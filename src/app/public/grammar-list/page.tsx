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
    "یادگیری اصولی و کاربردی گرامر زبان انگلیسی با بیش از 100 درس جامع همراه با مثال‌های روزمره و تمرین‌های تعاملی. تسلط بر قواعد دستور زبان انگلیسی از مبتدی تا پیشرفته با روش‌های ساده و کاربردی. فیلم آموزش گرامر انگلیسی رایگان با ترجمه فارسی.",
  keywords: [
    "آموزش گرامر انگلیسی",
    "دستور زبان انگلیسی",
    "قواعد گرامری زبان انگلیسی",
    "یادگیری گرامر انگلیسی با مثال",
    "آموزش زمان‌های انگلیسی",
    "جملات شرطی در انگلیسی",
    "افعال انگلیسی",
    "حروف اضافه انگلیسی",
    "ضمایر در زبان انگلیسی",
    "آموزش تصویری گرامر انگلیسی",
    "گرامر انگلیسی از صفر تا صد",
    "آموزش رایگان دستور زبان انگلیسی",
    "گرامر کاربردی انگلیسی",
    "آموزش گرامر برای مکالمه انگلیسی",
    "تمرین آنلاین گرامر انگلیسی",
  ],
  alternates: {
    canonical: "https://zabano.com/public/grammar-list",
  },
  openGraph: {
    title: "آموزش جامع گرامر زبان انگلیسی با مثال‌های کاربردی | زبانو",
    description:
      "یادگیری اصولی و کاربردی گرامر زبان انگلیسی با مثال‌های روزمره و تمرین‌های تعاملی. تسلط بر دستور زبان انگلیسی از مبتدی تا پیشرفته با روش‌های ساده و کاربردی.",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com/public/grammar-list",
    images: [
      {
        url: "https://zabano.com/images/grammar-learning-zabano.jpg",
        width: 1200,
        height: 630,
        alt: "آموزش گرامر زبان انگلیسی با زبانو - دستور زبان انگلیسی با مثال",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "آموزش گرامر زبان انگلیسی با مثال | زبانو",
    description:
      "یادگیری اصولی گرامر انگلیسی با بیش از 100 درس جامع و مثال‌های کاربردی. تسلط بر دستور زبان از مبتدی تا پیشرفته.",
    images: ["https://zabano.com/images/grammar-learning-zabano.jpg"],
  },
  other: {
    "application/ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Course",
        name: "آموزش گرامر زبان انگلیسی",
        description:
          "دوره جامع آموزش گرامر و دستور زبان انگلیسی با مثال‌های کاربردی و تمرین‌های تعاملی",
        provider: {
          "@type": "Organization",
          name: "زبانو",
          sameAs: "https://zabano.com",
        },
        audience: {
          "@type": "Audience",
          audienceType: "زبان‌آموزان انگلیسی در همه سطوح",
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          inLanguage: "fa",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "بهترین روش برای یادگیری گرامر زبان انگلیسی چیست؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "بهترین روش برای یادگیری گرامر انگلیسی، مطالعه قواعد همراه با مثال‌های کاربردی و تمرین مداوم است. در زبانو، آموزش گرامر به صورت ساده و با مثال‌های روزمره ارائه می‌شود که یادگیری را آسان‌تر می‌کند.",
            },
          },
          {
            "@type": "Question",
            name: "آیا یادگیری گرامر برای مکالمه انگلیسی ضروری است؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "بله، آشنایی با قواعد گرامری برای داشتن مکالمه صحیح و روان ضروری است. دانستن گرامر به شما کمک می‌کند جملات درست بسازید و منظور خود را دقیق‌تر بیان کنید.",
            },
          },
          {
            "@type": "Question",
            name: "چگونه می‌توانم گرامر انگلیسی را سریع‌تر یاد بگیرم؟",
            acceptedAnswer: {
              "@type": "Answer",
              text: "برای یادگیری سریع‌تر گرامر، مطالعه منظم، تمرین روزانه، و استفاده از قواعد در جمله‌سازی و مکالمه توصیه می‌شود. در زبانو، درس‌های گرامر به صورت طبقه‌بندی شده از ساده به پیشرفته ارائه شده‌اند که یادگیری تدریجی و اصولی را امکان‌پذیر می‌کند.",
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
            name: "آموزش زبان انگلیسی",
            item: "https://zabano.com/public",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "آموزش گرامر انگلیسی",
            item: "https://zabano.com/public/grammar-list",
          },
        ],
      },
    ]),
  },
};

const GrammarListPage = async () => {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const grammars = await GetEducationGrammars("", accessToken);

  return <GrammarListView grammars={grammars?.results} />;
};

export default GrammarListPage;
