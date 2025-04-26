"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import GuestView from "./components/GuestView";

const NewHomeView = () => {
  const { isGuest } = useAuth();

  if (isGuest) {
    return <GuestView />;
  }

  return <AuthenticatedView />;
};

const AuthenticatedView = () => {
  return (
    <div className="min-h-screen bg-backgroundLayout">
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          {/* Continue Learning Section */}
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-2xl font-bold text-main">ادامه یادگیری</h2>
              <Link
                href="/learning-progress"
                className="text-primary hover:text-primary/80 transition-colors duration-300"
              >
                مشاهده همه
              </Link>
            </motion.div>
            <div className="relative group">
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={16}
                slidesPerView="auto"
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: false,
                  renderBullet: function (index, className) {
                    return `<span class="${className} !w-2 !h-2 !opacity-50 !transition-all !duration-300"></span>`;
                  },
                }}
                className="!pb-10 group/swiper"
              >
                {[
                  {
                    title: "Harry Potter",
                    type: "فیلم",
                    progress: 65,
                    lastPosition: "00:45:30",
                    thumbnail:
                      "https://statics-zabano.s3.ir-thr-at1.arvanstorage.ir/static/movies/images/7422b57a-80a9-4642-a366-664b720e1cfd.webp",
                  },
                  {
                    title: "Friends S01E05",
                    type: "سریال",
                    progress: 30,
                    lastPosition: "00:12:15",
                    thumbnail:
                      "https://statics-zabano.s3.ir-thr-at1.arvanstorage.ir/static/movies/images/7422b57a-80a9-4642-a366-664b720e1cfd.webp",
                  },
                  {
                    title: "Learn English with Stories",
                    type: "پادکست",
                    progress: 80,
                    lastPosition: "00:22:45",
                    thumbnail:
                      "https://statics-zabano.s3.ir-thr-at1.arvanstorage.ir/static/movies/images/7422b57a-80a9-4642-a366-664b720e1cfd.webp",
                  },
                  {
                    title: "Business English Course",
                    type: "دوره",
                    progress: 45,
                    lastPosition: "Section 3",
                    thumbnail:
                      "https://statics-zabano.s3.ir-thr-at1.arvanstorage.ir/static/movies/images/7422b57a-80a9-4642-a366-664b720e1cfd.webp",
                  },
                  {
                    title: "English Grammar Advanced",
                    type: "دوره",
                    progress: 25,
                    lastPosition: "Past Perfect",
                    thumbnail:
                      "https://statics-zabano.s3.ir-thr-at1.arvanstorage.ir/static/movies/images/7422b57a-80a9-4642-a366-664b720e1cfd.webp",
                  },
                ].map((item, index) => (
                  <SwiperSlide key={index} className="!w-[300px]">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="group bg-backgroundMain backdrop-blur-xl rounded-xl overflow-hidden border border-borderMain hover:border-primary cursor-pointer transition-all duration-300"
                    >
                      <div className="flex p-4 gap-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/20" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-main font-medium mb-1 truncate">
                            {item.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-gray400 mb-2">
                            <span>{item.type}</span>
                            <span>{item.lastPosition}</span>
                          </div>
                          <motion.div
                            className="w-full h-1 bg-gray-950/10 dark:bg-white/10 rounded-full overflow-hidden"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                          >
                            <motion.div
                              className="h-full bg-primary"
                              initial={{ width: 0 }}
                              animate={{ width: `${item.progress}%` }}
                              transition={{ duration: 1, delay: 0.6 }}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>

          {/* Recent Flashcards */}
          <section className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-6"
            >
              <h2 className="text-2xl font-bold text-main">
                فلش‌کارت‌های اخیر
              </h2>
              <Link
                href="/flashcards"
                className="text-primary hover:text-primary/80 transition-colors duration-300"
              >
                مشاهده همه
              </Link>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  word: "Extraordinary",
                  translation: "فوق‌العاده",
                  context: "This is an extraordinary achievement!",
                  source: "Harry Potter",
                  thumbnail:
                    "https://statics-zabano.s3.ir-thr-at1.arvanstorage.ir/static/movies/images/7422b57a-80a9-4642-a366-664b720e1cfd.webp",
                },
                {
                  word: "Determination",
                  translation: "اراده",
                  context: "His determination led to success.",
                  source: "Friends",
                },
                {
                  word: "Perspective",
                  translation: "دیدگاه",
                  context: "From my perspective, this is correct.",
                  source: "TED Talk",
                },
                {
                  word: "Accomplish",
                  translation: "به دست آوردن",
                  context: "We accomplished our goals.",
                  source: "Business Podcast",
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 10px 30px -10px rgba(var(--primary-rgb), 0.3)",
                  }}
                  className="group bg-backgroundMain rounded-xl overflow-hidden border border-gray-950/10 dark:border-white/10 hover:border-primary/30 cursor-pointer transition-all duration-300"
                >
                  <div className="relative h-24 overflow-hidden">
                    <img
                      src={card.thumbnail}
                      alt={card.word}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-backgroundMain to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <span className="text-sm text-gray400">
                        {card.source}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-main font-medium group-hover:text-primary transition-colors duration-300">
                        {card.word}
                      </h3>
                      <span className="text-primary text-sm whitespace-nowrap">
                        {card.translation}
                      </span>
                    </div>
                    <p className="text-gray400 text-sm line-clamp-2">
                      {card.context}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Learning Resources */}
          <section className="mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-main mb-6"
            >
              منابع یادگیری
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "504 واژه ضروری",
                  description: "یادگیری پرکاربردترین لغات انگلیسی",
                  progress: 45,
                  total: 504,
                  icon: "📚",
                },
                {
                  title: "گرامر پایه",
                  description: "آموزش ساختارهای اصلی زبان",
                  progress: 12,
                  total: 30,
                  icon: "📝",
                },
                {
                  title: "تلفظ حرفه‌ای",
                  description: "تمرین تلفظ صحیح کلمات",
                  progress: 8,
                  total: 20,
                  icon: "🗣️",
                },
              ].map((resource, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 10px 30px -10px rgba(var(--primary-rgb), 0.3)",
                  }}
                  className="group bg-backgroundMain rounded-xl overflow-hidden border border-gray-950/10 dark:border-white/10 hover:border-primary/30 cursor-pointer transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <motion.span
                          className="text-2xl"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                        >
                          {resource.icon}
                        </motion.span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-main font-medium group-hover:text-primary transition-colors duration-300 truncate">
                          {resource.title}
                        </h3>
                        <p className="text-gray400 text-sm truncate">
                          {resource.description}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <motion.div
                        className="w-full h-2 bg-gray-950/10 dark:bg-white/10 rounded-full overflow-hidden"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8 }}
                      >
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          whileInView={{
                            width: `${
                              (resource.progress / resource.total) * 100
                            }%`,
                          }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </motion.div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray400">
                          {resource.progress} از {resource.total}
                        </span>
                        <span className="text-primary">
                          {Math.round(
                            (resource.progress / resource.total) * 100
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Quick Tools */}
          <section>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-main mb-6"
            >
              ابزارهای سریع
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  title: "دیکشنری",
                  description: "جستجو در دیکشنری",
                  icon: "🔍",
                  link: "/dictionary",
                },
                {
                  title: "کوییز",
                  description: "آزمون سریع",
                  icon: "📝",
                  link: "/quiz",
                },
                {
                  title: "فلش‌کارت‌ها",
                  description: "مرور لغات",
                  icon: "🗂",
                  link: "/flashcards",
                },
                {
                  title: "گرامر",
                  description: "مرجع گرامر",
                  icon: "📖",
                  link: "/grammar",
                },
              ].map((tool, index) => (
                <Link href={tool.link} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{
                      y: -5,
                      boxShadow:
                        "0 10px 30px -10px rgba(var(--primary-rgb), 0.3)",
                    }}
                    className="group bg-backgroundMain rounded-xl overflow-hidden border border-gray-950/10 dark:border-white/10 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="p-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                        <motion.span
                          className="text-2xl"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                        >
                          {tool.icon}
                        </motion.span>
                      </div>
                      <h3 className="text-main font-medium mb-1 group-hover:text-primary transition-colors duration-300">
                        {tool.title}
                      </h3>
                      <p className="text-gray400 text-sm">{tool.description}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

/* Add these styles to your global CSS or as a style tag in your layout */
<style jsx global>{`
  .swiper-pagination-bullet {
    background: var(--primary) !important;
    opacity: 0.3 !important;
    transition: all 0.3s ease !important;
  }

  .swiper-pagination-bullet-active {
    opacity: 1 !important;
    transform: scale(1.2) !important;
  }

  .swiper-button-prev,
  .swiper-button-next {
    display: none !important;
  }

  .swiper-button-prev::after,
  .swiper-button-next::after {
    display: none !important;
  }

  .group:hover .swiper-button-prev,
  .group:hover .swiper-button-next {
    display: flex !important;
  }

  .swiper-button-disabled {
    opacity: 0.5 !important;
    cursor: not-allowed !important;
  }
`}</style>;

export default NewHomeView;
