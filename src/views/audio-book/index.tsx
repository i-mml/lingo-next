"use client";

import React, { FC } from "react";
import { AudioBookProps } from "./types";
import Lottie from "lottie-react";
import MicrophoneLottie from "@/assets/lotties/microphone_lineal.json";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import dynamic from "next/dynamic";

const AudioBookRowSliders = dynamic(
  () => import("./components/AudioBookRowSliders"),
  { ssr: false, loading: () => <p>Loading...</p> }
);

const AudioBookView: FC<AudioBookProps> = (props) => {
  const { audioBooks, contentType } = props;

  return (
    <div>
      <div className="flex items-center gap-4 py-6 px-[3%] md:pt-10 md:px-[5%] mb-8">
        <Lottie
          animationData={MicrophoneLottie}
          className="w-16 h-16 lg:w-20 lg:h-20"
        />
        <h1 className="text-lg lg:text-3xl font-bold text-main">
          {contentType === 2
            ? "موسیقی ها"
            : contentType === 3
            ? "کتاب های صوتی"
            : "پادکست ها"}
        </h1>
      </div>

      <AudioBookRowSliders audioBooks={audioBooks} />
    </div>
  );
};

export default AudioBookView;
