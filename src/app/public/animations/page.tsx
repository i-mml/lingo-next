import { GetCmsByBanner, GetCmsByContentType } from "@/api/services/cms";
import CatalogView from "@/views/catalog";
import { cookies } from "next/headers";
import React from "react";

const CatalogPage = async () => {
  const accessToken = (await cookies()).get("zabano-access-token")?.value;
  const catalogs = await GetCmsByContentType(6, accessToken);
  const banners = await GetCmsByBanner(6, accessToken);

  return (
    <>
      <CatalogView catalogData={catalogs} banners={banners} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "یادگیری زبان با انیمیشن",
          description:
            "مجموعه انیمیشن های جذاب برای یادگیری زبان به کمک هوش مصنوعی",
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
