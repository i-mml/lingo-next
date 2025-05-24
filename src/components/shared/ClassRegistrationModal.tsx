import CustomModal from "./CustomModal";
import OutlineButton from "./OutlineButton";
import PrimaryButton from "./PrimaryButton";
import React from "react";
import type { GroupClass } from "@/views/group-class-list";
import GroupClassInfoCard from "./GroupClassInfoCard";
import { CheckOutlined } from "@mui/icons-material";
import WaveLoading from "./WaveLoading";

const ClassRegistrationModal = ({
  open,
  toggleModal,
  onConfirm,
  paymentLink,
  course,
  children,
  isRedirecting,
}: {
  open: boolean;
  toggleModal: () => void;
  onConfirm?: (paymentLink: string) => void;
  paymentLink?: string | null;
  course?: GroupClass | null;
  children?: React.ReactNode;
  isRedirecting?: boolean;
}) => {
  return (
    <CustomModal open={open} toggle={toggleModal}>
      <div className="lg:min-w-[400px] pb-10 lg:pb-0">
        <h2 className="font-bold text-main text-xl lg:text-2xl text-center mb-8">
          ثبت نام در کلاس
        </h2>
        {course && <GroupClassInfoCard course={course} variant="modal" />}
        {children}
        <div className="flex items-center justify-center mt-8 pb-6 gap-4">
          <OutlineButton onClick={toggleModal} className="w-1/2">
            بستن
          </OutlineButton>
          {paymentLink && onConfirm && (
            <PrimaryButton
              onClick={() => onConfirm(paymentLink)}
              className="w-1/2"
              buttonProps={{
                disabled: isRedirecting,
              }}
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
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default ClassRegistrationModal;
