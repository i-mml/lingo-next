import DashboardLayout from "@/components/layout/dashboard-layout";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
