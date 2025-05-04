"use client";

import { getActivityPatternsByActivityId } from "@/api/services/learning";
import WaveLoading from "@/components/shared/WaveLoading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const SingleActivityView = () => {
  const { activityId } = useParams();
  const { data: activity, isLoading } = useQuery({
    queryKey: ["activity", activityId],
    queryFn: () => getActivityPatternsByActivityId(activityId as string),
  });

  const patternType = activity?.[0]?.pattern_type;

  const patternTypes = {
    watchVideo: <></>,
    repeatAndCompare: <></>,
    writeAndCompare: <></>,
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

  return <div>SingleActivityView</div>;
};

export default SingleActivityView;
