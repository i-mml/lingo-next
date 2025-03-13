"use client";

import EmptyFlashcards from "@/components/shared/EmptyFlashcards";
import NeedSubscriptionMovieBadge from "@/components/shared/NeedSubscriptionMovieBadge";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetAuthBookmarks, PostAuthBookmarks } from "@/api/services/auth";
import { toast } from "react-toastify";
import WaveLoading from "@/components/shared/WaveLoading";
import Lottie from "lottie-react";
import BookmarksLottie from "@/assets/lotties/bookmarks.json";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";
import { contentTypeInfos } from "@/constants/content-types-infos";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import useThemeCreator from "@/hooks/use-theme";

const BookmarksView = () => {
  const { theme } = useThemeCreator();
  const { isGuest, whoAmI } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-bookmarks-list"],
    queryFn: GetAuthBookmarks,
    enabled: !isGuest,
    staleTime: 0,
  });

  const bookmarkMutation = useMutation({
    mutationFn: async ({ movie }: { movie: any }) => {
      await PostAuthBookmarks(movie?.id);
    },
    onSuccess: (_data, vairables) => {
      toast.success(`${vairables?.movie?.title} از علاقه‌مندی‌ها حذف شد.`);
      refetch();
    },
  });

  if (isLoading) {
    return <WaveLoading />;
  }

  return (
    <div className=" px-[5%] py-5">
      {data?.data?.results?.length > 0 && (
        <div className="flex items-center gap-4 !justify-start mb-5">
          <Lottie
            animationData={BookmarksLottie}
            className="w-16 h-16 lg:w-20 lg:h-20"
          />
          <h1 className="text-lg lg:text-3xl font-bold text-main">
            نشان‌شده‌ها
          </h1>
        </div>
      )}
      <div className="flex items-center flex-wrap gap-4">
        {data?.data?.results?.length > 0 ? (
          data?.data?.results?.map((item: any) => (
            <div key={item?.id} className="relative w-fit">
              <Link
                href={`/public/${
                  // @ts-ignore
                  contentTypeInfos?.[item?.content_type]?.route
                }/${item?.id}-${item?.slug}`}
                key={item?.id}
              >
                <Image
                  width={
                    isGuest || whoAmI?.userpreference?.preferred_language === 2
                      ? 212
                      : 262
                  }
                  height={
                    isGuest || whoAmI?.userpreference?.preferred_language === 2
                      ? 318
                      : 147
                  }
                  className={clsx(
                    "rounded-lg object-cover",
                    isGuest || whoAmI?.userpreference?.preferred_language === 2
                      ? "w-[156px] h-[230px] md:w-[212px] md:h-[318px]"
                      : "w-[262px] h-[147px] md:w-[274px] md:h-[155px]"
                  )}
                  src={item.image}
                  alt={item.slug}
                />
              </Link>
              <div
                className={clsx(
                  "absolute bottom-0 px-2 py-2 right-0 left-0 bg-[black]/60 rounded-b-lg flex items-center justify-between z-50"
                )}
              >
                <Link
                  href={`/public/${
                    // @ts-ignore
                    contentTypeInfos?.[item?.content_type]?.route
                  }/${item?.id}-${item?.slug}`}
                  key={item?.id}
                  className="flex-1"
                >
                  <div className="line-clamp-1 text-white">
                    {item?.title || ""}
                  </div>
                </Link>
                {!isGuest && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      bookmarkMutation.mutateAsync({ movie: item });
                    }}
                    className="cursor-pointer"
                  >
                    <BookmarkIcon
                      className="shadow-lg"
                      style={{
                        fontSize: 32,
                        color: theme.palette.text?.primary,
                      }}
                    />
                  </div>
                )}
              </div>
              {item?.is_locked && <NeedSubscriptionMovieBadge />}
            </div>
          ))
        ) : (
          <EmptyFlashcards
            hasDesc={false}
            customTitle="هنوز محتوایی نشان نشده است ..!"
          />
        )}
      </div>
    </div>
  );
};

export default BookmarksView;
