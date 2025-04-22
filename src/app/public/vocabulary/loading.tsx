"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { isMobile } from "react-device-detect";

export default function VocabularyPageLoading() {
  return (
    <div className="min-h-[80vh] md:min-h-[60vh] pt-[5vh] gap-6 px-[5%]">
      {/* Header Section */}
      <header className="mb-12">
        <Skeleton className="h-8 w-3/4 max-w-[600px] mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-5 w-full max-w-[800px]" />
          <Skeleton className="h-5 w-full max-w-[700px]" />
          <Skeleton className="h-5 w-full max-w-[700px]" />
          {isMobile ? (
            <>
              <Skeleton className="h-5 w-full max-w-[700px]" />
              <Skeleton className="h-5 w-full max-w-[700px]" />
              <Skeleton className="h-5 w-full max-w-[700px]" />
              <Skeleton className="h-5 w-full max-w-[700px]" />
              <Skeleton className="h-5 w-full max-w-[700px]" />
              <Skeleton className="h-5 w-full max-w-[700px]" />
              <Skeleton className="h-5 w-full max-w-[700px]" />
            </>
          ) : (
            <></>
          )}
        </div>
      </header>

      {/* Grid Items */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="flex flex-col items-center">
            <Skeleton className="aspect-[179/290] w-full max-w-[179px] md:max-w-[212px] rounded-xl mb-3" />
            <Skeleton className="h-5 w-3/4 max-w-[150px]" />
          </div>
        ))}
      </div>
    </div>
  );
}
