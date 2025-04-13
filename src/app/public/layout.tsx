import DashboardLayout from "@/components/layout/dashboard-layout";
import { PublicRouteSEO } from "@/components/seo/PublicRouteSEO";
import { getPublicRouteMetadata } from "@/utils/seo";
import React from "react";

interface PublicLayoutProps {
  children: React.ReactNode;
  params: {
    route: string;
  };
}

const Layout = ({ children, params }: PublicLayoutProps) => {
  const route = `/public/${params.route}`;
  const metadata = getPublicRouteMetadata(route);

  return (
    <>
      <PublicRouteSEO
        route={route}
        title={metadata.title}
        description={metadata.description}
        keywords={metadata.keywords}
        type={metadata.type}
        image="/zabano-main-logo.png"
      />
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
};

export default Layout;
