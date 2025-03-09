import React, { ReactNode } from "react";
import QueryProvider from "./queryClient";
import ThemeRegistry from "../layout/theme-registry";
import { ThemeProvider } from "next-themes";
import I18nProvider from "./I18Provider";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <QueryProvider>
      <I18nProvider>
        <ThemeProvider defaultTheme="system" enableSystem>
          <ThemeRegistry>{children}</ThemeRegistry>
        </ThemeProvider>
      </I18nProvider>
    </QueryProvider>
  );
};

export default Providers;
