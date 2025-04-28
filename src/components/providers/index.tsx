import React, { ReactNode } from "react";
import QueryProvider from "./queryClient";
import ThemeRegistry from "../layout/theme-registry";
import { ThemeProvider } from "next-themes";
import I18nProvider from "./I18Provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProgressBarProvider from "./ProgressBar";
import ToastContainerWithConfig from "./ToastContainer";
import { CentrifugeProvider } from "@/context/CentrifugeContext";
import CentrifugeListener from "../CentrifugeListener";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <QueryProvider>
      <I18nProvider>
        <ThemeProvider defaultTheme="system" enableSystem>
          <GoogleOAuthProvider clientId="356373115221-48g3nfj11fta6i5kos6lni5c8qoh0c00.apps.googleusercontent.com">
            <ProgressBarProvider>
              <CentrifugeProvider>
                <ThemeRegistry>{children}</ThemeRegistry>
                <ToastContainerWithConfig />
                <CentrifugeListener />
              </CentrifugeProvider>
            </ProgressBarProvider>
          </GoogleOAuthProvider>
        </ThemeProvider>
      </I18nProvider>
    </QueryProvider>
  );
};

export default Providers;
