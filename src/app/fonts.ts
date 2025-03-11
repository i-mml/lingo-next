// app/fonts.ts
import localFont from "next/font/local";

export const dana = localFont({
  src: [
    {
      path: "./fonts/dana/Dana-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/dana/Dana-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/dana/Dana-Bold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-dana",
  display: "swap",
});
