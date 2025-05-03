"use client";

import { isMobile } from "react-device-detect";

const UnitsSkeleton = () => {
  if (isMobile) {
    return (
      <div className="flex flex-col gap-4">
        {/* Group header skeleton */}
        <div className="mb-2 px-2 py-3 rounded-lg bg-gray-100 border-2 border-borderMain cards-sm-box-shadow flex flex-col gap-1 animate-pulse">
          <div className="flex items-center gap-3">
            {/* Circular skeleton */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gray-200" />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-300">
                --/--
              </div>
            </div>
            <span className="font-bold text-gray-300 text-base w-24 h-6 rounded bg-gray-200" />
          </div>
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-300 w-24 h-4 rounded bg-gray-200" />
              <div className="flex items-center justify-evenly flex-1 w-full">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="w-6 h-2 rounded bg-gray-200" />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Unit card skeletons */}
        <div className="flex flex-col gap-4">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="flex items-stretch rounded-xl bg-backgroundMain border-2 border-borderMain overflow-hidden min-h-[110px] animate-pulse"
            >
              <div className="relative w-24 min-w-[96px] h-[150px] flex-shrink-0">
                <div className="w-full h-full bg-gray-200 rounded" />
              </div>
              <div className="flex flex-col justify-between flex-1 p-3 max-w-[70%]">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-300 w-16 h-4 rounded bg-gray-200" />
                  </div>
                  <div className="font-bold text-base mb-1 text-gray-300 w-32 h-5 rounded bg-gray-200" />
                  <div className="text-xs text-gray-300 mb-2 w-24 h-4 rounded bg-gray-200" />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-6 h-6 rounded-full bg-gray-200" />
                  <span className="text-xs font-medium text-gray-300 w-16 h-4 rounded bg-gray-200" />
                  <span className="text-xs text-gray-300 w-8 h-4 rounded bg-gray-200" />
                  <div className="flex-1 h-1 rounded bg-gray-200 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-8">
      {/* Group header skeleton */}
      <div className="mb-2 px-6 py-6 rounded-lg bg-gray-100 border-2 border-borderMain cards-sm-box-shadow flex flex-col items-start gap-6 animate-pulse">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gray-200" />
          </div>
          <span className="font-bold text-gray-300 text-xl w-40 h-8 rounded bg-gray-200" />
        </div>
        <div className="flex-1 flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-xs font-medium text-gray-300 w-32 h-4 rounded bg-gray-200" />
            <div className="flex items-center justify-evenly flex-1 w-full gap-2">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="w-6 h-3 rounded bg-gray-200" />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Grid of card skeletons */}
      <div className="w-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center gap-4">
        {[...Array(10)].map((_, idx) => (
          <div
            key={idx}
            className="rounded-2xl overflow-hidden flex flex-col bg-backgroundMain w-full animate-pulse"
            style={{
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
              border: "none",
            }}
          >
            <div className="relative w-full h-[252px]">
              <div className="w-full h-full bg-gray-200 rounded" />
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-gray-300 w-20 h-4 rounded bg-gray-200 mb-2" />
                <div className="text-sm font-semibold text-gray-300 w-32 h-6 rounded bg-gray-200 mb-2" />
                <div className="text-xs mt-1 text-gray-300 w-24 h-4 rounded bg-gray-200" />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="w-6 h-6 rounded-full bg-gray-200" />
                <span className="text-xs font-medium text-gray-300 w-16 h-4 rounded bg-gray-200" />
                <span className="text-xs text-gray-300 w-8 h-4 rounded bg-gray-200" />
                <div className="flex-1 h-1 rounded bg-gray-200 ml-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitsSkeleton;
