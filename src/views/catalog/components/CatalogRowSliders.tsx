"use client";

import { useAuth } from "@/hooks/use-auth";
import AnswerItem from "@/views/how-to-use/components/AnswerItem";
import React, { useState } from "react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import VideoModal from "./VideoModal";
import OpenModalButton from "./OpenModalButton";
import clsx from "clsx";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import useThemeCreator from "@/hooks/use-theme";
import useBookMarkMutation from "@/hooks/use-bookmark-mutation";
import { CatalogPageTypes } from "../types";
import { CmsCatalogItem } from "@/api/types/cms";
import { useParams, useRouter } from "next/navigation";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { contentTypeInfos } from "@/constants/content-types-infos";
import NeedSubscriptionMovieBadge from "@/components/shared/NeedSubscriptionMovieBadge";
import Link from "next/link";

const CatalogRowSliders = (
  props: Pick<CatalogPageTypes, "catalogData" | "isFreeOnly">
) => {
  const { catalogData, isFreeOnly } = props;
  const { locale } = useParams();
  const router = useRouter();
  const { isGuest, whoAmI } = useAuth();

  const [open, setOpen] = useState(false);
  const [isSwiping] = useState(false);

  const bookmarkMutation = useBookMarkMutation({ queryKey: "" });
  const { theme } = useThemeCreator();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickMovie = (movie: CmsCatalogItem) => {
    if (!isSwiping) {
      router.push(
        `/public/${contentTypeInfos?.[movie?.content_type]?.route}/${
          movie.id
        }-${movie?.slug}`
      );
    }
  };
  const hasLocale = !!locale;
  const isEnglishLocale = locale === "en";

  const getImageWidth = () => {
    if (isGuest) {
      if (hasLocale) {
        return isEnglishLocale ? 212 : 262;
      } else {
        return 212;
      }
    } else {
      return !whoAmI?.userpreference?.preferred_language ||
        whoAmI?.userpreference?.preferred_language === 2
        ? 212
        : 262;
    }
  };
  const getImageHeight = () => {
    if (isGuest) {
      if (hasLocale) {
        return isEnglishLocale ? 318 : 147;
      } else {
        return 318;
      }
    } else {
      return !whoAmI?.userpreference?.preferred_language ||
        whoAmI?.userpreference?.preferred_language === 2
        ? 318
        : 147;
    }
  };

  const breakPoints = {
    1550: {
      slidesPerView: getImageWidth() === 212 ? 5 : 6.4,
    },
    1450: {
      slidesPerView: getImageWidth() === 212 ? 4.2 : 5.2,
    },

    1390: {
      slidesPerView: getImageWidth() === 212 ? 3.7 : 4.3,
    },

    1024: {
      slidesPerView: 3.2,
    },

    760: {
      slidesPerView: 4,
    },
    550: {
      slidesPerView: getImageWidth() === 212 ? 1.6 : 2.3,
    },
    0: {
      slidesPerView: getImageWidth() === 212 ? 2.3 : 1.4,
    },
  };

  return (
    <section className="px-4 md:px-6 mt-5">
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
                <SwiperSlide key={movieIndex} className={clsx("rounded-lg")}>
                  <Link
                    href={`/public/${
                      contentTypeInfos?.[movie?.content_type]?.route
                    }/${movie.id}-${movie?.slug}`}
                  >
                    <article className="relative w-fit">
                      <Image
                        width={getImageWidth()}
                        height={getImageHeight()}
                        className={clsx(
                          "rounded-lg object-cover cursor-pointer",
                          getImageWidth() === 212
                            ? "w-[156px] h-[230px] md:w-[212px] md:h-[318px]"
                            : "w-[262px] h-[147px] md:w-[274px] md:h-[155px]"
                        )}
                        src={
                          process.env.NEXT_PUBLIC_CATALOG_CONTENT_URL +
                          movie.image
                        }
                        alt={movie.title}
                        onClick={() => handleClickMovie(movie)}
                        loading="lazy"
                      />
                      <div
                        className={clsx(
                          "absolute bottom-0 right-0 left-0 bg-[black]/60 rounded-b-lg flex items-center z-50",
                          getImageWidth() === 212
                            ? "py-0.5 px-0.5"
                            : "py-2 px-2"
                        )}
                      >
                        <h2
                          className="flex-1 line-clamp-1 text-white"
                          dir={getImageWidth() === 212 ? "ltr" : "rtl"}
                        >
                          {movie?.title || ""}
                        </h2>
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
                    </article>
                  </Link>
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
  );
};

export default CatalogRowSliders;
