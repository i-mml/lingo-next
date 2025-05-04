"use client";

import { getActivityPatternsByActivityId } from "@/api/services/learning";
import WaveLoading from "@/components/shared/WaveLoading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import WriteAndCompare from "./components/WriteAndCompare";
import ImageQuestionSingleChoiceTextAnswer from "./components/ImageQuestionSingleChoiceTextAnswer";
import { patternTypeDictionary } from "@/mock/units";

const SingleActivity: React.FC = () => {
  const { activityId } = useParams();
  const [total, setTotal] = useState(0);
  const { data: activityData, isLoading } = useQuery({
    queryKey: ["activity", activityId],
    queryFn: () =>
      getActivityPatternsByActivityId(activityId as string).then((res) => {
        setTotal(res.length);
        return res;
      }),
  });

  const [currentIndex, setCurrentIndex] = useState(14);
  const patternType = activityData?.[0]?.pattern_type;
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
    fillTheGapsAndListenAudio: <></>,
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
        <div className="font-bold text-xl text-main">
          {patternTypeDictionary?.[
            patternType as keyof typeof patternTypeDictionary
          ] || ""}
        </div>
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
