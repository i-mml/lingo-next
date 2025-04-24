import { Metadata } from "next";
import NewHomeView from "@/views/home/NewHome";

const HomePage = () => {
  return <NewHomeView />;
};

export default HomePage;

export const metadata: Metadata = {
  title: "یادگیری زبان انگلیسی با فیلم و سریال | زبانو",
  description:
    "یادگیری زبان انگلیسی با فیلم و سریال به کمک هوش مصنوعی. دسترسی به هزاران فیلم و سریال با زیرنویس فارسی و انگلیسی. آموزش زبان به صورت تعاملی و جذاب.",
  keywords: [
    "یادگیری زبان انگلیسی",
    "آموزش زبان با فیلم",
    "یادگیری زبان با سریال",
    "آموزش زبان آنلاین",
    "یادگیری زبان رایگان",
    "آموزش زبان با هوش مصنوعی",
    "زبان انگلیسی",
    "فیلم آموزش زبان",
    "سریال آموزش زبان",
  ],
  alternates: {
    canonical: "https://zabano.com",
  },
  openGraph: {
    title: "یادگیری زبان انگلیسی با فیلم و سریال | زبانو",
    description:
      "یادگیری زبان انگلیسی با فیلم و سریال به کمک هوش مصنوعی. دسترسی به هزاران فیلم و سریال با زیرنویس فارسی و انگلیسی.",
    type: "website",
    locale: "fa_IR",
    url: "https://zabano.com",
    images: [
      {
        url: "https://zabano.com/zabano-main-logo.png",
        width: 1200,
        height: 630,
        alt: "یادگیری زبان انگلیسی با زبانو",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "یادگیری زبان انگلیسی با فیلم و سریال | زبانو",
    description: "یادگیری زبان انگلیسی به روشی جذاب و موثر با فیلم و سریال",
    images: ["https://zabano.com/zabano-main-logo.png"],
  },
};
