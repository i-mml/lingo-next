"use client";

import { getCmsSearch } from "@/api/services/cms";
import useThemeCreator from "@/hooks/use-theme";
import { CloseRounded } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { useMutation } from "@tanstack/react-query";
import Lottie from "lottie-react";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SearchLottie from "@/assets/lotties/search_lineal.json";
import InputWithIcon from "@/components/shared/InputWithIcon";
import PrimaryButton from "@/components/shared/PrimaryButton";
import WaveLoading from "@/components/shared/WaveLoading";
import { EffectCoverflow, Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SearchMovieItem from "@/components/shared/SearchMovieItem";
import { mockWords } from "@/mock/victionary";
import OutlineButton from "@/components/shared/OutlineButton";

const breakPoints = {
  760: {
    slidesPerView: 2.2,
  },

  0: {
    slidesPerView: 1.5,
  },
};

const VictionaryView = () => {
  const { theme }: any = useThemeCreator();
  const { t: translate } = useTranslation();
  const formRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState<any>(null);
  const [searchedVal, setSerachedVal] = useState(null);

  // const debouncedSearchValue = useDebounce(search, 750);

  const cmsSearchMutation = useMutation({
    mutationFn: () => getCmsSearch(search),
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setActiveIndex(0);
    cmsSearchMutation.reset();
    await cmsSearchMutation.mutateAsync();
    setSerachedVal(search);
  };

  const resetDicionary = async () => {
    await cmsSearchMutation.reset();
    setSerachedVal(null);
    setSearch("");
    setActiveIndex(0);
  };

  return (
    <div
      className={`flex flex-col items-center min-h-[80vh] md:min-h-[60vh] pt-[5vh] justify-start gap-6`}
    >
      <div className="w-full flex flex-col justify-center items-center gap-5">
        {!cmsSearchMutation?.data?.data?.data && (
          <Lottie
            animationData={SearchLottie}
            className="w-16 h-16 lg:w-24 lg:h-24"
          />
        )}
        <div className="text-main font-bold text-[16px] lg:text-2xl">
          {translate("pages.victionary.Victionary Title")}
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full relative grid place-items-center">
            <InputWithIcon
              icon={
                <SearchIcon
                  sx={{
                    color: theme?.palette?.text?.gray400,
                  }}
                />
              }
              className="w-[91.2%] md:w-[80%]"
              inputProps={{
                value: search || "",
                onChange: (e) => setSearch(e.target.value),
                placeholder: translate("pages.victionary.Search Placeholder"),
                type: "text",
              }}
            />
            <PrimaryButton
              buttonProps={{ type: "submit", ref: formRef }}
              className="absolute left-[4.49%] lg:left-[10%] z-[20] lg:w-24"
            >
              {translate("pages.catalog.Search")}
            </PrimaryButton>
          </div>
        </form>
      </div>

      {cmsSearchMutation?.isPending ? (
        <WaveLoading />
      ) : cmsSearchMutation?.data?.data?.data?.length > 0 ? (
        <>
          <div className="text-main text-lg lg:text-xl font-bold" dir="ltr">
            {searchedVal || ""}{" "}
            <CloseRounded
              style={{ color: theme?.palette?.text?.gray300 }}
              className="!w-7 !h-7"
              onClick={resetDicionary}
            />
          </div>
          <Swiper
            onSlideChange={(e) => {
              setActiveIndex(e.realIndex);
            }}
            effect={"coverflow"}
            grabCursor
            centeredSlides
            loop
            breakpoints={breakPoints}
            lazyPreloadPrevNext={2}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[EffectCoverflow, Keyboard, Navigation]}
            className="w-[100%] lg:w-[90%]"
            navigation={{
              nextEl: ".custom-swiper-button-next",
              prevEl: ".custom-swiper-button-prev",
            }}
            keyboard
          >
            {cmsSearchMutation?.data?.data?.data?.map(
              (item: any, index: number) => (
                <SwiperSlide key={index} className={`w-[100%]`}>
                  <SearchMovieItem
                    item={item}
                    index={index}
                    activeIndex={activeIndex}
                    searchWord={search}
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
          <div className="grid grid-cols-2 gap-3">
            <div className="custom-swiper-button-prev disabled:grayscale">
              <PrimaryButton className="w-40 md:w-80">قبلی</PrimaryButton>
            </div>
            <div className="custom-swiper-button-next">
              <PrimaryButton className="w-40 md:w-80">بعدی</PrimaryButton>
            </div>
          </div>
        </>
      ) : (
        search !== null &&
        cmsSearchMutation?.data?.data?.data?.length === 0 && (
          <div className="text-gray400 text-lg lg:text-xl">
            موردی با این عبارت یافت نشد!
          </div>
        )
      )}

      {(!cmsSearchMutation?.data?.data?.data ||
        cmsSearchMutation?.data?.data?.data?.length === 0) && (
        <>
          <div className="text-gray400 font-bold text-lg lg:text-xl text-right mt-5">
            پیشنهاداتی برای شما
          </div>
          <div className="flex flex-wrap gap-2 lg:gap-4 w-[91.2%] md:w-[60%] mx-auto justify-center">
            {mockWords?.map((item, index) => (
              <OutlineButton
                onClick={() => {
                  setSearch(() => item);
                  setTimeout(() => {
                    // @ts-ignore
                    formRef.current.click();
                  }, 200);
                }}
                key={index}
                className="!border-b-[3px] font-medium !text-[16px] lg:!text-xl p-2"
              >
                {item || ""}
              </OutlineButton>
            ))}
          </div>
        </>
      )}
      <div></div>
    </div>
  );
};

export default VictionaryView;
