"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

const GuestView = () => {
  return (
    <div className="min-h-screen bg-backgroundLayout">
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          {/* Quick Access Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-main mb-6 text-center">
              دسترسی سریع
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {[
                { title: "دیکشنری", icon: "🔍", link: "/dictionary" },
                { title: "فلش‌کارت", icon: "🗂", link: "/flashcards" },
                { title: "گرامر", icon: "📚", link: "/grammar" },
                { title: "تمرین", icon: "✏️", link: "/practice" },
                { title: "فیلم و سریال", icon: "🎬", link: "/movies" },
                { title: "پادکست", icon: "🎧", link: "/podcasts" },
                { title: "کتاب صوتی", icon: "📖", link: "/audiobooks" },
              ].map((item, idx) => (
                <Link href={item.link} key={idx} className="block">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex flex-col items-center justify-center bg-backgroundMain border border-borderMain rounded-xl p-6 shadow-sm hover:border-primary transition-all cursor-pointer h-full min-h-[120px]"
                  >
                    <span className="text-3xl mb-2">{item.icon}</span>
                    <span className="text-main font-medium text-lg">
                      {item.title}
                    </span>
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

export default GuestView;
