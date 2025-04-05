import useThemeCreator from "@/hooks/use-theme";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import React from "react";
import CustomModal from "../shared/CustomModal";
import OutlineButton from "../shared/OutlineButton";
import Link from "next/link";
import PrimaryButton from "../shared/PrimaryButton";

const SubscriptionModal = ({
  open,
  toggleModal,
  firstText = "",
  secondText,
  secondClick,
  title = "",
  description = "",
  alsoText = "",
  submitHandler = () => {},
}: any) => {
  const { theme }: any = useThemeCreator();
  return (
    <CustomModal open={open} toggle={toggleModal}>
      <div>
        <div className="flex items-center justify-center gap-2 pt-2">
          <AutoAwesomeIcon
            style={{
              color: theme.palette.text?.primary,
            }}
          />
          <h3 className="text-main text-lg lg:text-2xl font-semibold">
            {title || "خرید اشتراک"}
          </h3>
        </div>
        <p className="text-main text-[16px] lg:text-lg mt-5 text-center">
          {description || "برای دسترسی به این بخش میبایست اشتراک تهیه کنید."}
        </p>

        {alsoText && (
          <p className="text-gray400 text-sm lg:text-[16px] mt-5 text-center">
            {alsoText || ""}
          </p>
        )}

        <div className="flex items-center gap-4 mt-8">
          <OutlineButton
            onClick={secondClick ? () => secondClick() : () => toggleModal()}
            className="w-[50%]"
          >
            {secondText || "بستن"}
          </OutlineButton>
          {!submitHandler ? (
            <Link href="/app/subscriptions" className="w-[50%]">
              <PrimaryButton onClick={() => {}} className="w-full">
                {firstText || "خرید اشتراک"}
              </PrimaryButton>
            </Link>
          ) : (
            <PrimaryButton onClick={submitHandler} className="w-[50%]">
              {firstText || "خرید اشتراک"}
            </PrimaryButton>
          )}
        </div>
      </div>
    </CustomModal>
  );
};

export default SubscriptionModal;
