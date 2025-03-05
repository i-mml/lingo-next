import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center bg-backgroundLayout mx-auto  ">
      {children}
    </div>
  );
};

export default DashboardLayout;
