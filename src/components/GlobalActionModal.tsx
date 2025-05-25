"use client";

import React from "react";
import CustomModal from "./shared/CustomModal";
import Link from "next/link";
import PrimaryButton from "./shared/PrimaryButton";
import Image from "next/image";
import ShowMore from "./shared/ShowMore";
import OutlineButton from "./shared/OutlineButton";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  eventData: {
    cta_data: {
      link: string;
      title: string;
    };
    cta: string;
    description: string;
    event_type: "public";
    image: string;
    title: string;
  };
}

const GlobalActionModal = ({ open, onClose, eventData }: ModalProps) => {
  if (!open) return null;
  return (
    <CustomModal open={open} toggle={onClose}>
      <div className="pt-4 pb-6 md:py-5 md:min-w-[50%] min-h-[60vh]">
        <h2 className="text-xl font-bold mb-2">{eventData?.title}</h2>
        <Image
          src={eventData?.image}
          alt={eventData?.title}
          width={100}
          height={100}
          className="w-full h-full object-cover rounded-lg my-5 max-w-80 mx-auto"
        />
        <ShowMore
          text={eventData?.description}
          maxLength={250}
          className="text-sm"
          textClassName="text-sm"
          lineClampClassName="!line-clamp-5"
        />
        <div className="flex items-center gap-4 mt-5 ">
          <Link
            href={eventData?.cta_data?.link}
            className="block w-full max-w-md mx-auto"
          >
            <PrimaryButton className="w-full" onClick={() => onClose()}>
              {eventData?.cta_data?.title}
            </PrimaryButton>
          </Link>
          <OutlineButton className="w-1/2" onClick={onClose}>
            بستن
          </OutlineButton>
        </div>
      </div>
    </CustomModal>
  );
};

export default GlobalActionModal;
