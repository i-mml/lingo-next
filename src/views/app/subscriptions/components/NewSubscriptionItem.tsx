"use client";

import PrimaryButton from "@/components/shared/PrimaryButton";
import Image from "next/image";
import React, { useState } from "react";
import ConfirmSubscriptionModal from "./ConfirmSubscriptionModal";
import { useLoginModal } from "@/store/use-login-modal";
import { useAuth } from "@/hooks/use-auth";

const NewSubscriptionItem = ({
  rules,
  image,
  packages,
  description,
  title,
  isRedirecting,
  handleGetGateWay,
}: {
  title: string;
  description: string;
  rules: { title: string; descriptoin: string }[];
  image: string;
  handleGetGateWay: (url: string) => void;
  isRedirecting: boolean;
  packages: {
    title: string;
    price: number;
    id: number;
    discount_percent: number | null;
    gateway_link: string;
    duration: number;
  }[];
  index: number;
}) => {
  const [discountModal, setDiscountModal] = useState(false);
  const [modalData, setModalData] = useState<any>();
  const { isGuest } = useAuth();
  const { isOpen, toggleLoginModal } = useLoginModal();
  const toggleModal = () => setDiscountModal((prev) => !prev);

  return (
    <div className="mb-7 lg:mb-16">
      <div className="flex items-center">
        <Image
          className="w-9 h-9"
          width={36}
          height={36}
          alt={title || ""}
          src={image}
        />
        <div className="mr-6 text-main">
          <h2 className="text-lg lg:text-2xl">{title}</h2>
          <h4 className="text-sm lg:text-[16px] mt-1">{description}</h4>
        </div>
      </div>
      <div>
        <ul className="px-[8%] py-3 lg:py-6 border border-main rounded-xl my-4 lg:my-8">
          {rules?.map((item, index) => (
            <li
              className="text-sm lg:text-[16px] text-main leading-8 list-disc"
              key={index}
            >
              {item?.title}
            </li>
          ))}
        </ul>
        <div className="grid grid-cols-1 lg:grid-cols-3 text-main gap-5 lg:gap-6">
          {packages
            ?.sort((a: any, b: any) => a.duration - b.duration)
            ?.map((item) => (
              <div
                key={item?.id}
                className="relative py-3 lg:py-6 px-4 border border-main flex lg:flex-col justify-center items-center rounded-xl"
              >
                <div className="flex flex-col flex-1 justify-center lg:items-center">
                  <h3 className="text-lg lg:text-2xl">
                    {item?.title}{" "}
                    {item?.discount_percent ? (
                      <span className="bg-[#FFD7D9] text-[#A2191F] text-[12px] lg:text-sm py-0.5 px-2 rounded-xl">
                        {item?.discount_percent}%
                      </span>
                    ) : null}
                  </h3>
                  <div className="text-sm lg:text-2xl mt-3">
                    {Number(item?.price)?.toLocaleString()}{" "}
                    <span className="text-sm text-[16px]">تومان</span>
                  </div>
                </div>
                <PrimaryButton
                  className="lg:mt-4 w-[40%] lg:w-[60%]"
                  onClick={() => {
                    if (isGuest) {
                      toggleLoginModal();
                    } else {
                      setModalData(item);
                      toggleModal();
                    }
                  }}
                >
                  خرید
                </PrimaryButton>
                {item?.duration === 180 && (
                  <div className="absolute top-[-12px] bg-primary rounded-full py-1 px-2 font-medium text-sm lg:text-[16px]">
                    پرفروش ترین
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <ConfirmSubscriptionModal
        handleRedirectToGateway={(discountCode) =>
          handleGetGateWay(
            discountCode
              ? modalData?.gateway_link + `?discount_code=${discountCode}`
              : modalData?.gateway_link
          )
        }
        open={discountModal}
        toggleModal={toggleModal}
        modalData={modalData}
        isRedirecting={isRedirecting}
      />
    </div>
  );
};

export default NewSubscriptionItem;
