"use client";

import { getActivityPatternsByActivityId } from "@/api/services/learning";
import WaveLoading from "@/components/shared/WaveLoading";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import WriteAndCompare from "./components/WriteAndCompare";
import { Activity } from "./types";

const SingleActivity: React.FC = () => {
  const { activityId } = useParams();
  const { data: activityData, isLoading } = useQuery({
    queryKey: ["activity", activityId],
    queryFn: () => getActivityPatternsByActivityId(activityId as string),
  });

  const patternType = activityData?.[0]?.pattern_type;

  const patternTypes: Record<string, React.ReactNode> = {
    watchVideo: <></>,
    repeatAndCompare: <></>,
    writeAndCompare: (
      <WriteAndCompare
        activity={activityData?.[0]?.content}
        currentIndex={0}
        total={10}
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

  return <>{patternTypes[patternType] || null}</>;
};

export default SingleActivity;
