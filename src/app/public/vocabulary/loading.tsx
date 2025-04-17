"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function VocabularyPageLoading() {
  return (
    <div className="pb-10 px-4">
      {/* Page Title */}
      <Skeleton className="h-8 w-52 mb-6 mt-4" />

      {/* Book Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Book Cover */}
            <Skeleton className="h-[220px] w-[160px] rounded-lg mb-4" />
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>

      {/* More Content */}
      <div className="mt-12">
        <Skeleton className="h-8 w-44 mb-6" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="p-4 border border-gray-200 rounded-lg dark:border-gray-700"
            >
              <Skeleton className="h-6 w-32 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
