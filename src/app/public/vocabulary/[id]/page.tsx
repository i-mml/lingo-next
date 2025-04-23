import {
  getVocabularyLessonsByCategoryId,
  getVocabularyList,
} from "@/api/services/education";
import { VocabularyListItem } from "@/api/types/education";
import SingleVocabularyView from "@/views/single-vocabulary";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const vocabularies = await getVocabularyList(accessToken);
  const currentVocabulary = vocabularies?.find(
    (item: VocabularyListItem) => item?.id === Number(id)
  );

  return {
    title: `${
      currentVocabulary?.title || "واژگان انگلیسی"
    } | آموزش لغات زبان انگلیسی | زبانو`,
    description: `مجموعه کامل لغات و واژگان پرکاربرد انگلیسی در کتاب ${
      currentVocabulary?.title || "واژگان انگلیسی"
    }. تقویت دایره لغات با تلفظ صحیح، معنی دقیق و مثال‌های کاربردی برای یادگیری آسان و ماندگار. | زبانو`,
    keywords: [
      "آموزش لغات انگلیسی",
      "واژگان زبان انگلیسی",
      "لغات ضروری انگلیسی",
      "تقویت دایره لغات انگلیسی",
      "یادگیری واژگان با تلفظ صحیح",
      "کتاب آموزش لغات انگلیسی",
      "لغات پرکاربرد انگلیسی",
      "آموزش واژگان با مثال",
      currentVocabulary?.title?.replace(/[^\u0600-\u06FFa-zA-Z0-9 ]/g, "") ||
        "",
    ],
    alternates: {
      canonical: `https://zabano.com/public/vocabulary/${id}`,
    },
    openGraph: {
      title: `${
        currentVocabulary?.title || "واژگان انگلیسی"
      } | آموزش لغات زبان انگلیسی | زبانو`,
      description: `مجموعه کامل لغات و واژگان پرکاربرد انگلیسی در کتاب ${
        currentVocabulary?.title || "واژگان انگلیسی"
      }. تقویت دایره لغات با تلفظ صحیح و معنی دقیق. | زبانو`,
      type: "website",
      locale: "fa_IR",
      url: `https://zabano.com/public/vocabulary/${id}`,
      images: currentVocabulary?.image
        ? [
            {
              url: `${process.env.NEXT_PUBLIC_EDUCATION_CONTENT_URL}${currentVocabulary.image}`,
              width: 1200,
              height: 630,
              alt: currentVocabulary?.title || "واژگان انگلیسی",
            },
          ]
        : [
            {
              url: "https://zabano.com/zabano-main-logo.png",
              width: 1200,
              height: 630,
              alt: "زبانو - آموزش واژگان انگلیسی",
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${
        currentVocabulary?.title || "واژگان انگلیسی"
      } | آموزش لغات زبان انگلیسی | زبانو`,
      description: `مجموعه کامل لغات و واژگان پرکاربرد انگلیسی. تقویت دایره لغات با تلفظ صحیح و معنی دقیق. | زبانو`,
      images: currentVocabulary?.image
        ? [
            `${process.env.NEXT_PUBLIC_EDUCATION_CONTENT_URL}${currentVocabulary.image}`,
          ]
        : ["https://zabano.com/zabano-main-logo.png"],
    },
  };
}

const SingleVocabularyPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const accessToken = (await cookies()).get("zabano-access-token")?.value;

  const vocabularies = await getVocabularyList(accessToken);
  getVocabularyLessonsByCategoryId;
  const lessonsList = await getVocabularyLessonsByCategoryId(
    Number(id),
    { page_size: 50, page: 1 },
    accessToken
  );

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
            name: `${
              currentVocabulary?.title || "واژگان انگلیسی"
            } | آموزش لغات زبان انگلیسی | زبانو`,
            description: `مجموعه کامل لغات و واژگان پرکاربرد انگلیسی در کتاب ${
              currentVocabulary?.title || "واژگان انگلیسی"
            }. تقویت دایره لغات با تلفظ صحیح، معنی دقیق و مثال‌های کاربردی برای یادگیری آسان و ماندگار.`,
            provider: {
              "@type": "Organization",
              name: "زبانو",
              url: "https://zabano.com",
            },
            about: {
              "@type": "Thing",
              name: "آموزش واژگان زبان انگلیسی",
            },
            audience: {
              "@type": "Audience",
              audienceType: "زبان‌آموزان انگلیسی",
            },
            educationalLevel: "همه سطوح",
            learningResourceType: "واژگان و لغات",
            teaches: "لغات و واژگان انگلیسی",
            educationalUse: "آموزش واژگان زبان انگلیسی",
            inLanguage: ["en", "fa"],
            numberOfLessons: lessonsList?.results?.length || 0,
            hasPart:
              lessonsList?.results?.map((lesson: any) => ({
                "@type": "LearningResource",
                name: lesson.title,
                learningResourceType: "درس واژگان",
              })) || [],
            image: currentVocabulary?.image
              ? `${process.env.NEXT_PUBLIC_EDUCATION_CONTENT_URL}${currentVocabulary.image}`
              : "https://zabano.com/zabano-main-logo.png",
            url: `https://zabano.com/public/vocabulary/${id}`,
          }),
        }}
      />
      <SingleVocabularyView
        currentVocabulary={currentVocabulary as any}
        categoryId={Number(id)}
        lessonsList={lessonsList?.results}
      />
    </>
  );
};

export default SingleVocabularyPage;
