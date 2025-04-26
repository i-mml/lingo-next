import { GetMovieData, GetMovieDetailData } from "@/api/services/cms";
import AudioInfoView from "@/views/audio-info";
import { cookies } from "next/headers";
import React from "react";
import { Metadata } from "next";
import { contentTypeInfos } from "@/constants/content-types-infos";
import { ContentType } from "@/views/catalog/types";
import FaqSection from "@/components/shared/FaqSection";

export async function generateMetadata({
  params,
}: {
  params: { audioId: string };
}): Promise<Metadata> {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const audioInfo = await GetMovieData(
    params.audioId?.split("-")?.[0],
    accessToken
  );

  if (!audioInfo) {
    return {
      title: "محتوای صوتی | زبانو",
      description: "صفحه محتوای صوتی در زبانو",
    };
  }

  const contentType = contentTypeInfos[audioInfo.content_type as ContentType];
  const breadcrumbItems = [
    { name: "خانه", url: "https://zabano.com" },
    {
      name: `${contentType.title} ها`,
      url: `https://zabano.com/public/${contentType.listRoute}`,
    },
    {
      name: audioInfo.title,
      url: `https://zabano.com/public/audio-info/${params.audioId}`,
    },
  ];

  const contentTypeTitle = contentType.title;
  const defaultDescription = `${contentTypeTitle} انگلیسی با ترجمه و متن کامل. مناسب برای تقویت مهارت شنیداری و یادگیری زبان انگلیسی.`;

  return {
    title: `${contentTypeTitle} ${audioInfo.title} | زبانو`,
    description: `${audioInfo.description || defaultDescription}`,
    keywords: [
      contentTypeTitle,
      audioInfo.title,
      `${contentTypeTitle} انگلیسی`,
      `${contentTypeTitle} با ترجمه`,
      `${contentTypeTitle} آموزشی`,
      "تقویت مهارت شنیداری",
      "یادگیری زبان انگلیسی",
      `${contentTypeTitle} رایگان`,
      `${contentTypeTitle} با متن`,
    ],
    alternates: {
      canonical: `https://zabano.com/public/audio-info/${params.audioId}`,
    },
    openGraph: {
      title: `${contentTypeTitle} ${audioInfo.title} | زبانو`,
      description: audioInfo.description || defaultDescription,
      type: "article",
      locale: "fa_IR",
      url: `https://zabano.com/public/audio-info/${params.audioId}`,
      images: [
        {
          url: audioInfo.thumbnail || "https://zabano.com/zabano-main-logo.png",
          width: 1200,
          height: 630,
          alt: `${contentTypeTitle} ${audioInfo.title}`,
        },
      ],
      publishedTime: audioInfo.created_at,
      modifiedTime: audioInfo.updated_at,
    },
    twitter: {
      card: "summary_large_image",
      title: `${contentTypeTitle} ${audioInfo.title} | زبانو`,
      description: audioInfo.description || defaultDescription,
      images: [
        audioInfo.thumbnail || "https://zabano.com/zabano-main-logo.png",
      ],
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type":
          audioInfo.content_type === "Book" ? "AudioBook" : "AudioObject",
        name: audioInfo.title,
        description: audioInfo.description,
        inLanguage: "en",
        translator: {
          "@type": "Organization",
          name: "زبانو",
          url: "https://zabano.com",
        },
        publisher: {
          "@type": "Organization",
          name: "زبانو",
          url: "https://zabano.com",
        },
        datePublished: audioInfo.created_at,
        dateModified: audioInfo.updated_at,
        image: audioInfo.thumbnail || "https://zabano.com/zabano-main-logo.png",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        },
      }),
    },
  };
}

const AudioInfoPage = async ({ params }: { params: { audioId: string } }) => {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const audioInfo = await GetMovieDetailData(
    params.audioId?.split("-")?.[0],
    accessToken
  );

  console.log(audioInfo);

  return (
    <>
      <AudioInfoView audioId={params.audioId} data={audioInfo} />

      {/* FAQ Section */}
      {!!audioInfo?.faq && (
        <FaqSection
          faqs={audioInfo?.faq}
          includeSchema
          title="سوالات متداول"
          // className="relative bg-backgroundLayout w-full rounded-lg"
        />
      )}
    </>
  );
};

export default AudioInfoPage;
