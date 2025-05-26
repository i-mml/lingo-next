import React from "react";
import LeftArrow from "@/assets/left-arrow.svg";
import PrimaryButton from "@/components/shared/PrimaryButton";
import WaveLoading from "@/components/shared/WaveLoading";

interface IProps {
  step: number;
  handleNextAction: () => void;
  selected: string | undefined;
  isLoading?: boolean;
}

const OnBoardBottomNav = (props: IProps) => {
  const { step, selected, handleNextAction, isLoading = false } = props;

  return (
    <div className="flex items-center gap-2.5 onboard-buttom">
      {/* <DotSteps step={step} /> */}
      <div className="flashcard-modal-footer flex-1" dir="ltr">
        <div className="flashcrds-length-box w-[91.1%] md:w-full mx-auto md:mx-0 rounded-lg border border-borderMain bg-backgroundMain py-2 px-3 flex items-center gap-3">
          <span className="length-number text-[#e5e7eb] text-base font-semibold">{`${step}/${10}`}</span>

          <div className="length-progress-wrapper w-full bg-[#262626] h-2 rounded-[200px]">
            <span
              className="length-progress block bg-[#e28f00] h-2 rounded-[200px]"
              style={{ width: `${(step / 10) * 100}%` }}
            ></span>
          </div>
        </div>
      </div>
      <PrimaryButton
        className="w-[120px] flex items-center justify-center"
        onClick={handleNextAction}
        buttonProps={{
          disabled: !selected || isLoading,
        }}
      >
        {isLoading ? (
          <WaveLoading />
        ) : (
          <div className="flex">
            <span>{step !== 10 ? "بعدی" : "شروع"}</span>
            <LeftArrow />
          </div>
        )}
      </PrimaryButton>
    </div>
  );
};

export default OnBoardBottomNav;
