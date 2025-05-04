"use client";

import { getActivityPatternsByActivityId } from "@/api/services/learning";
import WaveLoading from "@/components/shared/WaveLoading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import WriteAndCompare from "./components/WriteAndCompare";
import { Activity } from "./types";

const SingleActivity: React.FC = () => {
  const { activityId } = useParams();
  const { data: activityData, isLoading } = useQuery({
    queryKey: ["activity", activityId],
    queryFn: () => getActivityPatternsByActivityId(activityId as string),
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [total, setTotal] = useState(activityData?.length || 0);

  const patternType = activityData?.[0]?.pattern_type;

  const progress = ((currentIndex + 1) / total) * 100;

  const handleNext = () => {
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
    imageQuestionSingleChoiceTextAnswer: <></>,
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
        <div className="font-bold text-xl">Write</div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-bold text-lg">
            {currentIndex + 1}/{total}
          </span>
        </div>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded mb-8">
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
