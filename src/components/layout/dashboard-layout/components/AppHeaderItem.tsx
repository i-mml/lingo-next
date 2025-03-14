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
    <div className="app-header-left-item">
      <div className="top-box" style={{ color: color }}>
        {icon}
        <span className="value">{value}</span>
      </div>
      <div className="app-header-left-item-title">{title}</div>
    </div>
  );
};

export default AppHeaderItem;
