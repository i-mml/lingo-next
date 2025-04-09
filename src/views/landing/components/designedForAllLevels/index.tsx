"use client";

import SmallOrangeLine from "../SmallOrangeLine";

const DesignedForAllLevels = () => {
  return (
    <div className="bg-white pt-[90px] pb-[95px] text-[rgba(26,21,26,0.8)] flex flex-col items-center w-[91.4%] mx-auto max-[750px]:py-[24px]">
      <div className="font-bold text-[32px] mb-0 mt-0 max-[750px]:text-[24px] text-center">
        طراحی شده برای تمام سطوح
      </div>
      <SmallOrangeLine align="center" />

      <main>
        <p className="max-w-[500px] text-center text-[18px] mt-0 mb-[20px] max-[750px]:text-[16px]">
          برنامه‌های تلویزیونی و ابزارهای مؤثر و سرگرم‌کننده برای یادگیری، دیگه
          تفاوتی نداره که سطح شما چی باشه
        </p>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <span>★</span>
            <div className="designed-for-all-levels__levels__level">
              Beginner
            </div>
          </div>
          <div className="text-center">
            <span>★</span>
            <span>★</span>
            <div className="designed-for-all-levels__levels__level">
              Intermediate
            </div>
          </div>
          <div className="text-center">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <div className="designed-for-all-levels__levels__level">
              Advanced
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DesignedForAllLevels;
