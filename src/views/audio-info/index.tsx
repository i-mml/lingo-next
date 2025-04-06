"use client";

import BackIconComponent from "@/components/shared/BackIconComponent";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import Audio from "@mui/icons-material/Audiotrack";
import Bookmark from "@mui/icons-material/Bookmark";
import BookmarkBorder from "@mui/icons-material/BookmarkBorder";
import Quiz from "@mui/icons-material/Quiz";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { PostAuthBookmarks } from "@/api/services/auth";
import OutlineButton from "@/components/shared/OutlineButton";
import PrimaryButton from "@/components/shared/PrimaryButton";

import ClockIcon from "@/assets/clock.svg";
import SectionTitle from "@/components/shared/SectionTitle";
import LoginModal from "@/components/modals/LoginModal";
import SubscriptionModal from "@/components/modals/SubscriptionModal";
import { contentTypeInfos } from "@/constants/content-types-infos";
import { useLoginModal } from "@/store/use-login-modal";
import { toast } from "react-toastify";
import AudioInfoBreadcrumbs from "./components/AudioInfoBreadcrumbs";

const AudioInfoView = ({ audioId, data }: { audioId: string; data: any }) => {
  const { whoAmI, isGuest } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isBookmarked, setIsBookmarked] = useState(data?.is_bookmarked);
  const [showMore, setShowMore] = useState(false);
  const [openSubsModal, setOpenSubsModal] = useState(false);
  const [targetClick, setTargetClick] = useState<{
    type: "QUIZ" | "PLAY" | "";
    id: number | null;
  }>({
    type: "",
    id: null,
  });

  const { isOpen, toggleLoginModal } = useLoginModal();

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const toggleSubscriptionModal = () => {
    setOpenSubsModal((prev) => !prev);
  };

  const bookmarkMutation = useMutation({
    mutationFn: async ({ movieId }: { movieId: number }) => {
      await PostAuthBookmarks(movieId);
    },
    onSuccess: () => {
      setIsBookmarked((prev: boolean) => !prev);
    },
  });

  // Navigation handlers
  const handlePlayClick = (episodeId: string) => {
    setTargetClick({ type: "PLAY", id: Number(episodeId) });
    if (data?.is_locked) {
      setOpenSubsModal(true);
      return;
    }
    if (isGuest) {
      toggleLoginModal();
      return;
    }
    router.push(`/app/show/${data?.id}/${episodeId}`);
  };

  const handleQuizClick = (episodeId: string) => {
    setTargetClick({ type: "QUIZ", id: +episodeId });
    if (data?.is_locked) {
      setOpenSubsModal(true);
      return;
    }
    if (isGuest) {
      toggleLoginModal();
      return;
    }
    router.push(`/app/quiz/${data?.id}/${episodeId}`);
  };
  const redirectWithReplace = useCallback(() => {
    router.replace(`/public/video-info/${data?.id}-${data?.slug}`);
  }, [data?.id, data?.slug]);

  useEffect(() => {
    const firstPartOfSlug =
      data?.slug?.split("-")?.length > 0
        ? data?.slug?.split("-")?.[0]
        : data?.slug;

    if (audioId && audioId?.split("-")?.length < 2 && data?.slug) {
      redirectWithReplace();
    }
    if (
      audioId &&
      audioId?.split("-")?.length > 1 &&
      data?.slug &&
      firstPartOfSlug !== audioId?.split("-")?.[1]
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
  }, [data?.content_type, data?.id, data?.slug, redirectWithReplace, audioId]);

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
    <section className="px-[5%] pb-4 md:py-9" dir="rtl">
      <BackIconComponent
        className="hidden mb-8 md:flex"
        clickHandler={() => router.back()}
      />
      <AudioInfoBreadcrumbs data={data} />

      <div className="flex flex-col items-start gap-6 md:flex-row">
        {/* Image Section */}
        <div className="w-full rounded-xl md:w-[29.2%] mx-auto md:mx-0">
          <Image
            alt={data?.title}
            src={data?.image}
            className="w-[65%] md:w-full mx-auto md:mx-0 rounded-xl"
            width={273}
            height={273}
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 w-full relative">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-main md:text-3xl">
              {data?.title}
            </h2>
            {!isGuest && (
              <button
                className="absolute top-0 left-4"
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
          </div>

          <p className="mt-2 text-gray400 md:text-lg">{data?.content_owner}</p>

          <div className="mt-6">
            <p
              className={`text-main text-lg ${showMore ? "" : "line-clamp-4"}`}
            >
              {data?.description}
            </p>
            {!showMore && data?.description?.length > 200 && (
              <button
                onClick={toggleShowMore}
                className="w-full mt-2 text-sm text-gray400 md:text-base"
              >
                مشاهده بیشتر
              </button>
            )}
          </div>

          {/* Info Cards */}
          <div className="flex gap-2 md:gap-6 justify-between md:justify-normal py-4 mt-6 border-t border-b border-borderMain">
            <div className="flex items-center gap-2">
              <Audio className="w-6 h-6 text-gray300" />
              <span className="text-main">صوت و متن</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-6 h-6 text-gray300" />
              <span className="text-main">
                {Math.ceil((data?.duration || 0) / 60)} دقیقه
              </span>
            </div>
            {data?.episodes?.length > 1 && (
              <div className="flex items-center gap-2">
                <SlideshowIcon className="w-6 h-6 text-gray300" />
                <span className="text-main">{data.episodes.length} قسمت</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      {data?.episodes?.length > 0 && (
        <div className="mt-8">
          <SectionTitle className="text-lg font-medium text-primary md:text-xl text-center">
            قسمت‌ها
          </SectionTitle>
          <p className="mb-4 text-center text-main md:text-lg">
            برای یادگیری بهتر، اول یک قسمت رو تماشا کن بعد کوئیز همون قسمت رو
            انجام بده.
          </p>

          <div className="grid gap-3 md:grid-cols-2">
            {data.episodes.map((item: any, index: number) => (
              <div
                key={item.id}
                className="bg-backgroundMain text-main rounded-lg flex flex-col items-center py-2 px-[3%] shadow-md shadow-gray-500 mb-2 md:mb-0"
              >
                <div className="flex items-center w-full gap-3">
                  <Image
                    width={36}
                    height={36}
                    alt={item?.name}
                    src={data.image}
                    className="w-12 h-12 rounded-full md:w-16 md:h-16"
                  />
                  <span className="flex-1 truncate text-main">
                    {item.name || `قسمت ${index + 1}`}
                  </span>
                </div>

                <div className="flex justify-end gap-3 mt-3 mr-auto">
                  <OutlineButton
                    className="flex items-center justify-center gap-2 !text-main w-20"
                    onClick={() => handleQuizClick(item.id)}
                  >
                    <Quiz className="text-main" /> کوئیز
                  </OutlineButton>
                  <PrimaryButton
                    onClick={() => handlePlayClick(item.id)}
                    className="flex items-center gap-2"
                  >
                    <PlayArrowIcon className="w-6 h-6" />
                    پخش
                  </PrimaryButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
                  toggleLoginModal();
                }
              : () => {}
          }
        />
      )}
    </section>
  );
};

export default AudioInfoView;
