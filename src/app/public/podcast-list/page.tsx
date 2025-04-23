import { GetCmsByContentType } from "@/api/services/cms";
import AudioBookView from "@/views/audio-book";
import { cookies } from "next/headers";
import React from "react";
import { Metadata } from "next";

// Import podcastFaqs from the view component
const podcastFaqs = [
  {
    question: "پادکست‌های انگلیسی چه مزایایی برای یادگیری زبان دارند؟",
    answer:
      "پادکست‌ها به تقویت مهارت شنیداری در مکالمات واقعی، یادگیری اصطلاحات روزمره، آشنایی با لهجه‌های مختلف، و درک مفاهیم در بافت طبیعی زبان کمک می‌کنند. همچنین، موضوعات متنوع پادکست‌ها باعث افزایش انگیزه و علاقه به یادگیری زبان می‌شود.",
  },
  {
    question: "آیا پادکست‌های زبانو برای مبتدیان مناسب هستند؟",
    answer:
      "بله، پادکست‌های زبانو در سطوح مختلف دسته‌بندی شده‌اند. پادکست‌های سطح ابتدایی با سرعت کمتر و زبان ساده‌تر ارائه می‌شوند که برای مبتدیان مناسب است. همچنین، وجود زیرنویس و ترجمه به درک بهتر محتوا کمک می‌کند.",
  },
  {
    question: "تفاوت پادکست با کتاب صوتی چیست؟",
    answer:
      "پادکست‌ها معمولاً به صورت گفتگو، مصاحبه یا روایت شخصی ارائه می‌شوند و اغلب به صورت سریالی منتشر می‌شوند. آن‌ها بیشتر حالت محاوره‌ای دارند و زبان طبیعی‌تری را منعکس می‌کنند. در مقابل، کتاب‌های صوتی خوانش متن کتاب هستند که ساختار رسمی‌تری دارند.",
  },
  {
    question: "چگونه می‌توانم پادکست‌ها را در زبانو پیدا کنم؟",
    answer:
      "شما می‌توانید از طریق منوی اصلی به بخش «پادکست‌ها» دسترسی پیدا کنید. همچنین می‌توانید با استفاده از فیلترهای موجود، پادکست‌ها را بر اساس سطح زبانی، موضوع، محبوبیت یا جدیدترین‌ها مرتب کنید.",
  },
  {
    question: "چگونه می‌توانم با پادکست‌ها تمرین کنم؟",
    answer:
      "برای تمرین مؤثر با پادکست‌ها، ابتدا بدون زیرنویس گوش دهید و نکات اصلی را یادداشت کنید. سپس با استفاده از زیرنویس، درک خود را بررسی کنید. می‌توانید بخش‌های مهم را چندبار گوش داده و تکرار کنید. همچنین، لغات و اصطلاحات جدید را یادداشت کرده و در مکالمات خود استفاده کنید.",
  },
];

export const metadata: Metadata = {
  title: "پادکست‌های انگلیسی با ترجمه فارسی | زبانو",
  description:
    "دانلود و گوش دادن به پادکست‌های انگلیسی آموزشی با زیرنویس فارسی و متن دو زبانه. یادگیری زبان انگلیسی با پادکست‌های روز دنیا، تقویت مهارت شنیداری و مکالمه، و آشنایی با فرهنگ و اصطلاحات کاربردی.",
  keywords: [
    "پادکست انگلیسی با ترجمه فارسی",
    "پادکست آموزش زبان انگلیسی",
    "دانلود پادکست انگلیسی با متن",
    "پادکست انگلیسی برای تقویت مکالمه",
    "پادکست با زیرنویس فارسی",
    "یادگیری انگلیسی با پادکست",
    "پادکست‌های آموزشی انگلیسی",
    "گوش دادن به پادکست انگلیسی",
    "متن دوزبانه پادکست",
    "تقویت لیسنینگ با پادکست",
    "آموزش اصطلاحات انگلیسی با پادکست",
    "پادکست رایگان زبان انگلیسی",
  ],
  alternates: {
    canonical: "https://zabano.com/public/podcast-list",
  },
  openGraph: {
    title: "پادکست‌های انگلیسی با ترجمه فارسی | یادگیری زبان با پادکست",
    description:
      "مجموعه‌ای از بهترین پادکست‌های انگلیسی با زیرنویس فارسی و متن دو زبانه. تقویت مهارت شنیداری، مکالمه و یادگیری لغات و اصطلاحات کاربردی با گوش دادن به پادکست‌های آموزشی.",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com/public/podcast-list",
    images: [
      {
        url: "https://zabano.com/images/zabano-podcast-learning.jpg",
        width: 1200,
        height: 630,
        alt: "یادگیری زبان انگلیسی با پادکست - زبانو",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "پادکست‌های انگلیسی با ترجمه فارسی | زبانو",
    description:
      "یادگیری زبان انگلیسی با گوش دادن به پادکست‌های آموزشی همراه با زیرنویس فارسی و متن دوزبانه.",
    images: ["https://zabano.com/images/zabano-podcast-learning.jpg"],
  },
  other: {
    "application/ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "پادکست‌های انگلیسی با ترجمه فارسی",
        description:
          "مجموعه پادکست‌های آموزشی انگلیسی با زیرنویس فارسی برای یادگیری زبان",
        numberOfItems: 100,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "PodcastEpisode",
              name: "پادکست‌های آموزشی زبان انگلیسی",
              inLanguage: ["en", "fa"],
            },
          },
        ],
        provider: {
          "@type": "Organization",
          name: "زبانو",
          url: "https://zabano.com",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: podcastFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
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
            name: "پادکست انگلیسی با ترجمه",
            item: "https://zabano.com/public/podcast-list",
          },
        ],
      },
    ]),
  },
};

const PodcastListPage = async () => {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const podcastList = await GetCmsByContentType(4, accessToken);

  return <AudioBookView audioBooks={podcastList} contentType={4} />;
};

export default PodcastListPage;
