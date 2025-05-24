"use client";

import {
  getActivityPatternsByActivityId,
  patchUserPatternProgress,
  postCreateUserPatternProgress,
} from "@/api/services/learning";
import WaveLoading from "@/components/shared/WaveLoading";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TextQuestionSingleChoiceTextAnswer from "./components/TextQuestionSingleChoiceTextAnswer";
import AudioQuestionTextAnswer from "./components/AudioQuestionTextAnswer";
import TextQuestionTextAnswer from "./components/TextQuestionTextAnswer";

const SingleActivity: React.FC = () => {
  const { activityId, unitId } = useParams();
  const [total, setTotal] = useState(0);
  const [selectedActor, setSelectedActor] = useState<string | null>(null);
  const [isActivityFinished, setIsActivityFinished] = useState(false);
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

  const handleStart = () => {
    starterUserPatternProgress(activityData?.[currentIndex]?.id);
  };

  const handleNext = () => {
    if (currentIndex === activityData?.length - 1) {
      finisherUserPatternProgress(activityData?.[currentIndex]?.id);
      setIsActivityFinished(true);
      return;
    }

    finisherUserPatternProgress(activityData?.[currentIndex]?.id);
    setCurrentIndex(currentIndex + 1);
  };

  const handleSkip = () => {
    finisherUserPatternProgress(activityData?.[currentIndex]?.id);
    setIsActivityFinished(true);
  };

  useEffect(() => {
    if (activityData?.[currentIndex]?.id) {
      handleStart();
    }
  }, [currentIndex, activityData]);

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
        handleSkip={handleSkip}
      />
    ),
    writeAndCompare: (
      <WriteAndCompare
        activity={activityData?.[currentIndex]?.content}
        handleNext={handleNext}
      />
    ),
    audioQuestionTextAnswer: (
      <AudioQuestionTextAnswer
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
        handleSkip={handleSkip}
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
    textQuestionSingleChoiceTextAnswer: (
      <TextQuestionSingleChoiceTextAnswer
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
    textQuestionTextAnswer: (
      <TextQuestionTextAnswer
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

  if (isActivityFinished) {
    return (
      <div className="relative w-full h-[100vh] flex flex-col justify-center items-center bg-backgroundMain overflow-hidden">
        {/* Soft overlay background */}
        <div className="absolute inset-0 bg-gradient-to-br from-backgroundLayout to-backgroundMain z-0" />
        <div className="relative z-10 flex flex-col items-center w-full max-w-lg mx-auto">
          {/* Checkmark */}
          <CheckCircleIcon
            className="text-green-500"
            style={{ fontSize: 80 }}
          />
          {/* Card */}
          <div className="flex flex-col md:flex-row items-center bg-backgroundMain rounded-2xl shadow-lg p-6 mt-6 w-full max-w-md">
            <div>
              <div className="font-bold text-xl mb-2 text-main">عالیه!</div>
              <div className="text-gray400 text-base">
                شما با موفقیت این درس را پایان رسوندید.
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <Link
            href={`/app/units/${unitId}`}
            className="mt-8 px-12 py-4 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-xl shadow-lg transition"
          >
            بازگشت به لیست درس ها
          </Link>
        </div>
      </div>
    );
  }

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
          <div className="absolute top-0 right-4 md:right-4 z-50 py-3 px-4 ">
            <div className="flex items-center justify-start md:justify-end mb-2 ">
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
