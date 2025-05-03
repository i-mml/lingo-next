"use client";

import { getActivityPatternsByActivityId } from "@/api/services/learning";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const SingleActivityView = () => {
  const { activityId } = useParams();
  const { data: activity } = useQuery({
    queryKey: ["activity", activityId],
    queryFn: () => getActivityPatternsByActivityId(activityId as string),
  });

  console.log({ activity });
  return <div>SingleActivityView</div>;
};

export default SingleActivityView;
