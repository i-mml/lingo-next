"use client";

import React from "react";
import CustomModal from "./shared/CustomModal";
import Link from "next/link";
import PrimaryButton from "./shared/PrimaryButton";
import Image from "next/image";
import ShowMore from "./shared/ShowMore";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  eventData: {
    cta: {
      link: string;
      title: string;
    };
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
          className="w-full h-full object-cover rounded-lg my-5"
        />
        <ShowMore
          text={eventData?.description}
          maxLength={250}
          className="text-sm"
          textClassName="text-sm"
          lineClampClassName="!line-clamp-5"
        />
        <Link
          href={eventData?.cta?.link}
          className="block mt-5 w-full max-w-md mx-auto"
        >
          <PrimaryButton className="w-full" onClick={() => onClose()}>
            {eventData?.cta?.title}
          </PrimaryButton>
        </Link>
      </div>
    </CustomModal>
  );
};

export default GlobalActionModal;
