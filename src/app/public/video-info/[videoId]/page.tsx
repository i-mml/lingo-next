import { GetMovieDetailData } from "@/api/services/cms";
import FaqSection from "@/components/shared/FaqSection";
import { contentTypeInfos } from "@/constants/content-types-infos";
import {
  languageDictionaryByCode,
  localesDictionary,
} from "@/constants/locales";
import { ContentType } from "@/views/catalog/types";
import VideoInformationView from "@/views/video-info";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export async function generateMetadata({
  params,
}: {
  params: { videoId: string };
}): Promise<Metadata> {
  const { videoId } = params;
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const videoInfo = await GetMovieDetailData(
    videoId?.split("-")?.[0],
    accessToken
  );

  return {
    title: `${videoInfo?.title || "ویدیو آموزشی زبان انگلیسی"} | زبانو`,
    description:
      videoInfo?.description ||
      "یادگیری زبان انگلیسی با تماشای ویدیوهای آموزشی با کیفیت و ترجمه فارسی. تقویت مهارت شنیداری و گفتاری با محتوای تصویری کاربردی و جذاب." +
        " | زبانو",
    keywords: [
      "آموزش زبان انگلیسی با ویدیو",
      "ویدیو آموزش انگلیسی",
      "یادگیری انگلیسی با فیلم",
      "آموزش انگلیسی تصویری",
      "فیلم آموزشی انگلیسی با ترجمه فارسی",
      "ویدیو آموزشی زبان با زیرنویس",
      videoInfo?.title?.replace(/[^\u0600-\u06FFa-zA-Z0-9 ]/g, "") || "",
      videoInfo?.description
        ?.slice(0, 30)
        ?.replace(/[^\u0600-\u06FFa-zA-Z0-9 ]/g, "") || "",
    ],
    alternates: {
      canonical: `https://zabano.com/public/video-info/${videoId}`,
    },
    openGraph: {
      title: `${
        videoInfo?.title || "ویدیو آموزشی زبان انگلیسی"
      } | یادگیری با تماشای ویدیو | زبانو`,
      description:
        videoInfo?.description ||
        "یادگیری زبان انگلیسی با تماشای ویدیوهای آموزشی با کیفیت و ترجمه فارسی. تقویت مهارت شنیداری و گفتاری با محتوای تصویری." +
          " | زبانو",
      type: "video.other",
      locale: "fa_IR",
      url: `https://zabano.com/public/video-info/${videoId}`,
      images: videoInfo?.cover
        ? [
            {
              url: `${process.env.NEXT_PUBLIC_CATALOG_CONTENT_URL}${videoInfo.cover}`,
              width: 1200,
              height: 630,
              alt: videoInfo?.title || "ویدیو آموزشی زبان انگلیسی",
            },
          ]
        : [
            {
              url: "https://zabano.com/zabano-main-logo.png",
              width: 1200,
              height: 630,
              alt: "زبانو - آموزش زبان انگلیسی با ویدیو",
            },
          ],
      videos: videoInfo?.video_url
        ? [
            {
              url: videoInfo.video_url,
              type: "video/mp4",
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${
        videoInfo?.title || "ویدیو آموزشی زبان انگلیسی"
      } | یادگیری با تماشای ویدیو | زبانو`,
      description:
        videoInfo?.description?.slice(0, 200) ||
        "یادگیری زبان انگلیسی با تماشای ویدیوهای آموزشی با کیفیت و ترجمه فارسی." +
          " | زبانو",
      images: videoInfo?.cover
        ? [`${process.env.NEXT_PUBLIC_CATALOG_CONTENT_URL}${videoInfo.cover}`]
        : ["https://zabano.com/zabano-main-logo.png"],
    },
  };
}

const VideoInformationPage = async ({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) => {
  const { videoId } = await params;

  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const videoInfo = await GetMovieDetailData(
    videoId?.split("-")?.[0],
    accessToken
  );
  const contentType = contentTypeInfos[videoInfo.content_type as ContentType];

  const breadcrumbItems = [
    { name: "خانه", url: "/" },
    {
      name: `${contentType.title} ها`,
      url: `${
        !!accessToken
          ? ""
          : `/${
              languageDictionaryByCode?.[
                videoInfo.language as keyof typeof languageDictionaryByCode
              ]?.language
            }`
      }/public/${contentType.listRoute}`,
    },
    {
      name: videoInfo.title,
      url: `/public/podcast-info/${videoId}`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: `${
              videoInfo?.meta_title ||
              "ویدیو آموزشی زبان انگلیسی | یادگیری با تماشای ویدیو"
            } | زبانو`,
            description: `${
              videoInfo?.meta_description ||
              "ویدیو آموزشی زبان انگلیسی با ترجمه فارسی برای یادگیری بهتر و سریع‌تر"
            } | زبانو`,
            thumbnailUrl: videoInfo?.cover
              ? `${process.env.NEXT_PUBLIC_CATALOG_CONTENT_URL}${videoInfo.cover}`
              : "https://zabano.com/zabano-main-logo.png",
            uploadDate: videoInfo?.released_at || new Date().toISOString(),
            contentUrl: videoInfo?.video_url || "",
            embedUrl: `https://zabano.com/public/video-info/${videoId}`,
            duration: videoInfo?.duration_sec
              ? `PT${Math.floor(videoInfo.duration_sec / 60)}M${
                  videoInfo.duration_sec % 60
                }S`
              : "PT5M",
            accessMode: "visual, auditory",
            accessibilityFeature: ["captions", "transcript"],
            inLanguage: "en",
            publisher: {
              "@type": "Organization",
              name: "زبانو",
              logo: {
                "@type": "ImageObject",
                url: "https://zabano.com/zabano-main-logo.png",
              },
            },
            educationalUse: "آموزش زبان انگلیسی با ویدیو",
            educationalAlignment: {
              "@type": "AlignmentObject",
              alignmentType: "educationalSubject",
              targetName: "یادگیری زبان انگلیسی با محتوای تصویری",
            },
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
        }}
      />
      <VideoInformationView params={{ videoId, data: videoInfo }} />
      {/* FAQ Section */}
      {!!videoInfo?.faq && videoInfo?.faq.length > 0 && (
        <FaqSection
          faqs={videoInfo?.faq}
          includeSchema
          title="سوالات متداول"
          className="relative bg-backgroundLayout w-full rounded-lg"
        />
      )}
    </>
  );
};

export default VideoInformationPage;
