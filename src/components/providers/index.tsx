import React, { ReactNode } from "react";
import QueryProvider from "./queryClient";
import ThemeRegistry from "../layout/theme-registry";
import { ThemeProvider } from "next-themes";
import I18nProvider from "./I18Provider";
import { GoogleOAuthProvider } from "@react-oauth/google";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <QueryProvider>
      <I18nProvider>
        <ThemeProvider defaultTheme="system" enableSystem>
          <GoogleOAuthProvider clientId="356373115221-48g3nfj11fta6i5kos6lni5c8qoh0c00.apps.googleusercontent.com">
            <ThemeRegistry>{children}</ThemeRegistry>
          </GoogleOAuthProvider>
        </ThemeProvider>
      </I18nProvider>
    </QueryProvider>
  );
};

export default Providers;
