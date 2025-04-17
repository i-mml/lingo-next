import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import { dana, vazirMatnRD } from "./fonts";
import dynamic from "next/dynamic";

// Dynamically import the PWA install prompt component to avoid SSR issues
const PWAInstallPrompt = dynamic(
  () => import("@/components/PWAInstallPrompt"),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "زبانو - یادگیری زبان با هوش مصنوعی و فیلم و سریال و انیمیشن",
  description:
    "با کمک هوش مصنوعی و استفاده از فیلم و سریال ، انیمیشن ، موسیقی و کتاب صوتی زبان انگلیسی خودت رو به بالاترین سطح ارتقا بده.",
  manifest: "/manifest.json",
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Zabano",
  },
  applicationName: "Zabano",
  formatDetection: {
    telephone: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${vazirMatnRD.className} ${dana.className}`}
    >
      <head>
        <link rel="apple-touch-icon" href="/zabano-main-logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`antialiased bg-backgroundMain`}>
        <Providers>
          {children}
          <PWAInstallPrompt />
        </Providers>
      </body>
    </html>
  );
}
