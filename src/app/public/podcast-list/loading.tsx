"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function PodcastListPageLoading() {
  return (
    <div className="pb-10 px-4">
      {/* Page Title */}
      <div className="h-16 flex items-center">
        <Skeleton className="h-8 w-52" />
      </div>

      {/* Category Tabs - Fixed height to prevent layout shifts */}
      <div className="h-14 flex gap-4 overflow-x-auto pb-2 mb-6">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} className="h-10 w-28 rounded-full flex-shrink-0" />
        ))}
      </div>

      {/* Podcast Grid - Using aspect ratio for consistent sizing */}
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        style={{ minHeight: "calc(100vh - 180px)" }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="flex flex-col">
            <div className="relative pb-[100%] w-full">
              <Skeleton className="absolute inset-0 rounded-lg" />
            </div>
            <div className="pt-3 space-y-2">
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-4 w-2/5" />
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button - Fixed height */}
      <div className="h-20 flex justify-center items-center mt-8">
        <Skeleton className="h-12 w-40 rounded-full" />
      </div>
    </div>
  );
}
