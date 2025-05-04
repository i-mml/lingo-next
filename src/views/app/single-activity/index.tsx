"use client";

import { getActivityPatternsByActivityId } from "@/api/services/learning";
import WaveLoading from "@/components/shared/WaveLoading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import WriteAndCompare from "./components/WriteAndCompare";
import ImageQuestionSingleChoiceTextAnswer from "./components/ImageQuestionSingleChoiceTextAnswer";
import { patternTypeDictionary } from "@/mock/units";
import FillTheGapsAndListenAudio from "./components/FillTheGapsAndListenAudio";
import FillTheGapsWithTextAndListenAudio from "./components/FillTheGapsWithTextAndListenAudio";
import BackIconComponent from "@/components/shared/BackIconComponent";
import Link from "next/link";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const SingleActivity: React.FC = () => {
  const { activityId, unitId } = useParams();
  const [total, setTotal] = useState(0);
  const { data: activityData, isLoading } = useQuery({
    queryKey: ["activity", activityId],
    queryFn: () =>
      getActivityPatternsByActivityId(activityId as string).then((res) => {
        setTotal(res.length);
        return res;
      }),
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const patternType = activityData?.[currentIndex]?.pattern_type;
  const progress = ((currentIndex + 1) / total) * 100;

  const handleNext = () => {
    if (currentIndex === activityData?.length - 1) {
      console.log("it's finished");
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  const patternTypes: Record<string, React.ReactNode> = {
    watchVideo: <></>,
    repeatAndCompare: <></>,
    writeAndCompare: (
      <WriteAndCompare
        activity={activityData?.[currentIndex]?.content}
        handleNext={handleNext}
      />
    ),
    chatBubble: <></>,
    fillTheGapsAndListenAudio: (
      <FillTheGapsAndListenAudio
        activity={activityData?.[currentIndex]?.content}
        handleNext={handleNext}
      />
    ),
    fillTheGapsWithTextAndListenAudio: (
      <FillTheGapsWithTextAndListenAudio
        activity={activityData?.[currentIndex]?.content}
        handleNext={handleNext}
      />
    ),
    imageQuestionSingleChoiceTextAnswer: (
      <ImageQuestionSingleChoiceTextAnswer
        activity={activityData?.[currentIndex]?.content}
        handleNext={handleNext}
      />
    ),
    fillTheGaps: <></>,
  };

  if (isLoading)
    return (
      <div className="w-full h-[80vh] flex justify-center items-center bg-backgroundMain">
        <WaveLoading />
      </div>
    );

  return (
    <div className="w-full max-w-[90%] md:max-w-md mx-auto pt-8 min-h-[80vh]">
      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <Link
          href={`/app/units/${unitId}`}
          className="font-bold text-sm md:text-base text-gray400"
        >
          <ArrowForward /> بازگشت
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-bold text-lg">
            {currentIndex + 1}/{total}
          </span>
        </div>
      </div>
      <div className="w-full h-2 bg-borderMain rounded mb-8">
        <div
          className="h-2 bg-primary rounded"
          style={{ width: `${progress}%`, transition: "width 0.3s" }}
        />
      </div>
      {patternTypes[patternType] || null}
    </div>
  );
};

export default SingleActivity;
