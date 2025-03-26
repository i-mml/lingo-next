import React, { ReactNode } from "react";

const AppHeaderItem = ({
  title,
  value,
  icon,
  color,
}: {
  title?: string;
  value: string;
  icon: ReactNode;
  color: string;
}) => {
  return (
    <div className="md:mx-3">
      <div className="flex items-center gap-2 mb-1" style={{ color: color }}>
        {icon}
        <span className="text-[12px] md:text-lg ml-1">{value}</span>
      </div>
      <div className="text-gray400">{title}</div>
    </div>
  );
};

export default AppHeaderItem;
