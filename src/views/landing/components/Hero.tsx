"use client";

import { Globe } from "lucide-react";
import React from "react";
import { AnimatedHeroDecor } from "./AnimatedHeroDecor";
import { AnimatedTitle } from "./AnimatedTitle";

import BulbSVG from "@/assets/bulb.svg";
import LangSVG from "@/assets/lang.svg";
import RewardSVG from "@/assets/reward.svg";
import VoiceSVG from "@/assets/voice.svg";

export function Hero() {
  return (
    <section className="relative flex items-center justify-center px-4 pb-8 py-32 lg:py-32 mb-3 lg:mb-10">
      <AnimatedTitle>
        <h1
          className="flex w-full flex-col items-center justify-center gap-2 text-balance py-6 text-center font-display text-2xl lg:text-3xl font-bold capitalize leading-normal tracking-tighter sm:text-4xl sm:leading-snug md:gap-4 md:text-6xl"
          dir="rtl"
        >
          <span className="flex items-center gap-1">
            به هر
            <span className="rounded-full border border-[#ffa80098] bg-[#ffa80098] px-[0.35em] py-[0.125em] text-white dark:bg-highlight/85 dark:text-background">
              زبانی
            </span>
            مسلط شو
          </span>
          <span
            className="flex flex-wrap items-center justify-center"
            dir="rtl"
          >
            با کمک
            <span className="group relative flex h-[1.35em] w-[1.5em] items-center justify-center rounded-full bg-cyan-200 dark:text-secondary">
              <Globe
                className="z-1 h-[1.25em] w-[1.25em] animate-spin-slow"
                strokeWidth={2.15}
              />
            </span>
            <span>
              <span className="">Zabano</span>
            </span>{" "}
          </span>
        </h1>
      </AnimatedTitle>

      <div className="absolute -left-[2%] top-[13%] -z-1 sm:left-[10%]">
        <AnimatedHeroDecor className="origin-bottom-right" delay={0.8}>
          <div className="size-20 -rotate-12 rounded-lg bg-gradient-to-br from-[#ffa80070]  to-transparent p-2 text-background sm:size-24 lg:size-32">
            <LangSVG />
          </div>
        </AnimatedHeroDecor>
      </div>
      <div className="absolute right-[10%] top-[13%] -z-1 max-md:hidden">
        <AnimatedHeroDecor className="origin-bottom-left" move={60} delay={1}>
          <div className="size-24 rotate-12 rounded-lg bg-gradient-to-bl from-[#ffa80070]  to-transparent p-2 text-background lg:size-32">
            <BulbSVG />
          </div>
        </AnimatedHeroDecor>
      </div>
      <div className="absolute bottom-[10%] left-[10%] -z-1 max-md:hidden">
        <AnimatedHeroDecor className="origin-top-right" move={60} delay={1.2}>
          <div className="size-24 -rotate-6 rounded-lg bg-gradient-to-r from-[#00ffff71]  to-transparent p-2 text-background lg:size-32">
            <RewardSVG />
          </div>
        </AnimatedHeroDecor>
      </div>
      <div className="absolute -right-[2%] top-1/3 -z-1 sm:right-[10%] md:top-2/3">
        <AnimatedHeroDecor className="origin-top-left" delay={1.4}>
          <div className="size-20 rotate-12 rounded-lg bg-gradient-to-l from-[#00ffff71]  to-transparent p-2 text-background sm:size-24 lg:size-32">
            <VoiceSVG />
          </div>
        </AnimatedHeroDecor>
      </div>
    </section>
  );
}
