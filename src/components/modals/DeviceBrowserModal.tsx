import React from "react";
import { isIOS } from "react-device-detect";
import CustomModal from "../shared/CustomModal";
import Image from "next/image";
import PrimaryButton from "../shared/PrimaryButton";

interface IProps {
  open: boolean;
  toggleModal: () => void;
  page: "LOGIN" | "ROOT" | "";
}

const modalTitleGenerator = {
  LOGIN: {
    title: "راهنمای ورود با گوگل",
    description:
      "برای ورود با استفاده از گوگل ، لازم است از مرورگر اصلی دستگاه خود استفاده کنید.",
  },
  ROOT: {
    title: "استفاده بهتر از سایت با مرورگر اصلی",
    description:
      "برای تجربه کاربری بهتر ، حتما از مرورگر اصلی خود استفاده کنید",
  },
  "": { title: "", description: "" },
};

const DeviceBrowserModal = ({ open, toggleModal, page }: IProps) => {
  return (
    <CustomModal open={open} toggle={toggleModal}>
      <div className="lg:min-w-[600px] px-[5%]">
        <h2 className="text-main text-lg lg:text-xl text-center font-semibold mb-6">
          {modalTitleGenerator?.[page]?.title}
        </h2>

        <img
          alt="screen shots"
          className="max-w-[280px] my-6 mx-auto rounded-lg"
          src={
            isIOS
              ? "/images/ios_instagram_shot.PNG"
              : "/images/android_instagram_shot.jpg"
          }
        />

        <p className="text-main text-[16px] lg:text-lg">
          {modalTitleGenerator?.[page]?.description}
        </p>

        <p className="font-medium mt-5 text-[16px} lg:text-lg mt-5 text-main">
          لطفا روی سه‌نقطه‌ی بالای صفحه کلیک کنید و گزینه{" "}
          <span className="text-lg lg:text-xl font-bold">
            {isIOS ? `"Open in external browser"` : `"Open in Chrome"`}
          </span>{" "}
          را انتخاب کرده و سپس اقدام به ورود/ثبت نام کنید.
        </p>

        <PrimaryButton
          className="mt-7 w-full lg:w-[40%] mx-auto block"
          onClick={toggleModal}
        >
          متوجه شدم
        </PrimaryButton>
      </div>
    </CustomModal>
  );
};

export default DeviceBrowserModal;
