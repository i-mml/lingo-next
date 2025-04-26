"use client";

import { Skeleton } from "@/components/ui/skeleton";
import AudioBookSkeletonLoader from "@/views/audio-book/components/AudioBookSkeletonLoader";

export default function PodcastListPageLoading() {
  return (
    <div>
      <div className="flex items-center gap-4 py-6 px-[3%] md:pt-10 md:px-[5%] mb-8">
        <Skeleton className="h-20 w-24" />
        <Skeleton className="h-12 w-40" />
      </div>
      <AudioBookSkeletonLoader />;
    </div>
  );
}
