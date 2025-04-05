import React, { ReactNode } from "react";

interface IProps {
  icon: ReactNode;
  className?: string;
  value?: string;
  onClick?: () => void;
}

const ProfileLanguageButton = (props: IProps) => {
  const { icon, value, onClick, className } = props;
  return (
    <div className={className} onClick={onClick}>
      <div
        className={`profile-language-button flex items-center w-full gap-2 border border-borderMain rounded-lg h-12 py-3 px-4 cursor-pointer hover:border-gray400`}
      >
        <div className="icon w-6 h-6">{icon}</div>
        <div className="content-text h-full bg-transparent border-none outline-none text-main">
          {value}
        </div>
      </div>
    </div>
  );
};

export default ProfileLanguageButton;
