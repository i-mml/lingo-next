import React from "react";
import DesignedForAllLevels from "./components/designedForAllLevels";
import HomeGuideSection from "./components/guideSections";
import ThousandsOfHours from "./components/thousndsOfHours";
import { Hero } from "./components/Hero";
import AvailableLanguages from "./components/availableLanguages";

const LandingView = () => {
  return (
    <section className="box-border !bg-white">
      <Hero />
      <AvailableLanguages />

      {/* <HomeHero /> */}

      {/* home guide sections */}
      <HomeGuideSection
        title="فیلم مورد علاقه خودت رو انتخاب کن"
        description="1000 ساعت از فیلم و سریال های روز، کتاب صوتی، موسیقی های جذاب و سرگرم کننده"
        // image="https://d1jqu391rhi90k.cloudfront.net/img/home-page/new-step-1.png"
        image="/images/series_frame.png"
        imageOrder={2}
        hasStartButton
      />
      <HomeGuideSection
        title="تماشا کن ، کلیک کن"
        description="همه محتوا ها با دو زیرنویس ارائه می شوند. برای مشاهده ترجمه فوری کافیه روی هر کلمه ای کلیک کنید. هر چه بیشتر تماشا کنید، بیشتر یاد می گیرید."
        // image="https://d1jqu391rhi90k.cloudfront.net/img/home-page/new-step-2.png"
        image="/images/subtitle_screenshot.png"
        imageOrder={1}
      />
      <HomeGuideSection
        title="مرور کنید و یاد بگیرید"
        description="با استفاده از روش های منحصر به فرد و همه جانبه ما، مهارت های زبانی خود را توسعه دهید، مرور و دوره کنید."
        // image="https://d1jqu391rhi90k.cloudfront.net/img/home-page/new-step-3.png"
        image="/images/flashcard-shot.png"
        imageOrder={2}
        hasStartButton
      />

      <ThousandsOfHours />
      <DesignedForAllLevels />
      {/* <LandingKidsSection /> */}
    </section>
  );
};

export default LandingView;
