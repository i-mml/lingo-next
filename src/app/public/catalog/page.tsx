import { GetCmsByBanner, GetCmsByContentType } from "@/api/services/cms";
import CatalogView from "@/views/catalog";
import { cookies } from "next/headers";
import React from "react";
import { Metadata } from "next";

const CatalogPage = async () => {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const catalogs = await GetCmsByContentType(1, accessToken);
  const banners = await GetCmsByBanner(1, accessToken);

  return (
    <>
      <CatalogView catalogData={catalogs} banners={banners} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "یادگیری زبان با فیلم و سریال",
          description:
            "مجموعه فیلم و سریال ها برای یادگیری زبان به کمک هوش مصنوعی",
          mainEntity: [
            ...banners.map((banner) => ({
              "@type": "CreativeWork",
              name: banner?.title,
              description: banner?.description,
              image: banner?.image,
            })),
            ...catalogs?.map((node) =>
              node?.movies?.map((item) => ({
                "@type": "CreativeWork",
                name: item?.title,
                description: item?.description,
                image: item?.image,
              }))
            ),
          ],
        })}
      </script>
    </>
  );
};

export default CatalogPage;

export const metadata: Metadata = {
  title: "فیلم و سریال آموزش زبان انگلیسی | زبانو",
  description:
    "دسترسی به مجموعه کامل فیلم‌ها و سریال‌های آموزشی زبان انگلیسی با زیرنویس فارسی و انگلیسی. یادگیری زبان با بهترین فیلم‌ها و سریال‌های روز دنیا.",
  keywords: [
    "فیلم آموزش زبان انگلیسی",
    "سریال آموزش زبان",
    "یادگیری زبان با فیلم",
    "یادگیری زبان با سریال",
    "فیلم زبان انگلیسی",
    "سریال زبان انگلیسی",
    "آموزش زبان با فیلم",
    "آموزش زبان با سریال",
    "زیرنویس فارسی انگلیسی",
  ],
  alternates: {
    canonical: "https://zabano.com/public/catalog",
  },
  openGraph: {
    title: "فیلم و سریال آموزش زبان انگلیسی | زبانو",
    description:
      "یادگیری زبان انگلیسی با بهترین فیلم‌ها و سریال‌های روز دنیا. دسترسی به مجموعه کامل با زیرنویس فارسی و انگلیسی.",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com/public/catalog",
    images: [
      {
        url: "https://zabano.com/zabano-main-logo.png",
        width: 1200,
        height: 630,
        alt: "فیلم و سریال آموزش زبان انگلیسی با زبانو",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "فیلم و سریال آموزش زبان انگلیسی | زبانو",
    description: "یادگیری زبان انگلیسی با بهترین فیلم‌ها و سریال‌های روز دنیا",
    images: ["https://zabano.com/zabano-main-logo.png"],
  },
};
