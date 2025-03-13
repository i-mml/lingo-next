import PrimaryButton from "@/components/shared/PrimaryButton";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface IProps {
  title: string;
  image: string;
  description: string;
  link: string;
  hide: boolean;
}

const HomeCard = (props: IProps) => {
  const { title, image, description, link, hide } = props;
  return (
    <div
      className="bg-center rounded-lg bg-cover bg-no-repeat cards-sm-box-shadow"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div
        className={clsx(
          "rounded-lg py-3 lg:py-6 px-4 w-full overflow-hidden",
          hide
            ? "backdrop-grayscale-[1]"
            : "backdrop-blur-[1px] backdrop-brightness-[0.66] backdrop-grayscale-[30%]"
        )}
      >
        <div className="text-xl lg:text-2xl text-white font-semibold">
          {title || ""}
        </div>
        <p className="text-white text-[16px] lg:text-lg line-clamp-2 lg:line-clamp-1 mt-3 w-[90%] lg:w-full">
          {description || ""}
        </p>
        {hide ? (
          <div className="h-[50px] w-[92px] bg-main rounded-lg text-primary mr-auto grid place-items-center">
            به زودی
          </div>
        ) : (
          <PrimaryButton className="mr-auto block" onClick={() => {}}>
            {title == "رایگان بیاموز" ? "شروع رایگان" : "شروع یادگیری"}
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};

export default HomeCard;
