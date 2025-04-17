"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function HomePageLoading() {
  // Create 8 grid cards to match the home page structure
  const gridItems = Array.from({ length: 8 }, (_, i) => (
    <div key={i} className="w-full h-full">
      <div className="relative pb-[56.25%] w-full">
        <Skeleton className="absolute inset-0 rounded-xl" />
      </div>
      <div className="mt-4">
        <Skeleton className="h-7 w-4/5 mb-2" />
        <Skeleton className="h-5 w-full" />
      </div>
    </div>
  ));

  return (
    <div className="px-[5%] py-10">
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        style={{
          minHeight: "calc(100vh - 200px)",
          gridAutoRows: "minmax(250px, auto)",
        }}
      >
        {gridItems}
      </div>
    </div>
  );
}
