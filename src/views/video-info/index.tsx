"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { Bookmark, BookmarkBorder, PlayArrow } from "@mui/icons-material";
import { useAuth } from "@/hooks/use-auth";
import NeedSubscriptionMovieBadge from "@/components/shared/NeedSubscriptionMovieBadge";
import BackIconComponent from "@/components/shared/BackIconComponent";
import { contentTypeInfos } from "@/constants/content-types-infos";
import { languageLevels } from "@/constants/language-levels";
import Image from "next/image";
import OutlineButton from "@/components/shared/OutlineButton";
import PrimaryButton from "@/components/shared/PrimaryButton";
import SectionTitle from "@/components/shared/SectionTitle";
import { PostAuthBookmarks } from "@/api/services/auth";
import { useLoginModal } from "@/store/use-login-modal";
import { PieChart } from "react-minimal-pie-chart";
import PieChartInfos from "./components/PieChartInfos";
import { toast } from "react-toastify";
import LoginModal from "@/components/modals/LoginModal";
import SubscriptionModal from "@/components/modals/SubscriptionModal";

import AnouncementIcon from "@/assets/anouncement.svg";
import LeadingIcon from "@/assets/leading.svg";
import VideoInfoBreadcrumbs from "./components/VideoInfoBreadcrumbs";
import clsx from "clsx";

