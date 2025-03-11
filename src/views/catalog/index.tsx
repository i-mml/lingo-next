"use client";

import { isMobile } from "react-device-detect";
import React, { FC, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";

import { motion } from "framer-motion";
import { CatalogPageTypes } from "./types";
import BackIconComponent from "@/components/shared/BackIconComponent";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { CmsCatalogItem } from "@/api/types/cms";
import { contentTypeInfos } from "@/constants/contentTypesInfos";
import Image from "next/image";
import clsx from "clsx";
import NeedSubscriptionMovieBadge from "@/components/shared/NeedSubscriptionMovieBadge";

const slideVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const CatalogView: FC<CatalogPageTypes> = (props) => {
  const { catalogData, banners, isAnimation, isFreeOnly } = props;

  const router = useRouter();
  const { isGuest, whoAmI } = useAuth();

  const [open, setOpen] = useState(false);
  const [isSwiping] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const breakPoints = {
    1550: {
      slidesPerView:
        !isGuest && whoAmI?.userpreference?.preferred_language !== 2 ? 5 : 6.4,
    },
    1450: {
      slidesPerView:
        !isGuest && whoAmI?.userpreference?.preferred_language !== 2
          ? 4.4
          : 5.2,
    },

    1390: {
      slidesPerView:
        !isGuest && whoAmI?.userpreference?.preferred_language !== 2
          ? 3.7
          : 4.3,
    },

    1024: {
      slidesPerView: 3.2,
    },

    760: {
      slidesPerView: 4,
    },
    550: {
      slidesPerView:
        !isGuest && whoAmI?.userpreference?.preferred_language !== 2
          ? 1.6
          : 2.3,
    },
    0: {
      slidesPerView:
        !isGuest && whoAmI?.userpreference?.preferred_language !== 2
          ? 1.4
          : 2.3,
    },
  };

  const bannerBreakPoints = {
    1390: {
      slidesPerView:
        !isGuest && whoAmI?.userpreference?.preferred_language !== 2 ? 5.9 : 7,
    },

    1024: {
      slidesPerView: 5,
    },

    760: {
      slidesPerView: 4,
    },
    550: {
      slidesPerView: 2.9,
    },
    0: {
      slidesPerView: 2.75,
    },
  };

  const handleClickMovie = (movie: CmsCatalogItem) => {
    if (!isSwiping) {
      router.push(
        `/public/${contentTypeInfos?.[movie?.content_type]?.route}/${
          movie.id
        }-${movie?.slug}`
      );
    }
  };

  return (
    <main className="container mx-auto">
      {isFreeOnly && (
        <div className="flex flex-wrap " style={{ direction: "ltr" }}>
          <h1 className="my-5 flex-auto flex-2 text-right text-2xl font-bold text-main md:text-5xl lg:text-3xl">
            محتوای رایگان زبانو
          </h1>
          <BackIconComponent
            clickHandler={() => router.push("/app/home")}
            className="back-icon"
          />
        </div>
      )}

      <section
        aria-label="Banners of newest movies carousel"
        role="region"
        className=""
      >
        {!isFreeOnly &&
          (isGuest ||
            !isMobile ||
            (!isGuest && whoAmI?.userpreference?.preferred_language === 2)) && (
            <div
              className="w-100% relative catalog-hero-container cursor-pointer"
              onClick={() => handleClickMovie(banners?.[activeIndex] as any)}
            >
              <motion.img
                key={activeIndex}
                src={
                  isMobile
                    ? process.env.NEXT_PUBLIC_CATALOG_CONTENT_URL +
                      banners?.[activeIndex]?.preview_image
                    : process.env.NEXT_PUBLIC_CATALOG_CONTENT_URL +
                      banners?.[activeIndex]?.banner_image
                }
                alt="header"
                className="w-[100%] h-[calc(80vh-120px)] md:h-[calc(100vh-96px)] object-cover"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideVariants}
              />

              <div
                onClick={() => handleClickMovie(banners?.[activeIndex] as any)}
                className="absolute bottom-[200px] md:bottom-[500px] mx-[5%] border border-primary bg-primary bg-opacity-20 text-white py-3 px-5  rounded-lg text-[16px] md:text-xl font-semibold"
              >
                تماشا و یادگیری
              </div>
              <Swiper
                modules={[Autoplay, A11y]}
                className={clsx(
                  "px-[5%]",
                  isGuest || whoAmI?.userpreference?.preferred_language === 2
                    ? "bottom-[175px] md:bottom-[218px]"
                    : "bottom-[100px] md:bottom-[150px] "
                )}
                data-tour="tvcatalog-step-1"
                breakpoints={bannerBreakPoints}
                centeredSlides
                centeredSlidesBounds
                lazyPreloadPrevNext={6}
                onTransitionEnd={(e) => {
                  setActiveIndex(e?.realIndex);
                }}
                autoplay={{
                  delay: 3200,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                simulateTouch
                touchMoveStopPropagation
                spaceBetween="8px"
                loop
              >
                {banners?.map((node) => (
                  <SwiperSlide
                    className="cursor-pointer relative z-[999999]"
                    key={node?.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickMovie(node as any);
                    }}
                  >
                    <div className="relative w-fit">
                      <Image
                        width={127}
                        height={190.5}
                        className={clsx(
                          `mx-auto !block`,
                          isGuest ||
                            whoAmI?.userpreference?.preferred_language === 2
                            ? "rounded-lg"
                            : "rounded-lg"
                        )}
                        src={
                          process.env.NEXT_PUBLIC_CATALOG_CONTENT_URL +
                          node.image
                        }
                        alt={
                          process.env.NEXT_PUBLIC_CATALOG_CONTENT_URL +
                          node.preview_image
                        }
                      />
                      {node?.is_locked && <NeedSubscriptionMovieBadge />}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
      </section>
    </main>
  );
};

export default CatalogView;
