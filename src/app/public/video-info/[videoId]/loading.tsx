"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function VideoInfoPageLoading() {
  return (
    <div className="pb-10">
      {/* Main Video Player Skeleton with 16:9 aspect ratio and player UI elements */}
      <div className="relative w-full" style={{ backgroundColor: "#101112" }}>
        <div className="relative pb-[56.25%] w-full">
          <Skeleton className="absolute inset-0 bg-black/60" />

          {/* Video player controls overlay - more realistic */}
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            <div className="flex justify-end">
              <Skeleton className="h-8 w-8 rounded-full bg-white/20" />
            </div>

            <div className="space-y-3">
              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-1 flex-grow rounded-full bg-white/30" />
                <Skeleton className="h-4 w-12 rounded bg-white/20" />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <Skeleton className="h-8 w-8 rounded-full bg-white/20" />
                  <Skeleton className="h-8 w-8 rounded-full bg-white/20" />
                  <Skeleton className="h-8 w-8 rounded-full bg-white/20" />
                </div>
                <div className="flex gap-3">
                  <Skeleton className="h-8 w-8 rounded-full bg-white/20" />
                  <Skeleton className="h-8 w-8 rounded-full bg-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Title and Actions - Fixed height container with more accurate spacing */}
      <div className="px-4 pt-6 mb-8">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-6" />

        {/* Action buttons - Fixed position with better alignment */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-28 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      {/* Tabs section with fixed height and better spacing */}
      <div className="px-4">
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex gap-6 mb-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        {/* Episodes section with consistent sizing and better layout */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 pb-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="flex gap-3 p-4 border border-gray-200 rounded-lg dark:border-gray-700"
              style={{ height: "110px" }}
            >
              {/* Thumbnail with play indicator */}
              <div className="relative w-[140px] h-[80px] flex-shrink-0">
                <Skeleton className="absolute inset-0 rounded-md" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="h-3 w-3 ml-0.5 bg-white rounded-sm transform rotate-90"></div>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination/Load more */}
        <div className="flex justify-center mt-8">
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>
      </div>
    </div>
  );
}
