import React from "react";

const ThousandsOfHours = () => {
  return (
    <div
      className="py-20 bg-gradient-to-b from-[#110b12] to-[#3c3f56] bg-no-repeat bg-center bg-[url('https://d1jqu391rhi90k.cloudfront.net/img/home-page/shows-bg.png')]"
      style={{ backgroundPosition: "center bottom 22%" }}
    >
      <div className="w-[91.4%] max-w-[1144px] mx-auto flex items-center justify-center flex-col md:flex-row">
        <div className="w-full md:w-1/2 text-center md:text-right">
          <h3 className="text-2xl font-bold text-white leading-snug mb-4 mt-0">
            1000 ساعت فیلم و سریال عالی
          </h3>
          <main>
            <p className="max-w-[400px] text-lg leading-relaxed text-white m-0">
              به فیلم‌ها، تله‌نوول‌ها، کمدی‌ها، برنامه‌های سفر و موارد دیگر
              دسترسی داشته باشید و بیشتر تماشا کنید
            </p>
            <p className="max-w-[400px] text-lg leading-relaxed text-white m-0 mt-4">
              نمایش‌های جدید هر ماه اضافه می‌شوند، بنابراین همیشه چیز جدیدی برای
              یادگیری وجود دارد
            </p>
          </main>
        </div>
        <div className="w-full md:w-[30.44%] md:ml-32 mt-6 md:mt-0">
          <img
            src="https://d1jqu391rhi90k.cloudfront.net/img/home-page/thousands4.gif"
            className="max-w-full h-auto md:h-[512px]"
            alt="Thousands of hours"
          />
        </div>
      </div>
    </div>
  );
};

export default ThousandsOfHours;
