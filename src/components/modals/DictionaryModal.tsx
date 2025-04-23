"use client";

import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { toast } from "react-toastify";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectCoverflow, Keyboard, Navigation } from "swiper/modules";
import useThemeCreator from "@/hooks/use-theme";
import { getCmsSearch, PostFlashcards } from "@/api/services/cms";
import { useMutation } from "@tanstack/react-query";
import CustomModal from "../shared/CustomModal";
import WaveLoading from "../shared/WaveLoading";
import PrimaryButton from "../shared/PrimaryButton";
import OutlineButton from "../shared/OutlineButton";
import SearchMovieItem from "../shared/SearchMovieItem";

interface Props {
  open: boolean;
  toggleModal: () => void;
  searchedText: string;
  flashCardBody: {
    word: string;
    word_translation: string;
    word_rel_id: number;
  };
}

const breakPoints = {
  760: {
    slidesPerView: 2.2,
  },

  0: {
    slidesPerView: 1.3,
  },
};

const DictionaryModal = (props: Props) => {
  const { open, toggleModal, searchedText, flashCardBody } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const { theme }: any = useThemeCreator();

  const cmsSearchMutation = useMutation({
    mutationFn: (text: string) => getCmsSearch(text),
    mutationKey: ["search-in-dictionary-modal", searchedText],
  });

  const postFlashcardsMutation = useMutation({
    mutationFn: PostFlashcards,
    onSuccess: () => {
      toast.success("فلش کارت با موفقیت افزوده شد");
    },
    onError: () => {
      toast.error("خطا در افزودن فلش کارت");
    },
  });

  const handlePostFlashcards = async () => {
    const currentIndexMovie =
      cmsSearchMutation?.data?.data?.data?.[activeIndex];
    await postFlashcardsMutation.mutateAsync({
      ...flashCardBody,
      episode: currentIndexMovie?.episode_id,
      movie: currentIndexMovie?.movie_id,
      text: currentIndexMovie?.sentence,
      grammatical_json: JSON.stringify(currentIndexMovie?.json),
      translation: currentIndexMovie?.translate,
      time_start: currentIndexMovie?.start_time,
      time_end: currentIndexMovie?.end_time,
      base_movie_file: currentIndexMovie?.file,
    });
  };

  useEffect(() => {
    if (!!searchedText) {
      cmsSearchMutation.mutate(searchedText);
    }
  }, [searchedText]);

  return (
    <CustomModal open={open} toggle={toggleModal}>
      <div className="py-10 md:py-5 md:min-w-[50%] min-h-[80vh]">
        {cmsSearchMutation?.isPending ? (
          <WaveLoading />
        ) : cmsSearchMutation?.data?.data?.data?.length > 0 ? (
          <>
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
                      searchWord={searchedText}
                    />
                  </SwiperSlide>
                )
              )}
            </Swiper>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <button className="custom-swiper-button-prev disabled:grayscale">
                <PrimaryButton onClick={() => {}} className="w-40 md:w-80">
                  قبلی
                </PrimaryButton>
              </button>
              <div className="custom-swiper-button-next">
                <PrimaryButton onClick={() => {}} className="w-40 md:w-80">
                  بعدی
                </PrimaryButton>
              </div>
            </div>
            <OutlineButton
              onClick={handlePostFlashcards}
              buttonProps={{
                disabled: postFlashcardsMutation.isPending,
              }}
              className="!py-0 block w-full md:w-[320px] mx-auto mt-4"
            >
              {postFlashcardsMutation.isPending ? (
                <WaveLoading />
              ) : (
                <div className="flex justify-center items-center gap-1 lg:gap-2 ">
                  <span className="text-main">افزودن به فلش کارت</span>
                  <LibraryAddIcon className="text-main" />
                </div>
              )}
            </OutlineButton>
          </>
        ) : (
          !!searchedText &&
          cmsSearchMutation?.data?.data?.data?.length === 0 && (
            <div className="text-gray400 text-lg lg:text-xl">
              موردی با این عبارت یافت نشد!
            </div>
          )
        )}
      </div>
    </CustomModal>
  );
};

export default DictionaryModal;
