"use client";

import React, { FC } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
import { CatalogPageTypes } from "./types";
import BackIconComponent from "@/components/shared/BackIconComponent";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import CatalogSkeleton from "./components/CatalogSkeleton";

const CatalogRowSliders = dynamic(
  () => import("./components/CatalogRowSliders"),
  { ssr: false, loading: () => <CatalogSkeleton /> }
);
const CatalogBannersRowSlider = dynamic(
  () => import("./components/CatalogBannersRowSlider"),
  { ssr: false, loading: () => <CatalogSkeleton /> }
);
const FaqSection = dynamic(() => import("./components/FaqSection"), {
  ssr: false,
});

const CatalogView: FC<CatalogPageTypes> = (props) => {
  const { isFreeOnly, banners, catalogData, faqData, isAnimation } = props;
  const router = useRouter();

  return (
    <main className="pb-10">
      {isFreeOnly && (
        <div
          className="flex flex-wrap my-5 items-center"
          style={{ direction: "ltr" }}
        >
          <h1 className="flex-auto flex-2 text-right text-2xl font-bold text-main md:text-5xl lg:text-3xl">
            محتوای رایگان زبانو
          </h1>
          <BackIconComponent
            clickHandler={() => router.push("/app/home")}
            className="back-icon"
          />
        </div>
      )}

      <CatalogBannersRowSlider banners={banners} isFreeOnly={isFreeOnly} />
      <CatalogRowSliders catalogData={catalogData} isFreeOnly={isFreeOnly} />

      {/* FAQ Section */}
      {faqData && faqData.length > 0 && <FaqSection faqData={faqData} />}
    </main>
  );
};

export default CatalogView;
