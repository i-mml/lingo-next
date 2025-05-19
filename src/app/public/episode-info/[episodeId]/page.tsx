import { GetEpisodeDetailData } from "@/api/services/cms";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";
import Link from "next/link";
import ShowMore from "@/components/shared/ShowMore";
import { ContentType } from "@/views/catalog/types";
import { contentTypeInfos } from "@/constants/content-types-infos";
import { languageDictionaryByCode } from "@/constants/locales";
import EpisodeInfoBreadCrumbs from "@/views/video-info/components/EpisodeInfoBreadCrumbs";

export async function generateMetadata({
  params,
}: {
  params: { episodeId: string };
}): Promise<Metadata> {
  const { episodeId } = params;
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const episodeInfo = await GetEpisodeDetailData(episodeId, accessToken);

  // Create transcript text from subtitles
  const transcript = episodeInfo?.subtitle?.[0]?.subtitle_lines?.subtitle
    ?.map(
      (line: any) => `${line.sentence.subtitle}\n${line.sentence.translate}`
    )
    .join("\n\n");

  // Get content type info
  const contentTypeInfo =
    contentTypeInfos[episodeInfo?.movie?.content_type as ContentType];

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "خانه",
        item: "https://zabano.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${contentTypeInfo?.title} ها`,
        item: `https://zabano.com/public/${contentTypeInfo?.listRoute}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: episodeInfo?.movie?.title || "محتوای آموزشی",
        item: `https://zabano.com/public/${contentTypeInfo?.route}/${episodeInfo?.movie?.id}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: episodeInfo?.name || "قسمت",
        item: `https://zabano.com/public/episode-info/${episodeId}`,
      },
    ],
  };

  // VideoObject schema for SEO
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: episodeInfo?.name || episodeInfo?.movie?.title,
    description: episodeInfo?.movie?.description,
    thumbnailUrl: episodeInfo?.movie?.preview_image,
    uploadDate: new Date().toISOString(),
    duration: `PT${Math.floor(episodeInfo?.duration / 60)}M${
      episodeInfo?.duration % 60
    }S`,
    publisher: {
      "@type": "Organization",
      name: "زبانو",
      logo: {
        "@type": "ImageObject",
        url: "https://zabano.com/zabano-main-logo.png",
      },
    },
    transcript: transcript,
    inLanguage: {
      "@type": "Language",
      name: "English",
    },
    translation: {
      "@type": "Language",
      name: "Persian",
      alternateName: "Farsi",
    },
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/WatchAction",
      userInteractionCount: episodeInfo?.views || 0,
    },
  };

  return {
    title: `${episodeInfo?.name || episodeInfo?.movie?.title} | زبانو`,
    description: episodeInfo?.movie?.description,
    alternates: {
      canonical: `https://zabano.com/public/episode-info/${episodeId}`,
    },
    openGraph: {
      title: `${episodeInfo?.name || episodeInfo?.movie?.title} | زبانو`,
      description: episodeInfo?.movie?.description,
      images: [episodeInfo?.movie?.preview_image],
      url: `https://zabano.com/public/episode-info/${episodeId}`,
    },
    other: {
      "script:ld+json": JSON.stringify([videoSchema, breadcrumbSchema]),
    },
  };
}

const EpisodeSeoPage = async ({
  params,
}: {
  params: { episodeId: string };
}) => {
  const { episodeId } = params;
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const episodeInfo = await GetEpisodeDetailData(episodeId, accessToken);

  const language =
    languageDictionaryByCode?.[
      episodeInfo?.movie?.language as keyof typeof languageDictionaryByCode
    ]?.language;

  // Format time to minutes:seconds
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <EpisodeInfoBreadCrumbs episodeInfo={episodeInfo} />
      </div>

      {/* Banner */}
      {episodeInfo?.movie?.banner_image && (
        <img
          src={episodeInfo.movie.banner_image}
          alt={episodeInfo?.name || episodeInfo?.movie?.title}
          className="w-full rounded-lg mb-6"
        />
      )}

      {/* Title */}
      <p className="text-2xl md:text-3xl font-bold mb-4 text-center">
        {episodeInfo?.name || episodeInfo?.movie?.title}
      </p>

      {/* Movie Info */}
      <div className="flex flex-wrap justify-center gap-4 mb-6 text-gray400">
        <span>لهجه: {episodeInfo?.movie?.accent}</span>
        <span>سطح: {episodeInfo?.movie?.cefr_level}</span>
        <span>مدت زمان: {Math.floor(episodeInfo?.duration / 60)} دقیقه</span>
      </div>

      {/* Subtitles Script */}
      {episodeInfo?.subtitle?.[0]?.subtitle_lines?.subtitle && (
        <div className="bg-backgroundMain rounded-xl p-6">
          <h1 className="text-xl font-semibold mb-8 text-center text-main">
            یادگیری زبان با کمک متن و ترجمه{" "}
            {episodeInfo?.name || episodeInfo?.movie?.title}
          </h1>

          <div className="space-y-4">
            {episodeInfo.subtitle[0].subtitle_lines.subtitle
              .slice(0, 20)
              ?.map((line: any, index: number) => (
                <div key={index} className="relative">
                  {/* Time Stamp */}
                  <div className="absolute right-3 top-2 text-xs text-gray400 z-40">
                    {formatTime(line.start_time)}
                  </div>

                  {/* Script Content */}
                  <div className="flex flex-col gap-2">
                    {/* Original Text */}
                    <div className="bg-backgroundLayout rounded-lg pt-6 p-4 shadow-sm">
                      <p className="text-main text-left" dir="ltr">
                        {line.sentence.subtitle}
                      </p>
                      <p className="text-gray400 text-right" dir="rtl">
                        {line.sentence.translate}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="text-gray300 text-sm mt-5">
            برای یادگیری با ابزار های خفن زبانو ، وارد صفحه پخش این محتوا بشید و
            اصولی یادگیری رو تجربه کنید
          </div>
        </div>
      )}

      {/* Description */}
      <div className="prose max-w-none mt-8 pb-10">
        <ShowMore
          text={episodeInfo?.movie?.description}
          maxLength={80}
          textClassName="!text-gray300"
          className=""
          lineClampClassName="line-clamp-2"
        />
      </div>

      <Link
        href={`/login`}
        className="h-12 px-2 font-dana text-[14px] text-center !rounded-xl bg-primary font-medium !transition-all !duration-500  !text-white  disabled:bg-backgroundDisabled disabled:border-b-backgroundDisabled disabled:cursor-not-allowed active:hover:translate-y-0.5 active:translate-y-1.5 border-b-[5px] border-[#af5800] cursor-pointer outline-none w-[60%] mx-auto hidden place-items-center text-base md:text-lg md:!grid print:!hidden"
      >
        ورود و تماشا
      </Link>

      <Link
        href={`/login`}
        className="h-12 px-2 font-dana text-[14px] text-center !rounded-xl bg-primary font-medium !transition-all !duration-500  !text-white  disabled:bg-backgroundDisabled disabled:border-b-backgroundDisabled disabled:cursor-not-allowed active:hover:translate-y-0.5 active:translate-y-1.5 border-b-[5px] border-[#af5800] cursor-pointer outline-none fixed w-[90%] left-[5%] grid place-items-center bottom-5 text-base md:text-lg md:!hidden print:!hidden"
      >
        ورود و تماشا
      </Link>
    </div>
  );
};

export default EpisodeSeoPage;
