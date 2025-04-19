"use client";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { useRouter } from "next/navigation";
import React from "react";
import { AnimatedHeroDecor } from "../AnimatedHeroDecor";
import Image from "next/image";

const HomeGuideSection = ({
  title,
  description,
  image,
  imageOrder,
  hasStartButton = false,
}: any) => {
  const router = useRouter();
  return (
    <div className={`${imageOrder === 2 ? "bg-[#f7f8f9]" : ""}`}>
      <div
        className={`flex items-center justify-between w-[91.4%] max-w-[1250px] mx-auto py-[110px]
        max-[750px]:py-[24px] max-[750px]:flex-col max-[750px]:justify-center`}
        dir="rtl"
      >
        <div
          className={`w-[35%] max-w-[500px] ${
            imageOrder === 1 ? "order-2" : "order-1"
          }
          max-[750px]:w-[90%] max-[750px]:order-2`}
        >
          <div
            className="text-[rgba(26,21,26,0.8)] text-[32px] font-bold text-right
            max-[750px]:text-[28px] max-[750px]:text-center"
          >
            {title}
          </div>
          <div
            className="text-[rgba(26,21,26,0.8)] text-[20px] text-right leading-[26px] my-4
            max-[750px]:text-center max-[750px]:text-[18px]"
          >
            {description}
          </div>

          {hasStartButton && (
            <PrimaryButton
              className="w-[80%] ml-auto mt-5 hidden lg:block"
              onClick={() => router.push("/public/home")}
            >
              شروع یادگیری
            </PrimaryButton>
          )}
        </div>

        <div
          className={`w-full ${
            imageOrder === 1 ? "order-1" : "order-2"
          } max-[750px]:order-1`}
        >
          <AnimatedHeroDecor className="w-[90%] lg:w-[70%] mt-5 lg:mt-0 mx-auto">
            <img
              src={image}
              className="rounded-lg w-full object-cover"
              alt="animated decor"
            />
          </AnimatedHeroDecor>

          {hasStartButton && (
            <PrimaryButton
              className="w-full mx-auto mt-5 block lg:hidden"
              onClick={() => router.push("/public/home")}
            >
              شروع یادگیری
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeGuideSection;
