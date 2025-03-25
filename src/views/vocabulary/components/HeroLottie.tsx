"use client";

import Lottie from "lottie-react";
import React from "react";
import VocabularyLineal from "@/assets/lotties/vocabulary.json";

const HeroLottie = () => {
  return (
    <Lottie
      animationData={VocabularyLineal}
      className="w-16 h-16 lg:w-20 lg:h-20"
    />
  );
};

export default HeroLottie;
