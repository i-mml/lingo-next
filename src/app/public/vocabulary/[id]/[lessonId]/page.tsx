import {
  getEducationLessonById,
  getVocabularyList,
} from "@/api/services/education";
import { VocabularyListItem } from "@/api/types/education";
import VocabularyLessonView from "@/views/vocabularyLesson";
import { cookies } from "next/headers";
import React from "react";
import { Metadata } from "next";

const VocabularyByLesson = async ({
  params,
}: {
  params: Promise<{ id: string; lessonId: string }>;
}) => {
  const { id, lessonId } = await params;

  const accessToken = (await cookies()).get("zabano-access-token")?.value;

  const vocabularyWords = await getEducationLessonById(
    Number(lessonId),
    accessToken
  );

  const vocabularies = await getVocabularyList(accessToken);
  const currentVocabulary = vocabularies?.find(
    (item: VocabularyListItem) => item?.id === Number(id)
  );

  return (
    <VocabularyLessonView
      categoryId={Number(id)}
      lessonId={Number(lessonId)}
      currentVocabulary={currentVocabulary as VocabularyListItem}
      data={vocabularyWords}
    />
  );
};

export default VocabularyByLesson;

export const metadata: Metadata = {
  title: "آموزش واژگان زبان انگلیسی | زبانو",
  description:
    "یادگیری واژگان زبان انگلیسی به صورت کامل و جامع. دسترسی به مجموعه کامل واژگان با مثال‌های کاربردی و تمرین‌های تعاملی. آموزش واژگان زبان انگلیسی به روشی ساده و موثر.",
  keywords: [
    "آموزش واژگان انگلیسی",
    "واژگان زبان انگلیسی",
    "یادگیری واژگان انگلیسی",
    "آموزش زبان انگلیسی",
    "واژگان انگلیسی",
    "آموزش واژگان زبان",
    "واژگان پیشرفته انگلیسی",
    "یادگیری زبان رایگان",
  ],
  alternates: {
    canonical: "https://zabano.com/public/vocabulary",
  },
  openGraph: {
    title: "آموزش واژگان زبان انگلیسی | زبانو",
    description:
      "یادگیری واژگان زبان انگلیسی به صورت کامل و جامع. آموزش واژگان زبان انگلیسی به روشی ساده و موثر.",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com/public/vocabulary",
    images: [
      {
        url: "https://zabano.com/zabano-main-logo.png",
        width: 1200,
        height: 630,
        alt: "آموزش واژگان زبان انگلیسی",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "آموزش واژگان زبان انگلیسی | زبانو",
    description: "یادگیری واژگان زبان انگلیسی به روشی ساده و موثر",
    images: ["https://zabano.com/zabano-main-logo.png"],
  },
};
