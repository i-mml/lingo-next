"use client";

import { useAuth } from "@/hooks/use-auth";
import React, { useState } from "react";
import { A11y, Autoplay } from "swiper/modules";

import clsx from "clsx";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { CatalogPageTypes } from "../types";
import { CmsCatalogItem } from "@/api/types/cms";
import { useRouter } from "next/navigation";
import { contentTypeInfos } from "@/constants/content-types-infos";
import NeedSubscriptionMovieBadge from "@/components/shared/NeedSubscriptionMovieBadge";
import { isMobile } from "react-device-detect";
import { motion } from "framer-motion";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import useBookMarkMutation from "@/hooks/use-bookmark-mutation";

const slideVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const CatalogBannersRowSlider = (props: CatalogPageTypes) => {
  const { banners, isFreeOnly } = props;

  const router = useRouter();
  const { isGuest, whoAmI } = useAuth();

  const [isSwiping] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClickMovie = (movie: CmsCatalogItem) => {
    if (!isSwiping) {
      router.push(
        `/public/${contentTypeInfos?.[movie?.content_type]?.route}/${
          movie.id
        }-${movie?.slug}`
      );
    }
  };

  const bannerBreakPoints = {
    1550: {
      slidesPerView:
        !isGuest && whoAmI?.userpreference?.preferred_language !== 2 ? 5.9 : 7,
    },

    1390: {
      slidesPerView:
        !isGuest && whoAmI?.userpreference?.preferred_language !== 2 ? 4.2 : 5,
    },

    1024: {
      slidesPerView:
        !isGuest && whoAmI?.userpreference?.preferred_language !== 2 ? 3.4 : 4,
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

  return (
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
            className="w-100% relative h-[calc(80vh-120px)] md:h-[calc(100vh-96px)] cursor-pointer overflow-hidden"
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
              className="absolute bottom-[210px] md:bottom-[240px] mx-[5%] border border-primary bg-primary backdrop:opacity-10 text-white py-3 px-5  rounded-lg text-[16px] md:text-xl font-semibold"
            >
              تماشا و یادگیری
            </div>
            <Swiper
              modules={[Autoplay, A11y]}
              className={clsx(
                "px-[5%]",
                isGuest || whoAmI?.userpreference?.preferred_language === 2
                  ? "bottom-[200px] md:bottom-[218px]"
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
                  <article
                    aria-labelledby={`item-${node.id}-title`}
                    className="relative w-fit"
                  >
                    <Image
                      width={
                        isGuest ||
                        whoAmI?.userpreference?.preferred_language === 2
                          ? 127
                          : 212
                      }
                      height={
                        isGuest ||
                        whoAmI?.userpreference?.preferred_language === 2
                          ? 190.5
                          : 120
                      }
                      className={clsx(
                        `mx-auto !block rounded-lg`,
                        isGuest ||
                          whoAmI?.userpreference?.preferred_language === 2
                          ? "w-[112px] h-[168px] md:w-[127px] md:h-[190.5px]"
                          : "w-[212px] h-[120px] "
                      )}
                      src={
                        process.env.NEXT_PUBLIC_CATALOG_CONTENT_URL + node.image
                      }
                      alt={node.title}
                      priority
                    />
                    {node?.is_locked && <NeedSubscriptionMovieBadge />}
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

      {!isFreeOnly &&
        !isGuest &&
        whoAmI?.userpreference?.preferred_language !== 2 &&
        isMobile && (
          <Swiper
            spaceBetween="2%"
            loop
            modules={[Autoplay, A11y]}
            breakpoints={{
              550: {
                slidesPerView: 1.8,
              },
              0: {
                slidesPerView: 1.2,
              },
            }}
            autoplay={{
              delay: 3200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            centeredSlides
            className="mt-5"
          >
            {banners?.map((node) => (
              <SwiperSlide
                className="!rounded-lg "
                key={node?.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickMovie(node as any);
                }}
              >
                <article
                  className="relative"
                  key={node.id}
                  aria-labelledby={`item-${node.id}-title`}
                >
                  <Image
                    width={343}
                    height={194}
                    src={
                      process.env.NEXT_PUBLIC_CATALOG_CONTENT_URL + node.image
                    }
                    alt={node.title}
                    className="!rounded-xl object-cover"
                    priority
                  />
                  <div
                    className={clsx(
                      "absolute bottom-0 right-0 left-0 bg-[black]/60 rounded-b-lg flex items-center z-50",
                      !isGuest &&
                        whoAmI?.userpreference?.preferred_language !== 2
                        ? "py-0.5 px-0.5"
                        : "py-2 px-2"
                    )}
                  >
                    <h2
                      className="flex-1 line-clamp-1 text-white text-lg lg:text-xl px-2 font-medium"
                      dir={
                        !isGuest &&
                        whoAmI?.userpreference?.preferred_language !== 2
                          ? "ltr"
                          : "rtl"
                      }
                    >
                      {node?.title || ""}
                    </h2>
                  </div>
                  {node?.is_locked && <NeedSubscriptionMovieBadge />}
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
    </section>
  );
};

export default CatalogBannersRowSlider;
