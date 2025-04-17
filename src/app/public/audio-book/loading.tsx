"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AudioBookPageLoading() {
  return (
    <div className="pb-10 px-4">
      {/* Page Title */}
      <Skeleton className="h-8 w-52 mb-6 mt-4" />

      {/* Filter/Category Section */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-6">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="h-10 w-28 rounded-full flex-shrink-0" />
        ))}
      </div>

      {/* Audio Books Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="flex flex-col">
            <Skeleton className="h-[240px] w-full rounded-lg mb-3" />
            <Skeleton className="h-6 w-4/5 mb-2" />
            <Skeleton className="h-4 w-3/5 mb-1" />
            <div className="flex justify-between items-center mt-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-8">
        <Skeleton className="h-12 w-40 rounded-full" />
      </div>
    </div>
  );
}
