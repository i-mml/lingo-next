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

  const generateVideoSchema = () => {
    const schemas = [];

    // Add preview movie schema if exists
    if (videoInfo?.preview_movie) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: videoInfo.title,
        description: videoInfo.description,
        thumbnailUrl: videoInfo.image,
        uploadDate: new Date().toISOString(),
        duration: videoInfo.duration ?? null,
        contentUrl: videoInfo.preview_movie,
        embedUrl: videoInfo.preview_movie,
        publisher: {
          "@type": "Organization",
          name: "زبانو",
          logo: {
            "@type": "ImageObject",
            url: "https://zabano.com/zabano-main-logo.png",
          },
        },
      });
    }

    // Add episodes schemas
    if (videoInfo?.episodes) {
      videoInfo.episodes.forEach((episode: any) => {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: episode.name,
          description: videoInfo.description,
          thumbnailUrl: videoInfo.image,
          uploadDate: new Date().toISOString(),
          duration: episode.duration,
          publisher: {
            "@type": "Organization",
            name: "زبانو",
            logo: {
              "@type": "ImageObject",
              url: "https://zabano.com/zabano-main-logo.png",
            },
          },
        });
      });
    }

    return schemas;
  };

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
      title: `${videoInfo?.title || "ویدیو آموزشی زبان انگلیسی"} | زبانو`,
      description: videoInfo?.description,
      images: [videoInfo?.image],
    },
    other: {
      "script:ld+json": JSON.stringify(generateVideoSchema()),
    },
    twitter: {
      card: "summary_large_image",
      title: `${
        videoInfo?.meta_title ||
        "ویدیو آموزشی زبان انگلیسی | یادگیری با تماشای ویدیو"
      } | زبانو`,
      description: `${
        videoInfo?.meta_description ||
        "ویدیو آموزشی زبان انگلیسی با ترجمه فارسی برای یادگیری بهتر و سریع‌تر"
      } | زبانو`,
      images: videoInfo?.image
        ? [videoInfo.image]
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
    { name: "خانه", url: "https://zabano.com" },
    {
      name: `${contentType.title} ها`,
      url: `https://zabano.com${
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
      url: `https://zabano.com/public/podcast-info/${videoId}`,
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
            thumbnailUrl: videoInfo?.image
              ? videoInfo.image
              : "https://zabano.com/zabano-main-logo.png",
            uploadDate: videoInfo?.released_at || new Date().toISOString(),
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
