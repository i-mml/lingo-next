"use client";

import { useAuth } from "@/hooks/use-auth";
import React, { useState } from "react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";

import clsx from "clsx";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import useThemeCreator from "@/hooks/use-theme";
import useBookMarkMutation from "@/hooks/use-bookmark-mutation";
import { CmsCatalogItem } from "@/api/types/cms";
import { useRouter } from "next/navigation";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { contentTypeInfos } from "@/constants/content-types-infos";
import NeedSubscriptionMovieBadge from "@/components/shared/NeedSubscriptionMovieBadge";
import { AudioBookProps } from "../types";
import Link from "next/link";

const AudioBookRowSliders = (props: Pick<AudioBookProps, "audioBooks">) => {
  const { audioBooks } = props;

  const router = useRouter();
  const { isGuest, whoAmI } = useAuth();

  const [open, setOpen] = useState(false);
  const [isSwiping] = useState(false);

  const bookmarkMutation = useBookMarkMutation({ queryKey: "" });
  const { theme } = useThemeCreator();

  const breakPoints = {
    1390: {
      slidesPerView:
        isGuest || whoAmI?.userpreference?.preferred_language === 2 ? 5.2 : 4.3,
    },
    1024: {
      slidesPerView:
        isGuest || whoAmI?.userpreference?.preferred_language === 2 ? 3.7 : 3.6,
    },
    760: {
      slidesPerView: 3,
    },
    550: {
      slidesPerView: 2.3,
    },
    0: {
      slidesPerView:
        isGuest || whoAmI?.userpreference?.preferred_language === 2
          ? 2.16
          : 1.6,
    },
  };

  return (
    <section className="px-4 md:px-6 mt-5">
      <div className="sliders-content-view">
        {audioBooks?.map((section, index) => (
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
                <SwiperSlide key={movie.id} className={clsx("rounded-lg")}>
                  <Link
                    href={`/public/${
                      contentTypeInfos?.[movie?.content_type]?.route
                    }/${movie?.id}-${movie?.slug}`}
                    className="w-full rounded-lg"
                  >
                    <article className="relative w-fit">
                      <Image
                        width={212}
                        height={318}
                        className={clsx(
                          "rounded-lg object-cover cursor-pointer",
                          isGuest ||
                            whoAmI?.userpreference?.preferred_language === 2
                            ? "rounded-lg h-[276px] w-[170px] object-cover"
                            : "rounded-lg w-[240.75px] h-[136.9px] object-cover"
                        )}
                        src={
                          process.env.NEXT_PUBLIC_CATALOG_CONTENT_URL +
                          movie.image
                        }
                        alt={movie.title}
                        loading="lazy"
                      />
                      <div
                        className={clsx(
                          "flex items-center",
                          !isGuest &&
                            whoAmI?.userpreference?.preferred_language !== 2
                            ? "py-0.5 px-0.5"
                            : "py-2 px-2"
                        )}
                      >
                        <h2
                          className="flex-1 line-clamp-1 text-main font-bold text-[16px]"
                          dir={
                            !isGuest &&
                            whoAmI?.userpreference?.preferred_language !== 2
                              ? "ltr"
                              : "rtl"
                          }
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
                                className=""
                                style={{
                                  fontSize: 32,
                                  color: theme.palette.text?.primary,
                                }}
                              />
                            ) : (
                              <BookmarkBorderIcon
                                className=""
                                style={{
                                  fontSize: 32,
                                  color: theme.palette.text?.primary,
                                }}
                              />
                            )}
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray400 leading-5 mt-2 text-left">
                        {movie?.content_owner || "-"}
                      </p>
                      {movie?.is_locked && <NeedSubscriptionMovieBadge />}
                    </article>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AudioBookRowSliders;
