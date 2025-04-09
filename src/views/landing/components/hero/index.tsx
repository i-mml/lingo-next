import React from "react";
import SmallOrangeLine from "../SmallOrangeLine";
import PrimaryButton from "@/components/shared/PrimaryButton";

const HomeHero = () => {
  return (
    <div className="flex justify-between max-w-[1367px] px-[32px] pb-[100px] mx-auto">
      <section className="max-w-[600px] pr-[20px]">
        <h1 className="text-[46px] text-[rgba(26,21,26,0.8)] font-extrabold m-0">
          Learn a New Language With Great TV
        </h1>
        <SmallOrangeLine align="left" />
        <main>
          <p className="max-w-[370px] mb-[45px] text-[18px] leading-[26px] font-normal">
            Discover a brand new way to get to language fluency with Lingopie.
          </p>
          <PrimaryButton>Start or Free</PrimaryButton>
        </main>
      </section>
      <div className="max-w-[640px] relative">
        <img
          className="w-full h-[73px]"
          src="https://d1jqu391rhi90k.cloudfront.net/img/home-page/top-of-browser.png"
          alt="top-of-browser"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ position: "unset" }}
          className="w-full"
        >
          <source
            src="https://d1jqu391rhi90k.cloudfront.net/img/clips/HomeVideo.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <img
          className="absolute left-[-177px] bottom-[-60px] z-[-1] w-[285px] h-[285px]"
          src="https://d1jqu391rhi90k.cloudfront.net/img/home-page/circle.png"
          alt="circle"
        />
      </div>
    </div>
  );
};

export default HomeHero;
