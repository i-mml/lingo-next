import { GetCmsByBanner, GetCmsByContentType } from "@/api/services/cms";
import CatalogView from "@/views/catalog";
import React from "react";

const CatalogPage = async () => {
  const catalogs = await GetCmsByContentType(1);
  const banners = await GetCmsByBanner(1);

  return (
    <>
      <CatalogView catalogData={catalogs} banners={banners} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "یادگیری زبان با فیلم و سریال و انیمیشن",
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
