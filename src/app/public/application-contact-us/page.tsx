import ApplicationContactUs from "@/views/application-contact-us";
import React from "react";
import { Metadata } from "next";

const ApplicationContactUsPage = () => {
  return <ApplicationContactUs />;
};

export default ApplicationContactUsPage;

export const metadata: Metadata = {
  title: "تماس با پشتیبانی زبانو | آموزش زبان با فیلم و سریال",
  description:
    "تماس با تیم پشتیبانی زبانو برای راهنمایی و پاسخ به سوالات شما در زمینه یادگیری زبان انگلیسی با فیلم و سریال. پشتیبانی 24 ساعته برای کاربران زبانو.",
  keywords: [
    "پشتیبانی زبانو",
    "تماس با زبانو",
    "راهنمایی زبانو",
    "پشتیبانی آموزش زبان",
    "سوالات زبانو",
    "پشتیبانی آنلاین زبان",
    "راهنمای کاربری زبانو",
    "آموزش زبان آنلاین",
    "یادگیری زبان رایگان",
  ],
  alternates: {
    canonical: "https://zabano.com/public/application-contact-us",
  },
  openGraph: {
    title: "تماس با پشتیبانی زبانو | آموزش زبان با فیلم و سریال",
    description:
      "تماس با تیم پشتیبانی زبانو برای راهنمایی و پاسخ به سوالات شما در زمینه یادگیری زبان انگلیسی.",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com/public/application-contact-us",
    images: [
      {
        url: "https://zabano.com/zabano-main-logo.png",
        width: 1200,
        height: 630,
        alt: "تماس با پشتیبانی زبانو",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "تماس با پشتیبانی زبانو | آموزش زبان با فیلم و سریال",
    description: "پشتیبانی 24 ساعته برای کاربران زبانو",
    images: ["https://zabano.com/zabano-main-logo.png"],
  },
};
