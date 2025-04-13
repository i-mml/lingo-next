import React, { ReactNode } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import clsx from "clsx";

interface IProps {
  children: ReactNode;
}

const OnBoardCard = (props: IProps) => {
  const { children } = props;
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isLg = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <div className="w-full min-h-screen grid place-items-center p-[48px_5%_24px]">
      <div className={clsx("w-full md:w-[70%] h-full grid place-items-center")}>
        <div
          className={clsx(
            "relative rounded-[16px] mx-auto w-[88.88%] md:w-[45%] min-w-[330px] md:max-w-[450px]"
          )}
        >
          <div className="rounded-[16px] border border-borderMain bg-backgroundMain shadow-[0px_0px_224px_rgba(0,0,0,0.4)] relative z-[100] text-center px-2 py-6 md:p-6 transition-[0.8s] animate-[slideDown_0.8s_ease-out,fade_0.6s_ease-in]">
            {children}
          </div>
          {!isMd && (
            <>
              <img
                alt="onboard-card"
                src="/images/on-boarding-card.png"
                className="absolute z-10 top-[8%] h-[88%] w-full right-[35%]"
                style={{ transform: "rotateX(180deg)" }}
              />
              <img
                alt="onboard-card"
                src="/images/on-boarding-card.png"
                className="absolute z-10 top-[8%] h-[88%] w-full left-[35%]"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnBoardCard;
