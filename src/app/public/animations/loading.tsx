"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AnimationsPageLoading() {
  return (
    <div className="pb-10">
      {/* Hero banner with background image */}
      <div className="relative w-full h-[500px] mb-8">
        <Skeleton className="absolute inset-0 bg-gray-800/70" />

        {/* CTA Button */}
        <div className="absolute bottom-8 right-8">
          <Skeleton className="h-14 w-44 rounded-lg bg-amber-500/70" />
        </div>
      </div>

      {/* Movie posters row */}
      <div className="px-4 md:px-8">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="flex-shrink-0">
              <div className="relative w-[180px] h-[270px] rounded-lg overflow-hidden">
                <Skeleton className="absolute inset-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
