import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import { dana, vazirMatnRD } from "./fonts";
import Head from "next/head";

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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/zabano-main-logo.png", sizes: "192x192", type: "image/png" },
      { url: "/zabano-main-logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/zabano-main-logo.png" }],
    shortcut: [{ url: "/favicon.ico" }],
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
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        <script
          id="ua-script-5WRQkwDn"
          dangerouslySetInnerHTML={{
            __html: `!function (t, e, n) {
                  t.yektanetAnalyticsObject = n, t[n] = t[n] || function () {
                      t[n].q.push(arguments)
                  }, t[n].q = t[n].q || [];
                  var a = new Date, r = a.getFullYear().toString() + "0" + a.getMonth() + "0" + a.getDate() + "0" + a.getHours(),
                      c = e.getElementsByTagName("script")[0], s = e.createElement("script");
                  s.id = "ua-script-5WRQkwDn"; s.dataset.analyticsobject = n;
                  s.async = 1; s.type = "text/javascript";
                  s.src = "https://cdn.yektanet.com/rg_woebegone/scripts_v3/5WRQkwDn/rg.complete.js?v=" + r, c.parentNode.insertBefore(s, c)
              }(window, document, "yektanet");`,
          }}
        />
      </head>
      <body className={`antialiased bg-backgroundMain`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
