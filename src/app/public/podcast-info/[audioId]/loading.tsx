"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function PodcastInfoPageLoading() {
  return (
    <div className="pb-10">
      {/* Header with image and details */}
      <div className="px-4 pt-6 pb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Podcast Cover */}
          <Skeleton className="h-[250px] w-[250px] rounded-lg shrink-0 mx-auto md:mx-0" />

          {/* Podcast Details */}
          <div className="flex-1">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-2/3 mb-6" />

            {/* Action buttons */}
            <div className="flex gap-3 mt-6">
              <Skeleton className="h-10 w-32 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700 mb-6"></div>

      {/* Episodes */}
      <div className="px-4">
        <Skeleton className="h-7 w-40 mb-6" />

        {/* Episode list */}
        <div className="space-y-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="p-4 border border-gray-200 rounded-lg dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-3">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-4 w-full mb-4" />

              {/* Audio Player Bar */}
              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
