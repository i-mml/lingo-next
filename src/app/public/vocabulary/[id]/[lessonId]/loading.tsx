"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function VocabularyLessonLoading() {
  return (
    <div className="min-h-screen bg-backgroundSecondary">
      {/* Main Content */}
      <div className="px-[5%] pb-20 pt-4">
        {/* Back Link and Progress */}
        <div className="flex justify-start items-center mb-4 gap-2">
          <Skeleton className="h-6 w-20" /> {/* Back Link */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6" /> {/* Clock Icon */}
            <Skeleton className="h-6 w-24" /> {/* Progress Text */}
          </div>
        </div>

        {/* Title Section */}
        <div className="flex items-start mb-6 gap-2 ">
          <Skeleton className="w-[80px] h-[120px] rounded-lg" />{" "}
          <Skeleton className="h-8 w-64" /> {/* Lesson Title */}
          {/* Book Cover */}
        </div>

        {/* Translation Toggle */}
        <div className="flex items-center justify-start gap-2 mb-4">
          <Skeleton className="h-6 w-6" /> {/* Translation Icon */}
          <Skeleton className="h-6 w-24" /> {/* Toggle Text */}
          <Skeleton className="h-6 w-6 rounded" /> {/* Checkbox */}
        </div>

        {/* Quiz Button */}
        <div className="mb-6">
          <Skeleton className="h-12 w-full rounded-xl bg-backgroundMain/50" />
        </div>

        {/* Word List */}
        <div className="space-y-[2px]">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="bg-backgroundMain p-4 first:rounded-t-xl last:rounded-b-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-6" /> {/* Number */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-20" /> {/* Word */}
                      <Skeleton className="h-5 w-5 rounded" />{" "}
                      {/* Audio Icon */}
                    </div>
                    <Skeleton className="h-5 w-40" /> {/* Translation */}
                  </div>
                </div>
                <Skeleton className="h-6 w-6" /> {/* Expand Icon */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
