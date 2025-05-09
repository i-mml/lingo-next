import React from "react";

const WaveLoading = ({ isBlack = false }) => {
  return (
    <div className="hover:opacity-80">
      <div
        className={`flex gap-1 justify-center items-center ${
          isBlack ? "" : "text-main"
        }`}
      >
        <span
          className={`h-[15px] w-[4px] animate-pulse duration-[1500ms] ease-in-out infinite delay-[750ms] bg-main`}
        />
        <span
          className={`h-[15px] w-[4px] animate-grow duration-[1500ms] ease-in-out infinite delay-0 bg-main`}
        />
        <span
          className={`h-[15px] w-[4px] animate-pulse duration-[1500ms] ease-in-out infinite delay-[750ms] bg-main`}
        />
      </div>
    </div>
  );
};

export default WaveLoading;
