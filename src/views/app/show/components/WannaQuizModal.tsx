"use client";

import CustomModal from "@/components/shared/CustomModal";
import OutlineButton from "@/components/shared/OutlineButton";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { contentTypeInfos } from "@/constants/content-types-infos";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

interface IProps {
  open: boolean;
  toggleModal: () => void;
  movieData: any;
  episodeData: any;
  modalType: "BEFORE_LEAVE" | "WANNA_QUIZ";
}

const WannaQuizModal = (props: IProps) => {
  const { open, toggleModal, movieData, episodeData, modalType } = props;

  const router = useRouter();
  const contentIndex = useMemo(
    () =>
      movieData?.episodes?.findIndex((obj: any) => obj.id === episodeData?.id),
    [movieData, episodeData?.id]
  );

  const userToken = getCookie("zabano-access-token");
  const preSubRoute = !userToken || userToken === "" ? "public" : "app";

  return (
    <CustomModal open={open} toggle={toggleModal}>
      <div className="min-w-[90vmin] w-full lg:w-[100%] pt-4 pb-10 relative">
        {modalType === "WANNA_QUIZ" ? (
          <p className="text-primary text-[19px] lg:text-2xl text-center font-bold">
            آفرین، تونستی این قسمت رو تا آخر تماشا کنی
          </p>
        ) : (
          <p className="text-primary text-xl lg:text-2xl text-center font-bold">
            قبل از اینکه خارج بشی!
          </p>
        )}
        <div className="text-lg lg:text-xl text-main my-6">
          {modalType === "WANNA_QUIZ"
            ? "پایه ای تا یک کوئیز باهم انجام بدیم که متوجه بشی چقدر از این قسمت یادگیری داشتی؟"
            : "پایه ای یک کوئیز انجام بدیم تا متوجه بشی تا اینجا چقدر از این قسمت یادگیری داشتی؟"}
        </div>

        <div className="flex items-center gap-3 justify-center mt-8">
          <Link
            href={`/public/${
              contentTypeInfos?.[
                movieData?.content_type as keyof typeof contentTypeInfos
              ]?.route
            }/${movieData?.id}-${movieData?.slug}`}
          >
            <button className="h-12 w-20 text-primary text-sm lg:text-[16px] font-medium">
              خارج میشم
            </button>
          </Link>
          {"episodes" in movieData &&
            contentIndex !== movieData?.episodes?.length - 1 && (
              <OutlineButton
                className="w-32 lg:w-40"
                onClick={() => {
                  // @ts-ignore
                  navigate(
                    `/${preSubRoute}/show/${movieData?.id}/${
                      movieData?.episodes?.[contentIndex + 1]?.id
                    }`
                  );
                  toggleModal();
                }}
              >
                برو قسمت بعد
              </OutlineButton>
            )}
          <PrimaryButton
            className="w-32 lg:w-44"
            onClick={() => {
              router.push(
                `/${preSubRoute}/quiz/${movieData?.id}/${episodeData?.id}`
              );
            }}
          >
            آره پایه ام.
          </PrimaryButton>
        </div>
      </div>
    </CustomModal>
  );
};

export default WannaQuizModal;
