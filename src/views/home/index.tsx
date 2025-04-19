"use client";

import { motion } from "framer-motion";
import React from "react";
import { isMobile } from "react-device-detect";

import HomeCard from "./components/HomeCard";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

const HomeView = () => {
  const { whoAmI, hasSubscription, isGuest } = useAuth();

  let cards = [
    {
      title: "انیمیشن‌ها",
      image: "/images/froz3.JPG",
      description: "انیمیشن مخصوص یادگیری زبان در سطح های پایین تره",
      link: `/public/animations`,
      hide: false,
    },
    {
      title: "فیلم و سریال",
      image: "/images/harry2.JPG",
      description:
        "با دیدن فیلم و سریال سطح زبانت رو با بالاترین سرعت ارتقا بده",
      link: `/public/catalog`,
      hide: false,
    },
    {
      title: "پادکست",
      image: "/images/podcast.png",
      description: "با پادکست هوای روح و زبانت رو باهم داری",
      link: `/public/podcast-list`,
      hide: !isGuest && whoAmI?.userpreference?.preferred_language !== 2,
    },
    {
      title: "کتاب صوتی",
      image: "/images/bk3.JPG",
      description: "با کتاب های صوتی هم داستان های شیرین گوش بده هم یاد بگیر",
      link: `/public/audio-book`,
      hide: false,
    },
    {
      title: "پادکست",
      image: "/images/billi.JPG",
      description: "پادکست و موسیقی راهی برای رسیدن به لیسنینگ عالی",
      link: `/public/music-list`,
      hide: !isGuest && whoAmI?.userpreference?.preferred_language !== 2,
    },
    {
      title: "واژه آموزی",
      image: "/images/vocabulary.png",
      description: "یادگیری لغات با کتاب‌های مختص لغات",
      link: `/public/vocabulary`,
      hide: !isGuest && whoAmI?.userpreference?.preferred_language !== 2,
    },
    {
      title: "گرامر",
      image: "/images/gram.JPG",
      description:
        "هر گرامری که لازم داری رو خیلی سریع یاد بگیر و اصولی صحبت کن",
      link: `/public/grammar-list`,
      hide: !isGuest && whoAmI?.userpreference?.preferred_language !== 2,
    },
  ];

  if (!hasSubscription) {
    cards.unshift({
      title: "رایگان بیاموز",
      image: "/images/luca2.JPG",
      description: "اینجا بهترین نقطه شروع برای یادگیریه",
      link: `/public/start-free`,
      hide: false,
    });
  }

  return (
    <div className="px-[5%] grid grid-cols-1 lg:grid-cols-2 gap-4 py-10">
      {cards.map((card, index) => (
        <Link key={index} href={card.hide ? "" : card.link}>
          <motion.div
            initial={{ opacity: 0, y: 100 }} // Initial position and opacity
            animate={{ opacity: 1, y: 0 }} // Animate to visible and true position
            transition={{
              duration: isMobile ? 0.9 : 0.4,
              delay: isMobile ? 0.2 : index * 0.4, // Stagger animation based on the index
            }}
          >
            <HomeCard {...card} />
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default HomeView;
