import React from "react";

import { useTranslation } from "react-i18next";
import BackIcon from "@/assets/arrow-right.svg";

interface IProp {
  clickHandler: () => void;
  className: string;
}

const BackIconComponent = (props: IProp) => {
  const { clickHandler, className = "" } = props;

  const { t: translate } = useTranslation();

  return (
    <div
      className={`flex gap-1 text-gray400 cursor-pointer ${className || ""}`}
      onClick={clickHandler}
    >
      <BackIcon /> <span>{translate("defaults.container.Back Icon")}</span>
    </div>
  );
};

export default BackIconComponent;
