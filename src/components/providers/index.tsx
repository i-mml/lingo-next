import React, { ReactNode } from "react";
import QueryProvider from "./queryClient";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default Providers;
