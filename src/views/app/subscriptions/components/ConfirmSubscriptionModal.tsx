"use client";

import { postPaymentDiscountValidate } from "@/api/services/payment";
import CustomModal from "@/components/shared/CustomModal";
import InputWithIcon from "@/components/shared/InputWithIcon";
import OutlineButton from "@/components/shared/OutlineButton";
import PrimaryButton from "@/components/shared/PrimaryButton";
import WaveLoading from "@/components/shared/WaveLoading";
import { CheckOutlined } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

const ConfirmSubscriptionModal = ({
  open,
  toggleModal,
  modalData,
  isRedirecting,
  handleRedirectToGateway,
}: {
  open: boolean;
  toggleModal: () => void;
  modalData: any;
  isRedirecting: boolean;
  handleRedirectToGateway: (discountCode?: string) => void;
}) => {
  const [discountCode, setDiscountCode] = useState("");
  const [discountedData, setDiscountedData] = useState({
    discount: null,
    discounted_price: null,
    original_price: null,
  });

  const validateDiscountMutation = useMutation({
    mutationKey: ["discount-code-validate"],
    mutationFn: (body: any) =>
      postPaymentDiscountValidate(body).then((res) => {
        if (!!res?.data?.discount) {
          setDiscountedData(res?.data);
        } else {
          console.log("err");
        }
      }),
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    validateDiscountMutation.mutateAsync({
      discount_code: discountCode,
      package_id: modalData?.id,
    });
  };

  const resetModalStates = () => {
    setDiscountedData({
      discount: null,
      discounted_price: null,
      original_price: null,
    });
    setDiscountCode("");
    validateDiscountMutation.reset();
  };

  return (
    <CustomModal
      open={open}
      toggle={() => {
        resetModalStates();
        toggleModal();
      }}
    >
      <div className="lg:min-w-[500px] pb-20 lg:pb-0">
        <h2 className="font-bold text-main text-xl lg:text-2xl text-center mb-8">
          تایید و پرداخت
        </h2>
        <div className="lg:w-[92%] mx-auto border border-gray300 rounded-xl py-3 px-4">
          <div className="flex items-center justify-between">
            <div className="text-gray400 font-medium text-[16px] lg:text-lg">
              اشتراک
            </div>
            <div className="font-semibold text-main text-lg lg:text-xl">
              {modalData?.title}
            </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            <div className="text-gray400 font-medium text-[16px] lg:text-lg">
              قیمت
            </div>
            <div
              className={`relative font-semibold text-main ${
                discountedData?.discounted_price
                  ? "text-[16px] lg:text-lg !text-gray-500"
                  : "text-lg lg:text-xl"
              }`}
            >
              {Number(modalData?.price)?.toLocaleString()} ت
              {discountedData?.discounted_price && (
                <div className="w-full h-[1px] border border-red-500 absolute top-[50%]"></div>
              )}
            </div>
          </div>
          {discountedData?.discounted_price && (
            <div
              className={"font-semibold text-main text-end text-lg lg:text-xl"}
            >
              {Number(discountedData?.discounted_price)?.toLocaleString()} ت
            </div>
          )}
        </div>

        <div className="lg:w-[92%] mx-auto mt-5">
          <div className="text-gray400 font-medium text-[16px] lg:text-lg mb-4">
            کد تخفیف
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="w-full relative grid place-items-center">
              <InputWithIcon
                icon={null}
                className="w-[100%]"
                inputProps={{
                  value: discountCode,
                  onChange: (e) => setDiscountCode(e.target.value),
                  placeholder: "*********",
                  type: "text",
                  name: "discount_code",
                }}
              />
              <PrimaryButton
                buttonProps={{ type: "submit" }}
                onClick={() => {}}
                className="absolute left-[-2px] z-[20] w-20 lg:w-28"
              >
                ثبت
              </PrimaryButton>
            </div>
          </form>
          {discountedData?.discount && (
            <div className="mt-2 text-green-600 text-sm">
              کد تخفیف با موفقیت اعمال شد.
            </div>
          )}
        </div>

        <div className="lg:w-[92%] mx-auto flex items-center gap-4 mt-8">
          <OutlineButton
            onClick={() => {
              toggleModal();
              resetModalStates();
            }}
            className="w-[50%]"
            buttonProps={{ disabled: isRedirecting }}
          >
            بستن
          </OutlineButton>
          <PrimaryButton
            onClick={() =>
              handleRedirectToGateway(
                discountedData?.discount ? discountCode : ""
              )
            }
            className="w-[50%] flex items-center gap-1 justify-center"
            buttonProps={{ disabled: isRedirecting }}
          >
            {isRedirecting ? (
              <>
                <WaveLoading />
              </>
            ) : (
              <>
                <CheckOutlined className="text-2xl" />
                تایید و پرداخت
              </>
            )}
          </PrimaryButton>
        </div>
      </div>
    </CustomModal>
  );
};

export default ConfirmSubscriptionModal;
