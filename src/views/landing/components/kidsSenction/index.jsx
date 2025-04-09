import React from "react";
import PrimaryButton from "../../../../components/primaryButton";

const LandingKidsSection = () => {
  return (
    <div className="bg-[url('https://d1jqu391rhi90k.cloudfront.net/img/home-page/kids-bg.png')] bg-cover bg-bottom pt-[45px] pb-[100px]">
      <img
        src="https://lingopie.com/img/home-page/lingopie-kids-logo.png"
        alt="kinds-section"
        className="block mx-auto w-[146px] h-[54px]"
      />

      <div className="flex justify-between items-start w-full max-w-[1036px] mx-auto">
        <img
          src="https://d1jqu391rhi90k.cloudfront.net/img/home-page/kids-show.png"
          alt="kinds-shot"
          className="w-[59.7%]"
        />

        <div className="w-[32.42%]">
          <h2 className="text-[32px] text-[rgba(26,21,26,0.8)] font-bold mt-0 mb-[8px]">
            A whole world just for kids
          </h2>
          <p className="text-left mt-0 max-w-[400px] text-[18px]">
            ith a selection of safe and entertaining Spanish TV shows, watch
            your kids start their journey towards language fluency!
          </p>

          <ul className="p-0 mt-[20px] mb-[40px] list-none font-bold leading-[2.5]">
            <li className="flex flex-row items-center text-[18px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                className="mr-[12px]"
              >
                <path d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"></path>
              </svg>
              100% safe
            </li>
            <li className="flex flex-row items-center text-[18px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                className="mr-[12px]"
              >
                <path d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"></path>
              </svg>
              Hand-picked by language experts
            </li>
            <li className="flex flex-row items-center text-[18px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                className="mr-[12px]"
              >
                <path d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"></path>
              </svg>
              oved by educators
            </li>
            <li className="flex flex-row items-center text-[18px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                className="mr-[12px]"
              >
                <path d="M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z"></path>
              </svg>
              mes fit for family
            </li>
          </ul>
          <PrimaryButton>Start for Free</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default LandingKidsSection;
