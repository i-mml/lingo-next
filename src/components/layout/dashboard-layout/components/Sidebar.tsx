"use client";

import { useAuth } from "@/hooks/useAuth";
import React from "react";

const Sidebar = () => {
  const { whoAmI } = useAuth();
  return (
    <div
      className="w-[236px] md:w-[180px] hidden lg:block sticky left-0 top-0 z-[99] bg-layout"
      style={{
        boxShadow: "7px 0 12px 0 rgba(0, 0, 0, 0.1)",
      }}
    >
      {whoAmI?.phone} Sidebar
    </div>
  );
};

export default Sidebar;
