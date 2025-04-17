"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function GrammarListPageLoading() {
  return (
    <div className="pb-10 px-[5%]">
      {/* Main title */}
      <div className="flex items-center gap-5 px-4 pt-6 pb-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="text-right">
          <Skeleton className="h-8 w-[450px] mb-3" />
          <Skeleton className="h-5 w-[600px]" />
        </div>
      </div>

      {/* Accordion-style grammar categories */}
      <div className="space-y-4 mt-8">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="relative overflow-hidden bg-[#191a1b] rounded-lg"
            style={{ borderRight: "6px solid #f5c71a" }}
          >
            <div className="py-6 px-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-8 rounded-md" /> {/* Chevron icon */}
                <div className="text-right">
                  <Skeleton className="h-7 w-[250px] ml-auto" />{" "}
                  {/* Title - right aligned */}
                </div>
              </div>
              <div className="mt-2 text-right">
                <Skeleton className="h-5 w-full ml-auto" />{" "}
                {/* Description - right aligned */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
