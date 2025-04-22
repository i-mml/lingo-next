"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SingleVocabularyLoading() {
  return (
    <div className="min-h-[80vh] md:min-h-[60vh] py-10 gap-6 px-[5%]">
      {/* Back button */}
      <Skeleton className="h-8 w-24 mb-4" />

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-6 w-32" />
      </div>

      {/* Book Image and Title */}
      <div className="flex flex-col items-center justify-center gap-4 mb-6 mt-4">
        <Skeleton className="w-[117px] h-[188.5px] md:w-[138px] md:h-[223.4px] rounded-lg" />
        <Skeleton className="h-8 w-64 md:w-80" />
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Array.from({ length: 9 }, (_, i) => (
          <Skeleton key={i} className="w-full h-[80px] rounded-lg" />
        ))}
      </div>
    </div>
  );
}