const VideoInformationView = ({
  params,
}: {
  params: { videoId: string; data: any };
}) => {
  const router = useRouter();
  const { videoId, data } = params;
  const { whoAmI, isGuest } = useAuth();
  const { isOpen, toggleLoginModal } = useLoginModal();

  const [openSubsModal, setOpenSubsModal] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(data?.is_bookmarked);
  const [targetClick, setTargetClick] = useState<{
    type: "QUIZ" | "PLAY" | "";
    id: number | null;
  }>({
    type: "",
    id: null,
  });

  const bookmarkMutation = useMutation({
    mutationFn: async ({ movieId }: { movieId: number }) => {
      await PostAuthBookmarks(movieId);
    },
    onSuccess: () => {
      setIsBookmarked((prev: boolean) => !prev);
    },
  });

  const toggleSubscriptionModal = () => {
    setOpenSubsModal((prev) => !prev);
  };

  const handlePlayClick = (id: any) => {
    setTargetClick({ type: "PLAY", id: id });
    if (!!data?.is_locked) {
      toggleSubscriptionModal();
      return;
    }
    if (isGuest) {
      toggleLoginModal();
      return;
    }

    router.push(`/app/show/${data?.id}/${id}`);
  };

  const handleQuizClick = (id: any) => {
    setTargetClick({ type: "QUIZ", id: id });
    if (!!data?.is_locked) {
      toggleSubscriptionModal();
      return;
    }
    if (isGuest) {
      toggleLoginModal();
      return;
    }

    router.push(`/app/quiz/${data?.id}/${id}`);
  };

  function sumScores(episodes: any) {
    const uniqueWords = episodes?.reduce(
      (
        total: number,
        item: { difficulty_summary: { unique_words: number } }
      ) => {
        const scoreValue =
          typeof item?.difficulty_summary?.unique_words === "number"
            ? item?.difficulty_summary?.unique_words
            : 0;
        return total + scoreValue;
      },
      0
    );
    const A1Count = episodes?.reduce(
      (
        total: number,
        item: { difficulty_summary: { difficulties: { A1: number } } }
      ) => {
        const scoreValue =
          typeof item?.difficulty_summary?.difficulties.A1 === "number"
            ? item?.difficulty_summary?.difficulties?.A1
            : 0;
        return total + scoreValue;
      },
      0
    );
    const B1Count = episodes?.reduce(
      (
        total: number,
        item: { difficulty_summary: { difficulties: { B1: number } } }
      ) => {
        const scoreValue =
          typeof item?.difficulty_summary?.difficulties.B1 === "number"
            ? item?.difficulty_summary?.difficulties?.B1
            : 0;
        return total + scoreValue;
      },
      0
    );
    const C1Count = episodes?.reduce(
      (
        total: number,
        item: { difficulty_summary: { difficulties: { C1: number } } }
      ) => {
        const scoreValue =
          typeof item?.difficulty_summary?.difficulties.C1 === "number"
            ? item?.difficulty_summary?.difficulties?.C1
            : 0;
        return total + scoreValue;
      },
      0
    );
    const A2Count = episodes?.reduce(
      (
        total: number,
        item: { difficulty_summary: { difficulties: { A2: number } } }
      ) => {
        const scoreValue =
          typeof item?.difficulty_summary?.difficulties.A2 === "number"
            ? item?.difficulty_summary?.difficulties?.A2
            : 0;
        return total + scoreValue;
      },
      0
    );
    const B2Count = episodes?.reduce(
      (
        total: number,
        item: { difficulty_summary: { difficulties: { B2: number } } }
      ) => {
        const scoreValue =
          typeof item?.difficulty_summary?.difficulties.B2 === "number"
            ? item?.difficulty_summary?.difficulties?.B2
            : 0;
        return total + scoreValue;
      },
      0
    );
    const C2Count = episodes?.reduce(
      (
        total: number,
        item: { difficulty_summary: { difficulties: { C2: number } } }
      ) => {
        const scoreValue =
          typeof item?.difficulty_summary?.difficulties.C2 === "number"
            ? item?.difficulty_summary?.difficulties?.C2
            : 0;
        return total + scoreValue;
      },
      0
    );
    return {
      uniqueWords,
      A1Count,
      B1Count,
      C1Count,
      A2Count,
      B2Count,
      C2Count,
    };
  }

  const redirectWithReplace = useCallback(() => {
    router.replace(`/public/video-info/${data?.id}-${data?.slug}`);
  }, [data?.id, data?.slug]);

  useEffect(() => {
    const firstPartOfSlug =
      data?.slug?.split("-")?.length > 0
        ? data?.slug?.split("-")?.[0]
        : data?.slug;

    if (videoId && videoId?.split("-")?.length < 2 && data?.slug) {
      redirectWithReplace();
    }
    if (
      videoId &&
      videoId?.split("-")?.length > 1 &&
      data?.slug &&
      firstPartOfSlug !== videoId?.split("-")?.[1]
    ) {
      redirectWithReplace();
    }
    if (
      data?.content_type !== "Movie" &&
      data?.content_type !== "Serial" &&
      data?.content_type !== "Animation" &&
      data?.id &&
      data?.slug
    ) {
      router.replace(`/public/audio-info/${data?.id}-${data?.slug}`);
    }
  }, [data?.content_type, data?.id, data?.slug, redirectWithReplace, videoId]);

  useEffect(() => {
    if (targetClick?.type !== "")
      if (!!data?.is_locked) {
        toggleSubscriptionModal();
      } else {
        targetClick.type === "PLAY"
          ? router.push(`/app/show/${data?.id}/${targetClick?.id}`)
          : router.push(`/app/quiz/${data?.id}/${targetClick?.id}`);
      }
  }, [isGuest, data?.is_locked]);

  return (
    <div className="min-h-screen bg-layout flex flex-wrap gap-4 md:flex-nowrap py-3 md:p-4 md:gap-4">
      <>
        <div className="md:hidden mt-4">
          <BackIconComponent
            className="relative z-[99] mb-4 md:hidden mx-[5%] bg-backgroundMain cards-md-box-shadow w-fit rounded-xl p-2"
            clickHandler={() =>
              router.push(
                // @ts-ignore
                `/public/${contentTypeInfos[data?.content_type]?.listRoute}`
              )
            }
          />
        </div>
        <div className="order-1 md:order-2 w-full md:flex-1">
          <div
            className="fixed top-[110px] left-0 right-0 md:relative h-[30vh] md:h-[70vh] md:rounded-xl bg-cover bg-center w-full"
            style={{ backgroundImage: `url(${data?.banner_image})` }}
            onClick={() => handlePlayClick(data?.episodes?.[0]?.id)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-primary p-4 rounded-full cards-lg-box-shadow">
                <PlayArrow className="text-white text-3xl" />
              </button>
            </div>
          </div>
        </div>

        <div className="order-2 md:order-1 relative mt-[calc(19vh)] md:mt-4 w-full md:w-[37%] bg-backgroundMain rounded-t-[32px] md:rounded-2xl px-4 pt-3 md:p-6 cards-lg-box-shadow md:border-2 border-borderMain">
          <div className="relative">
            {data?.is_locked && <NeedSubscriptionMovieBadge />}
            <div className="hidden md:block mb-4">
              <BackIconComponent
                className="mb-4 z-10"
                clickHandler={() =>
                  router.push(
                    `/public/${
                      // @ts-ignore
                      contentTypeInfos[data?.content_type]?.listRoute
                    }`
                  )
                }
              />
            </div>

            <div className="!block md:!hidden w-[10%] mx-auto mb-7 h-1 bg-gray-700 rounded sm:block"></div>
            <VideoInfoBreadcrumbs data={data} />

            <h1 className="text-xl md:text-2xl font-semibold text-main mb-4 mt-6">
              {data?.title}
            </h1>

            {!isGuest && (
              <button
                className={
                  data?.is_locked
                    ? "absolute top-0 left-8"
                    : "absolute top-0 left-4"
                }
                onClick={(e) => {
                  e.stopPropagation();
                  bookmarkMutation.mutate({ movieId: data?.id });
                }}
                disabled={bookmarkMutation.isPending}
              >
                {isBookmarked ? (
                  <Bookmark className="!text-3xl text-primary" />
                ) : (
                  <BookmarkBorder className="!text-3xl text-primary" />
                )}
              </button>
            )}

            <p className="text-gray-400 text-base md:text-lg mb-6 line-clamp-3">
              {data?.description}
            </p>

            <div className="flex items-center justify-evenly w-full mt-6 gap-2 md:gap-[5%]">
              <div className="short-info-card rounded-xl bg-borderMain text-main text-sm w-1/3 h-[88px] flex items-center justify-center flex-col gap-3">
                <LeadingIcon />
                <div className="short-info-title">
                  سطح {languageLevels?.[data?.difficulty || 1]?.standart_level}
                </div>
              </div>
              {whoAmI?.userpreference?.preferred_language === 2 && (
                <div className="short-info-card rounded-xl bg-borderMain text-main text-sm w-1/3 h-[88px] flex items-center justify-center flex-col gap-3">
                  <AnouncementIcon />
                  <div className="short-info-title">
                    {data?.language === 1 ? "بریتیش" : "آمریکایی"}
                  </div>
                </div>
              )}
              <div className="short-info-card rounded-xl bg-borderMain text-main text-sm w-1/3 h-[88px] flex items-center justify-center flex-col gap-3">
                <AnouncementIcon />
                <div className="short-info-title">
                  {sumScores(data?.episodes)?.uniqueWords?.toLocaleString() ??
                    0}{" "}
                  لغت
                </div>
              </div>
            </div>

            {data?.episodes?.length > 0 && (
              <>
                <SectionTitle className="!mt-5 text-lg lg:text-xl font-medium text-primary text-center">
                  قسمت‌ها {`(${data?.episodes?.length})`}
                </SectionTitle>
                <h3 className="mb-2 text-[16px] lg:text-lg  text-main text-center">
                  برای یادگیری بهتر، اول یک قسمت رو تماشا کن بعد کوئیز همون قسمت
                  رو انجام بده.
                </h3>
              </>
            )}

            {/* Episodes list */}
            <div className="space-y-4">
              {data?.episodes?.map((item: any, index: number) => (
                <div
                  key={item.id}
                  className="bg-backgroundMain text-main rounded-lg flex items-center py-2 px-[3%] shadow-md shadow-gray-500 mb-2 lg:mb-0"
                >
                  <Image
                    src={data.image}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                    width={36}
                    height={36}
                    alt={data?.title}
                  />
                  <span className="text-sm mx-3 truncate flex-1">
                    {item.name || `قسمت ${index + 1}`}
                  </span>
                  <OutlineButton
                    className="md:w-20"
                    onClick={() => handleQuizClick(item.id)}
                  >
                    کوئیز
                  </OutlineButton>
                  <PrimaryButton
                    onClick={() => handlePlayClick(item.id)}
                    className="mr-2 md:w-20"
                  >
                    پخش
                  </PrimaryButton>
                </div>
              ))}
            </div>

            {whoAmI?.userpreference?.preferred_language === 2 &&
              data?.episodes?.length > 0 && (
                <>
                  <SectionTitle className="!mt-8 !mb-4 text-lg lg:text-xl font-medium text-center text-main">
                    تعداد لغات براساس سطح
                  </SectionTitle>
                  <div className="w-[100%] lg:w-[60%] mx-auto">
                    <PieChart
                      data={[
                        {
                          title: "A1",
                          value: sumScores(data?.episodes)?.A1Count ?? 0,
                          color: "#fafad2",
                        },
                        {
                          title: "A2",
                          value: sumScores(data?.episodes)?.A2Count ?? 0,
                          color: "#fee89e",
                        },
                        {
                          title: "B1",
                          value: sumScores(data?.episodes)?.B1Count ?? 0,
                          color: "#f8d870",
                        },
                        {
                          title: "B2",
                          value: sumScores(data?.episodes)?.B2Count ?? 0,
                          color: "#ffe135",
                        },
                        {
                          title: "C1",
                          value: sumScores(data?.episodes)?.C1Count ?? 0,
                          color: "#ffcc00",
                        },
                        {
                          title: "C2",
                          value: sumScores(data?.episodes)?.C2Count ?? 0,
                          color: "#ffa800",
                        },
                      ]}
                      animate
                      radius={40}
                      lengthAngle={-360}
                      label={({ dataEntry }) => dataEntry.title}
                      labelStyle={{
                        fontSize: "7px",
                        fontFamily: "sans-serif",
                      }}
                      labelPosition={85}
                    />
                  </div>
                  <div
                    className="w-fit mx-auto grid grid-cols-3 gap-5 place-items-center"
                    dir="ltr"
                  >
                    <PieChartInfos
                      color="bg-[#fafad2]"
                      title="A1"
                      count={sumScores(data?.episodes)?.A1Count}
                    />
                    <PieChartInfos
                      color="bg-[#fee89e]"
                      title="A2"
                      count={sumScores(data?.episodes)?.A2Count}
                    />
                    <PieChartInfos
                      color="bg-[#f8d870]"
                      title="B1"
                      count={sumScores(data?.episodes)?.B1Count}
                    />
                    <PieChartInfos
                      color="bg-[#ffe135]"
                      title="B2"
                      count={sumScores(data?.episodes)?.B2Count}
                    />
                    <PieChartInfos
                      color="bg-[#ffcc00]"
                      title="C1"
                      count={sumScores(data?.episodes)?.C1Count}
                    />
                    <PieChartInfos
                      color="bg-[#ffa800]"
                      title="C2"
                      count={sumScores(data?.episodes)?.C2Count}
                    />
                  </div>
                </>
              )}
          </div>
        </div>

        {openSubsModal && (
          <SubscriptionModal
            open={openSubsModal}
            toggleModal={toggleSubscriptionModal}
            firstText={isGuest ? "ورود به حساب" : ""}
            title={isGuest ? `ورود به حساب و خرید اشتراک` : ""}
            description={
              isGuest
                ? `برای مشاهده محتوای این بخش میبایست ورود/ثبت نام کنید ، سپس اشتراک تهیه کنید.`
                : ""
            }
            alsoText={`*همچنین میتوانید پس از ورود به حساب ، از محتوا‌های رایگان و بدون نیاز به تهیه اشتراک استفاده کنید!*`}
            submitHandler={
              isGuest
                ? () => {
                    toggleLoginModal();
                    toggleSubscriptionModal();
                  }
                : null
            }
          />
        )}
        {isOpen && (
          <LoginModal
            open={isOpen}
            onClose={toggleLoginModal}
            inModalCallback={
              isGuest
                ? () => {
                    toast.success("ورود به حساب با موفقیت انجام شد");
                    router.refresh();
                    toggleLoginModal();
                  }
                : () => {}
            }
          />
        )}
      </>
    </div>
  );
};

export default VideoInformationView;
