import useThemeCreator from "@/hooks/use-theme";
import { IOnboardData } from "@/types/on-boarding";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Lottie from "lottie-react";
import React, { Dispatch, SetStateAction } from "react";
import OnBoardCard from "../OnBoardCard";
import BackIconComponent from "@/components/shared/BackIconComponent";
import { requestForToken } from "@/app/firebase";
import OnBoardBottomNav from "../OnBoardBottomNav";
import Messaging from "@/assets/lotties/messaging-linear.json";

interface IProps {
  step: number;
  setOnBoardData: Dispatch<SetStateAction<IOnboardData>>;
  nextAction: () => void;
  prevAction: () => void;
}

const EnableNotification = (props: IProps) => {
  const { step, nextAction, prevAction } = props;

  const { theme }: any = useThemeCreator();

  return (
    <OnBoardCard>
      <BackIconComponent
        className="absolute top-[-34px] z-[999]"
        clickHandler={prevAction}
      />
      <div className="earth-icon">
        <Lottie
          animationData={Messaging}
          className="w-20 h-20 lg:w-22 lg:h-22 mx-auto"
        />
      </div>
      <div className="title w-[90%] mx-auto">
        بهت یادآوری میکنم تا مستمر تمرین کنی، دکمه ALLOW رو بزن
      </div>

      <div
        className="border border-gray-600 shadow-md shadow-gray-500 w-[90%] max-w-[360px] mx-auto rounded-lg py-4 px-5 mt-4 mb-6"
        dir="ltr"
      >
        <div className="text-main font-medium text-[16px] lg:text-lg text-left">
          www.zabano.com wants to
        </div>
        <div className="flex items-center gap-2 !justify-start">
          <NotificationsIcon style={{ color: theme.palette.text.main }} />{" "}
          <div className="text-left text-main text-[16px] lg:text-lg">
            Show notifications
          </div>
        </div>
        <div className="w-full flex items-center !justify-end gap-3 mt-3">
          <button className="text-gray-500 border border-gray-500 text-[16px] lg:text-lg font-bold rounded-md p-3">
            BLOCK
          </button>
          <button
            className="text-primary border border-gray-500 text-[16px] lg:text-lg font-bold rounded-md p-3"
            onClick={requestForToken}
          >
            ALLOW
          </button>
        </div>
      </div>

      <OnBoardBottomNav
        selected={"true"}
        step={step}
        handleNextAction={nextAction}
      />
    </OnBoardCard>
  );
};

export default EnableNotification;
