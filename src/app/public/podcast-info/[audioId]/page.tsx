import { GetMovieData } from "@/api/services/cms";
import AudioInfoView from "@/views/audio-info";
import { cookies } from "next/headers";
import React from "react";
import { Metadata } from "next";
import { contentTypeInfos } from "@/constants/content-types-infos";
import { ContentType } from "@/views/catalog/types";

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
      title: "پادکست آموزشی | زبانو",
      description: "صفحه پادکست آموزشی در زبانو",
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
      url: `https://zabano.com/public/podcast-info/${params.audioId}`,
    },
  ];

  const contentTypeTitle = contentType.title;
  const defaultDescription = `${contentTypeTitle} آموزشی زبان انگلیسی با متن و ترجمه فارسی. مناسب برای تقویت مهارت شنیداری و یادگیری زبان انگلیسی. شامل توضیحات و نکات آموزشی.`;

  // Extract English title from the URL if available
  const englishTitle = params.audioId
    ?.split("-")
    .slice(1)
    .join(" ")
    .replace(/-/g, " ");

  return {
    title: `${contentTypeTitle} ${audioInfo.title} (${englishTitle}) | آموزش زبان انگلیسی با ${contentTypeTitle}`,
    description: `${audioInfo.description || defaultDescription}`,
    keywords: [
      `${contentTypeTitle} آموزش زبان`,
      audioInfo.title,
      `${contentTypeTitle} انگلیسی`,
      `${contentTypeTitle} آموزشی`,
      "تقویت مهارت شنیداری",
      "یادگیری زبان انگلیسی",
      `${contentTypeTitle} رایگان`,
      `${contentTypeTitle} با متن`,
      `${contentTypeTitle} با ترجمه`,
      `آموزش زبان با ${contentTypeTitle}`,
    ],
    alternates: {
      canonical: `https://zabano.com/public/podcast-info/${params.audioId}`,
    },
    openGraph: {
      title: `${contentTypeTitle} ${audioInfo.title} (${englishTitle}) | آموزش زبان انگلیسی با ${contentTypeTitle}`,
      description: audioInfo.description || defaultDescription,
      type: "article",
      locale: "fa_IR",
      url: `https://zabano.com/public/podcast-info/${params.audioId}`,
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
      title: `${contentTypeTitle} ${audioInfo.title} (${englishTitle}) | آموزش زبان انگلیسی با ${contentTypeTitle}`,
      description: audioInfo.description || defaultDescription,
      images: [
        audioInfo.thumbnail || "https://zabano.com/zabano-main-logo.png",
      ],
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "PodcastEpisode",
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

const PodcastInfoPage = async ({ params }: { params: { audioId: string } }) => {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const audioInfo = await GetMovieData(
    params.audioId?.split("-")?.[0],
    accessToken
  );

  return <AudioInfoView audioId={params.audioId} data={audioInfo} />;
};

export default PodcastInfoPage;
