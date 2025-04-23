import {
  getEducationLessonById,
  getVocabularyList,
} from "@/api/services/education";
import { VocabularyListItem } from "@/api/types/education";
import VocabularyLessonView from "@/views/vocabularyLesson";
import { cookies } from "next/headers";
import React from "react";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string; lessonId: string };
}): Promise<Metadata> {
  const { id, lessonId } = params;
  const accessToken = (await cookies()).get("zabano-access-token")?.value;

  const vocabularies = await getVocabularyList(accessToken);
  const currentVocabulary = vocabularies?.find(
    (item: VocabularyListItem) => item?.id === Number(id)
  );

  const vocabularyWords = await getEducationLessonById(
    Number(lessonId),
    accessToken
  );

  return {
    title: `${vocabularyWords?.title || "لغات انگلیسی"} | ${
      currentVocabulary?.title || "آموزش واژگان"
    } | زبانو`,
    description: `فهرست کامل لغات پرکاربرد ${
      vocabularyWords?.title || "درس"
    } از ${
      currentVocabulary?.title || "کتاب واژگان انگلیسی"
    } با تلفظ صحیح، معنی فارسی و مثال‌های کاربردی. یادگیری سریع و آسان لغات انگلیسی با روش‌های مؤثر. | زبانو`,
    keywords: [
      "لغات انگلیسی با معنی فارسی",
      "لغات پرکاربرد انگلیسی",
      "یادگیری لغات انگلیسی",
      "آموزش لغات انگلیسی با تلفظ",
      "دانلود لغات انگلیسی با معنی",
      "کلمات ضروری انگلیسی",
      "فهرست لغات انگلیسی",
      "آموزش زبان انگلیسی مبتدی",
      "تقویت دایره لغات",
      "لغات روزمره انگلیسی",
      vocabularyWords?.title?.replace(/[^\u0600-\u06FFa-zA-Z0-9 ]/g, "") || "",
      currentVocabulary?.title?.replace(/[^\u0600-\u06FFa-zA-Z0-9 ]/g, "") ||
        "",
    ],
    alternates: {
      canonical: `https://zabano.com/public/vocabulary/${id}/${lessonId}`,
    },
    openGraph: {
      title: `${vocabularyWords?.title || "لغات انگلیسی"} | ${
        currentVocabulary?.title || "آموزش واژگان"
      } | زبانو`,
      description: `فهرست کامل لغات پرکاربرد ${
        vocabularyWords?.title || "درس"
      } از ${
        currentVocabulary?.title || "کتاب واژگان انگلیسی"
      } با تلفظ صحیح، معنی فارسی و مثال‌های کاربردی. یادگیری سریع لغات انگلیسی. | زبانو`,
      type: "website",
      locale: "fa_IR",
      url: `https://zabano.com/public/vocabulary/${id}/${lessonId}`,
      images: currentVocabulary?.image
        ? [
            {
              url: `${process.env.NEXT_PUBLIC_EDUCATION_CONTENT_URL}${currentVocabulary.image}`,
              width: 1200,
              height: 630,
              alt: `${vocabularyWords?.title || "لغات انگلیسی"} - ${
                currentVocabulary?.title || "آموزش واژگان انگلیسی"
              }`,
            },
          ]
        : [
            {
              url: "https://zabano.com/zabano-main-logo.png",
              width: 1200,
              height: 630,
              alt: "زبانو - آموزش لغات و واژگان انگلیسی",
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${vocabularyWords?.title || "لغات انگلیسی"} | ${
        currentVocabulary?.title || "آموزش واژگان"
      } | زبانو`,
      description: `فهرست کامل لغات پرکاربرد با تلفظ صحیح، معنی فارسی و مثال‌های کاربردی. یادگیری سریع و آسان لغات انگلیسی. | زبانو`,
      images: currentVocabulary?.image
        ? [
            `${process.env.NEXT_PUBLIC_EDUCATION_CONTENT_URL}${currentVocabulary.image}`,
          ]
        : ["https://zabano.com/zabano-main-logo.png"],
    },
  };
}

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: `${vocabularyWords?.title || "لغات انگلیسی"} | ${
              currentVocabulary?.title || "آموزش واژگان"
            } | زبانو`,
            description: `فهرست کامل لغات پرکاربرد ${
              vocabularyWords?.title || "درس"
            } از ${
              currentVocabulary?.title || "کتاب واژگان انگلیسی"
            } با تلفظ صحیح، معنی فارسی و مثال‌های کاربردی. یادگیری سریع و آسان لغات انگلیسی با روش‌های مؤثر.`,
            provider: {
              "@type": "Organization",
              name: "زبانو",
              url: "https://zabano.com",
            },
            about: {
              "@type": "Thing",
              name: "آموزش لغات و واژگان انگلیسی",
            },
            audience: {
              "@type": "EducationalAudience",
              audienceType: "زبان‌آموزان انگلیسی",
              educationalRole: "student",
            },
            educationalLevel: "beginner",
            learningResourceType: "vocabulary list",
            teaches: vocabularyWords?.title || "لغات و واژگان انگلیسی",
            educationalUse: "آموزش واژگان زبان انگلیسی",
            inLanguage: ["en", "fa"],
            isPartOf: {
              "@type": "LearningResource",
              name: currentVocabulary?.title || "کتاب واژگان انگلیسی",
              url: `https://zabano.com/public/vocabulary/${id}`,
            },
            hasPart:
              vocabularyWords?.words?.map((word: any, index: number) => ({
                "@type": "DefinedTerm",
                name: word.word,
                description: word.translation,
                inDefinedTermSet:
                  vocabularyWords?.title || "مجموعه لغات انگلیسی",
                termCode: `word-${index + 1}`,
                pronunciation: word.pronunciation || "",
              })) || [],
            numberOfItems: vocabularyWords?.words?.length || 0,
            image: currentVocabulary?.image
              ? `${process.env.NEXT_PUBLIC_EDUCATION_CONTENT_URL}${currentVocabulary.image}`
              : "https://zabano.com/zabano-main-logo.png",
            url: `https://zabano.com/public/vocabulary/${id}/${lessonId}`,
            mainEntityOfPage: {
              "@type": "WebPage",
              name: `${vocabularyWords?.title || "لغات انگلیسی"} | ${
                currentVocabulary?.title || "آموزش واژگان"
              } | زبانو`,
              url: `https://zabano.com/public/vocabulary/${id}/${lessonId}`,
            },
            potentialAction: {
              "@type": "LearnAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `https://zabano.com/public/vocabulary/${id}/${lessonId}`,
              },
              object: {
                "@type": "Language",
                name: "English",
              },
            },
          }),
        }}
      />
      <VocabularyLessonView
        categoryId={Number(id)}
        lessonId={Number(lessonId)}
        currentVocabulary={currentVocabulary as VocabularyListItem}
        data={vocabularyWords}
      />
    </>
  );
};

export default VocabularyByLesson;
