import React, { ReactNode } from "react";
import Sidebar from "./components/Sidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center bg-backgroundLayout mx-auto  ">
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;
