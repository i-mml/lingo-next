"use client";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { isMobile } from "react-device-detect";
import React, { FC, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";

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
import useBookMarkMutation from "@/hooks/use-bookmark-mutation";
import useThemeCreator from "@/hooks/useTheme";
import AnswerItem from "../how-to-use/components/AnswerItem";
import VideoModal from "./components/VideoModal";
import OpenModalButton from "./components/OpenModalButton";

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

  const bookmarkMutation = useBookMarkMutation({ queryKey: "" });
  const { theme } = useThemeCreator();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <main className="">
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
                            node.title || ""
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
      <section className="px-4 md:px-6">
        <div className="sliders-content-view">
          {catalogData?.map((section, index) => (
            <div key={index} className="slider-wrapper">
              <div className=" text-lg lg:text-2xl text-main font-extrabold	py-2">
                {section?.title}
              </div>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                className="swiper-component"
                breakpoints={breakPoints}
                lazyPreloadPrevNext={4}
                spaceBetween="10px"
              >
                {section?.movies?.map((movie, movieIndex) => (
                  <SwiperSlide
                    key={movieIndex}
                    // onMouseEnter={(e) => {
                    //   setHoveredMovie(movie);
                    //   if (e.clientX < 230 || movieIndex === 0) {
                    //     setIsNearId(movie?.id);
                    //   }
                    // }}
                    // onMouseLeave={() => {
                    //   setHoveredMovie(null);
                    //   setIsNearId(null);
                    // }}
                    onClick={() => handleClickMovie(movie)}
                    className={clsx("rounded-lg")}
                  >
                    <div className="relative w-fit">
                      <Image
                        width={212}
                        height={318}
                        className={clsx(
                          "rounded-lg w-[140px] h-[209px] md:w-[212px] md:h-[318px]"
                        )}
                        src={
                          process.env.NEXT_PUBLIC_CATALOG_CONTENT_URL +
                          movie.image
                        }
                        alt={
                          process.env.NEXT_PUBLIC_CATALOG_CONTENT_URL +
                          movie.title
                        }
                        onClick={() => handleClickMovie(movie)}
                      />
                      <div
                        className={clsx(
                          "absolute bottom-2 right-0 left-0 bg-[black]/60 rounded-b-lg flex items-center z-50",
                          !isGuest &&
                            whoAmI?.userpreference?.preferred_language !== 2
                            ? "py-0.5 px-0.5"
                            : "py-2 px-2"
                        )}
                      >
                        <div
                          className="flex-1 line-clamp-1 text-white"
                          dir={
                            !isGuest &&
                            whoAmI?.userpreference?.preferred_language !== 2
                              ? "ltr"
                              : "rtl"
                          }
                        >
                          {movie?.title || ""}
                        </div>
                        {!isGuest && (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              bookmarkMutation.mutate({ movieId: movie?.id });
                            }}
                          >
                            {movie?.is_bookmarked ? (
                              <BookmarkIcon
                                className="shadow-lg"
                                style={{
                                  fontSize: 32,
                                  color: theme.palette.text?.primary,
                                }}
                              />
                            ) : (
                              <BookmarkBorderIcon
                                className="shadow-lg"
                                style={{
                                  fontSize: 32,
                                  color: theme.palette.text?.primary,
                                }}
                              />
                            )}
                          </div>
                        )}
                      </div>
                      {movie?.is_locked && <NeedSubscriptionMovieBadge />}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              {isFreeOnly && index === 0 && (
                <section className="mt-4 px-2">
                  <h2 className="text-2xl lg:text-3xl  font-bold text-center mb-7 lg:mb-12 text-main">
                    چطور با تماشا کردن یادبگیرم؟
                  </h2>{" "}
                  <OpenModalButton handleOpen={handleOpen} />
                  <VideoModal open={open} handleClose={handleClose} />
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
                    <div className="grid grid-cols-2 gap-4">
                      <img
                        alt="word detail"
                        src="/images/word-detail.jpg"
                        className="w-full rounded-lg max-w-[420px] lg:max-w-[300px]"
                      />
                      <img
                        alt="video player"
                        src="/images/player-view.jpg"
                        className="w-full rounded-lg max-w-[420px] lg:max-w-[300px]"
                      />
                    </div>
                    <div className="space-y-6">
                      <AnswerItem
                        num={1}
                        title="یک محتوا (فیلم-انیمیشن-موسیقی) رو انتخاب کنید"
                        description="لیست محتواها را ببینید و محتوایی را انتخاب کنید که با سطح یادگیری شما مطابقت دارد."
                      />
                      <AnswerItem
                        num={2}
                        title="گوش بده، تکرار کن،اجزا و گرامر جمله رو ببین"
                        description="هنگام تماشای محتوا اون دیالوگی که دوست دارید رو تکرار کنید و درصد تشابه به جمله رو متوجه بشید و اجزا جمله و گرامر جمله و تکرار دوباره جمله هم در اختیار شما قرار گرفته."
                      />
                      <AnswerItem
                        num={3}
                        title="تمام اطلاعات یک کلمه رو ببین"
                        description="با کلیک بر روی هر کلمه انگلیسی از زیرنویس معنی فارسی، انگلیسی ، اطلاعات دیکشنری های لانگ‌من و کالینز رو ببینید."
                      />
                    </div>
                  </div>
                </section>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CatalogView;
