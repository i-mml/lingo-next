import React, { ReactNode } from "react";

interface IProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const HeroItem = (props: IProps) => {
  const { description, icon, title } = props;

  return (
    <div className="bg-backgroundMain py-3 lg:py-8 px-1 lg:px-6 rounded-lg shadow-sm text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-sm   lg:text-lg font-semibold mb-2 text-main">
        {title}
      </h3>
      <p className="text-gray400 hidden lg:block">{description}</p>
    </div>
  );
};

export default HeroItem;
