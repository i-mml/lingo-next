import Slide from "@mui/material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Dialog } from "@mui/material";
import LeftArrowIcon from "@/assets/slider-arrow-left.svg";
import SuccessCheckedIcon from "@/assets/success-checked.svg";
import { getNonRepetitiveItems } from "@/utils/get-non-repetitive";
import FlashCardModalItem from "./FlashCardModalItem";
import BackIconComponent from "@/components/shared/BackIconComponent";

interface IProps {
  open: boolean;
  toggle: () => void;
  data: any;
  swiperRef: any;
}

const FlashCardModal = ({ open, toggle, data, swiperRef }: IProps) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [learnedIds, setLearnedIds] = useState<number[]>([]);

  return (
    <Dialog
      open={open}
      keepMounted
      className="[&_.MuiDialog-scrollPaper]:backdrop-blur-xl"
      PaperProps={{
        className:
          "max-w-[80%] bg-transparent rounded-lg overflow-visible sm:max-w-full sm:top-[3%]",
      }}
    >
      <div className="w-full">
        <div className="flex items-center gap-4 flex-row-reverse sm:hidden">
          <Button
            className="min-w-0 p-1 bg-backgroundMain"
            onClick={() => swiperRef.current?.swiper.slideNext()}
          >
            <LeftArrowIcon className="text-main" />
          </Button>

          <div className="flex flex-col gap-6 sm:gap-3">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              onSlideChange={(e: any) => setActiveIndex(e?.activeIndex + 1)}
              className="mySwiper h-[65%] w-full max-w-[472px] perspective-[850px] sm:max-w-full sm:perspective-100"
              ref={swiperRef}
            >
              {data?.map((item: any, index: number) => (
                <SwiperSlide key={item.id}>
                  <FlashCardModalItem
                    item={item}
                    activeIndex={activeIndex}
                    setLearnedIds={setLearnedIds}
                    handleNext={() => swiperRef.current?.swiper.slideNext()}
                    index={index}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex items-center gap-3 dir-ltr sm:w-[91.1%] sm:mx-auto">
              <div className="text-gray-200 font-semibold text-base">
                {`${activeIndex}/${data?.length}`}
              </div>
              <div className="flex-1 bg-gray-800 h-2 rounded-full">
                <div
                  className="bg-amber-600 h-2 rounded-full transition-all"
                  style={{ width: `${(activeIndex / data?.length) * 100}%` }}
                />
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-main">
                <SuccessCheckedIcon />
                <span>{getNonRepetitiveItems(learnedIds)?.length}</span>
              </div>
            </div>
          </div>

          <Button
            className="min-w-0 p-1 bg-backgroundMain rotate-180"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
          >
            <LeftArrowIcon className="text-main" />
          </Button>
        </div>

        <div className="absolute top-0 right-[-40%] flex items-center justify-between w-[90%] lg:right-[-40%] md:right-[-8%] md:top-[-10%] sm:right-[5%] sm:top-[-9%]">
          <BackIconComponent
            className="bg-backgroundMain py-2 px-3.5 rounded-lg"
            clickHandler={toggle}
          />
          <div className="sm:hidden flex items-center gap-1.5 text-main border border-gray-300 rounded-lg px-3 py-2">
            <SuccessCheckedIcon />
            <span>{getNonRepetitiveItems(learnedIds)?.length}</span>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default FlashCardModal;
