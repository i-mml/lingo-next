import React from "react";

const SingleUnitSkeleton = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-backgroundLayout animate-pulse">
      <div className="w-full h-72 bg-gray-200 mb-8 rounded-xl" />
      <div className="w-2/3 h-10 bg-gray-200 rounded mb-4" />
      <div className="w-1/2 h-6 bg-gray-200 rounded mb-2" />
      <div className="w-1/3 h-4 bg-gray-200 rounded mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-xl" />
        ))}
      </div>
    </div>
  );
};

export default SingleUnitSkeleton;
