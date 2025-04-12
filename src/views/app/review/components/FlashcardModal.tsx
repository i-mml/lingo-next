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
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

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
      className="[&_.MuiDialog-scrollPaper]:backdrop-blur-xl [&_.MuiDialog-paper]:bg-transparent [&_.MuiDialog-paper]:!w-full [&_.MuiDialog-paper]:mx-2 [&_.MuiDialog-paper]:md:!max-w-[80%] shadow-none overflow-hidden"
      PaperProps={{
        className: " bg-transparent rounded-lg overflow-hidden shadow-none",
      }}
    >
      <div className="w-full bg-transparent ">
        <div className="flex items-center justify-center gap-4 flex-row-reverse overflow-y-hidden">
          <Button
            className="min-w-0 p-1 bg-backgroundMain !hidden md:!grid place-items-center"
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
              className="h-[65%] w-full max-w-[360px] md:max-w-[472px] overflow-hidden"
              centeredSlides
              ref={swiperRef}
            >
              {data?.map((item: any, index: number) => (
                <SwiperSlide key={item.id} className="w-full">
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

            <div className="flex items-center gap-3 w-full max-w-[320px] mx-auto bg-backgroundMain py-2">
              <div className="text-gray-200 font-semibold text-base">
                {`${activeIndex}/${data?.length}`}
              </div>
              <div className="flex-1 bg-gray-800 h-2 rounded-full">
                <div
                  className="bg-amber-600 h-2 rounded-full transition-all"
                  style={{ width: `${(activeIndex / data?.length) * 100}%` }}
                />
              </div>
              <div className="flex md:hidden items-center gap-1.5 text-main">
                <SuccessCheckedIcon />
                <span>{getNonRepetitiveItems(learnedIds)?.length}</span>
              </div>
            </div>
          </div>

          <Button
            className="min-w-0 p-1 bg-backgroundMain rotate-180 !hidden md:!grid place-items-center"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
          >
            <LeftArrowIcon className="text-main" />
          </Button>
        </div>

        <div
          className="absolute top-[-9%] md:top-[-20px] lg:top-0 w-[90%] pb-2.5 right-[5%] flex items-center justify-between"
          dir="rtl"
        >
          <BackIconComponent
            className="bg-backgroundMain py-2 px-3.5 rounded-lg"
            clickHandler={toggle}
          />
          <div className="bg-backgroundMain flex items-center gap-1.5 text-main border border-gray-300 rounded-lg px-3 py-2">
            <SuccessCheckedIcon />
            <span>{getNonRepetitiveItems(learnedIds)?.length}</span>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default FlashCardModal;
