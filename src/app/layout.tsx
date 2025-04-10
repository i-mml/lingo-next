import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import { dana, vazirMatnRD } from "./fonts";

export const metadata: Metadata = {
  title: "زبانو - یادگیری زبان با هوش مصنوعی و فیلم و سریال و انیمیشن",
  description:
    "با کمک هوش مصنوعی و استفاده از فیلم و سریال ، انیمیشن ، موسیقی و کتاب صوتی زبان انگلیسی خودت رو به بالاترین سطح ارتقا بده.",
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
      <body className={`antialiased bg-backgroundMain`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
