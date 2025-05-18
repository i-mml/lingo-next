import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import { dana, vazirMatnRD } from "./fonts";
import Head from "next/head";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "زبانو - یادگیری زبان با هوش مصنوعی و فیلم و سریال و انیمیشن",
  description:
    "با کمک هوش مصنوعی و استفاده از فیلم و سریال ، انیمیشن ، موسیقی و کتاب صوتی زبان انگلیسی خودت رو به بالاترین سطح ارتقا بده.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Zabano",
  },
  applicationName: "Zabano",
  formatDetection: {
    telephone: false,
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
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-N798SLPP40"
        ></script>
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
              }(window, document, "yektanet");
    
                  // clarity
                        if (!window.location?.href?.includes("localhost"))
            (function (c, l, a, r, i, t, y) {
                 c[a] =
                   c[a] ||
                   function () {
                     (c[a].q = c[a].q || []).push(arguments);
                           };
                         t = l.createElement(r);
                     t.async = 1;
                     t.src = "https://www.clarity.ms/tag/" + i;
                     y = l.getElementsByTagName(r)[0];
                     y.parentNode.insertBefore(t, y);
                })(window, document, "clarity", "script", "op879p6wdq");
                    
                      // Goftino
                      !function(){var i="cuNGrp",a=window,d=document;function g(){var g=d.createElement("script"),s="https://www.goftino.com/widget/"+i,l=localStorage.getItem("goftino_"+i);g.async=!0,g.src=l?s+"?o="+l:s;d.getElementsByTagName("head")[0].appendChild(g);}"complete"===d.readyState?g():a.attachEvent?a.attachEvent("onload",g):a.addEventListener("load",g,!1);}();

              `,
          }}
        />
      </head>
      <body className={`antialiased bg-backgroundMain`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
