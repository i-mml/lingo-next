const AudioBookSkeletonLoader = () => {
  return (
    <div>
      {/* Section Skeletons - First section */}
      <section className="px-4 md:px-6 mt-5">
        <div className="sliders-content-view">
          <div className="slider-wrapper mb-12">
            {/* Section Title */}
            <div className="h-8 w-52 bg-gray-300 rounded-md mb-6 animate-pulse"></div>

            {/* Cards Row */}
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex flex-col">
                  {/* Card image */}
                  <div className="rounded-lg w-[170px] h-[276px] md:w-[212px] md:h-[318px] bg-gray-300 animate-pulse"></div>
                  {/* Title */}
                  <div className="h-6 w-32 bg-gray-300 mt-3 rounded-md animate-pulse"></div>
                  {/* Artist */}
                  <div className="h-4 w-24 bg-gray-300 mt-2 rounded-md animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Second Section */}
          <div className="slider-wrapper">
            {/* Section Title */}
            <div className="h-8 w-64 bg-gray-300 rounded-md mb-6 animate-pulse"></div>

            {/* Cards Row */}
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex flex-col">
                  {/* Card image */}
                  <div className="rounded-lg w-[170px] h-[276px] md:w-[212px] md:h-[318px] bg-gray-300 animate-pulse"></div>
                  {/* Title */}
                  <div className="h-6 w-32 bg-gray-300 mt-3 rounded-md animate-pulse"></div>
                  {/* Artist */}
                  <div className="h-4 w-24 bg-gray-300 mt-2 rounded-md animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* third Section */}
          <div className="slider-wrapper">
            {/* Section Title */}
            <div className="h-8 w-64 bg-gray-300 rounded-md mb-6 animate-pulse"></div>

            {/* Cards Row */}
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex flex-col">
                  {/* Card image */}
                  <div className="rounded-lg w-[170px] h-[276px] md:w-[212px] md:h-[318px] bg-gray-300 animate-pulse"></div>
                  {/* Title */}
                  <div className="h-6 w-32 bg-gray-300 mt-3 rounded-md animate-pulse"></div>
                  {/* Artist */}
                  <div className="h-4 w-24 bg-gray-300 mt-2 rounded-md animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AudioBookSkeletonLoader;
