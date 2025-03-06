import React, { ReactNode } from "react";
import QueryProvider from "./queryClient";
import ThemeRegistry from "../layout/theme-registry";
import { ThemeProvider } from "next-themes";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="system" enableSystem>
        <ThemeRegistry>{children}</ThemeRegistry>
      </ThemeProvider>
    </QueryProvider>
  );
};

export default Providers;
