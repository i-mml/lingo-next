"use client";

import {
  getActivityPatternsByActivityId,
  patchUserPatternProgress,
  postCreateUserPatternProgress,
} from "@/api/services/learning";
import WaveLoading from "@/components/shared/WaveLoading";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import WriteAndCompare from "./components/WriteAndCompare";
import ImageQuestionSingleChoiceTextAnswer from "./components/ImageQuestionSingleChoiceTextAnswer";
import FillTheGapsAndListenAudio from "./components/FillTheGapsAndListenAudio";
import FillTheGapsWithTextAndListenAudio from "./components/FillTheGapsWithTextAndListenAudio";
import Link from "next/link";
import { ArrowForward } from "@mui/icons-material";
import RepeatAndCompare from "./components/RepeatAndCompare";
import WatchVideoUnit from "./components/WatchVideoUnit";
import clsx from "clsx";
import Roleplay from "./components/Roleplay";
import FillTheGaps from "./components/FillTheGaps";
import TextQuestionSingleChoiceImageAnswer from "./components/TextQuestionSingleChoiceImageAnswer";

// TODOS => on first handleNext call this : POST /'user-pattern-progress/ \
//  '{
//       "pattern_id": PATTERN_ID
//     }'

// TODOS => on last handleNext call this : PATCH /'user-pattern-progress/ \

const SingleActivity: React.FC = () => {
  const { activityId, unitId } = useParams();
  const [total, setTotal] = useState(0);
  const [selectedActor, setSelectedActor] = useState<string | null>(null);
  const { data: activityData, isLoading } = useQuery({
    queryKey: ["activity", activityId],
    queryFn: () =>
      getActivityPatternsByActivityId(activityId as string).then((res) => {
        setTotal(res.length);
        return res;
      }),
  });

  const { mutate: starterUserPatternProgress } = useMutation({
    mutationFn: (patternId: string) =>
      postCreateUserPatternProgress(patternId).then((res) => {
        return res;
      }),
  });
  const { mutate: finisherUserPatternProgress } = useMutation({
    mutationFn: (patternId: string) =>
      patchUserPatternProgress(patternId).then((res) => {
        return res;
      }),
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const patternType = activityData?.[currentIndex]?.pattern_type;
  const progress = ((currentIndex + 1) / total) * 100;

  const handleNext = () => {
    if (currentIndex === activityData?.length - 1) {
      console.log("it's finished"); //patch
      finisherUserPatternProgress(activityData?.[currentIndex]?.id);
      return;
    }
    if (currentIndex !== activityData?.length - 1) {
      starterUserPatternProgress(activityData?.[currentIndex]?.id);
    }
    // currentIndex ===0 => post
    setCurrentIndex(currentIndex + 1);
  };

  const patternTypes: Record<string, React.ReactNode> = {
    watchVideo: (
      <WatchVideoUnit
        data={activityData?.[currentIndex]?.movie}
        handleNext={handleNext}
      />
    ),
    repeatAndCompare: (
      <RepeatAndCompare
        activity={activityData?.[currentIndex]?.content}
        handleNext={handleNext}
      />
    ),
    writeAndCompare: (
      <WriteAndCompare
        activity={activityData?.[currentIndex]?.content}
        handleNext={handleNext}
      />
    ),
    chatBubble: (
      <Roleplay
        activity={activityData?.[currentIndex]}
        handleNext={handleNext}
        selectedActor={selectedActor}
        onActorSelect={setSelectedActor}
      />
    ),
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
    fillTheGaps: (
      <FillTheGaps
        activity={activityData?.[currentIndex]?.content}
        handleNext={handleNext}
      />
    ),
    textQuestionSingleChoiceImageAnswer: (
      <TextQuestionSingleChoiceImageAnswer
        activity={activityData?.[currentIndex]?.content}
        handleNext={handleNext}
      />
    ),
  };

  if (isLoading)
    return (
      <div className="w-full h-[80vh] flex justify-center items-center bg-backgroundMain">
        <WaveLoading />
      </div>
    );

  return (
    <div
      className={clsx(
        patternType === "watchVideo"
          ? "min-h-[100vh] w-full max-w-none relative"
          : "w-full max-w-[90%] md:max-w-md mx-auto pt-8 min-h-[80vh]"
      )}
    >
      {/* Progress */}
      {patternType !== "watchVideo" ? (
        <>
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
        </>
      ) : (
        <>
          <div className="absolute top-0 left-0 z-50 py-3 w-full px-4">
            <div className="flex items-center justify-between mb-2 w-full">
              <Link
                href={`/app/units/${unitId}`}
                className="font-bold text-sm md:text-base text-gray400 bg-backgroundMain rounded-lg p-1"
              >
                <ArrowForward /> بازگشت
              </Link>
            </div>
          </div>
        </>
      )}
      {patternTypes[patternType] || null}
    </div>
  );
};

export default SingleActivity;
