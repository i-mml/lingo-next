"use client";

import React from "react";
import { AnimatedList, AnimatedListItem } from "../AnimatedList";
import { AnimatedTitle } from "../AnimatedTitle";
import LanguageItem from "../languageItem";
import { availableLanguagesList } from "./data";

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  hidden: { opacity: 0 },
};

const item = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  hidden: { opacity: 0, scale: 0.4 },
};

function AvailableLanguages() {
  return (
    <div className="text-center pt-[60px] pb-[60px] font-bold text-[#20114a] text-[18px] mt-[-5px]">
      <AnimatedTitle
        className="w-full text-center font-bold mb-3 lg:mb-10"
        duration={5}
      >
        <h2 className="heading-section text-2xl lg:text-3xl">
          من می‌خواهم <span className="text-primary/100">... یاد بگیرم</span>
        </h2>
      </AnimatedTitle>

      <div className="w-[91.4%] max-w-[1250px] mx-auto mt-[37px] mb-[32px] sm:mt-[17px]">
        <AnimatedList
          className="grid grid-cols-3 lg:grid-cols-6 gap-3 text-center lg:gap-4"
          variants={list}
        >
          {availableLanguagesList?.map((node) => (
            <AnimatedListItem
              key={node.id}
              className="basis-28 md:basis-40"
              variants={item}
            >
              <LanguageItem item={node} />
            </AnimatedListItem>
          ))}
        </AnimatedList>
      </div>
    </div>
  );
}

export default AvailableLanguages;
