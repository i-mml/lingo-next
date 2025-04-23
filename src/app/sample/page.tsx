"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { isMobile } from "react-device-detect";

const SamplePage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [pathWidth, setPathWidth] = useState(1000);

  useEffect(() => {
    // Initial set
    setPathWidth(window.innerWidth);

    // Update on resize
    const handleResize = () => {
      setPathWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate path points based on screen width
  const getPath = (width: number) => {
    const quarterWidth = width / 4;
    return `M0 100 Q ${quarterWidth} 250 ${
      quarterWidth * 2
    } 100 T ${width} 100`;
  };

  // Background elements data
  const subtitleElements = [
    // English
    { en: "Hello!", fa: "سلام!", color: "blue" },
    { en: "How are you?", fa: "حالت چطوره؟", color: "green" },
    { en: "Nice to meet you", fa: "از آشنایی با شما خوشحالم", color: "purple" },

    // German
    { en: "Guten Tag!", fa: "روز بخیر!", color: "orange" },
    { en: "Wie geht es dir?", fa: "حال شما چطور است؟", color: "pink" },
    { en: "Ich lerne Deutsch", fa: "من آلمانی یاد می‌گیرم", color: "blue" },

    // Chinese
    { en: "你好 (Nǐ hǎo)", fa: "سلام", color: "red" },
    {
      en: "很高兴认识你 (Hěn gāoxìng rènshi nǐ)",
      fa: "از آشناییت خوشحالم",
      color: "gold",
    },
    {
      en: "我在学习中文 (Wǒ zài xuéxí zhōngwén)",
      fa: "من چینی یاد می‌گیرم",
      color: "green",
    },

    // Spanish
    { en: "¡Hola!", fa: "سلام!", color: "yellow" },
    { en: "¿Cómo estás?", fa: "حالت چطوره؟", color: "purple" },
    {
      en: "Estoy aprendiendo español",
      fa: "من اسپانیایی یاد می‌گیرم",
      color: "blue",
    },

    // French
    { en: "Bonjour!", fa: "روز بخیر!", color: "pink" },
    { en: "Comment allez-vous?", fa: "حال شما چطور است؟", color: "green" },
    { en: "Je parle français", fa: "من فرانسوی صحبت می‌کنم", color: "orange" },

    // Arabic
    { en: "مرحباً!", fa: "سلام!", color: "blue" },
    { en: "كيف حالك؟", fa: "حالت چطوره؟", color: "purple" },
    { en: "أتعلم العربية", fa: "من عربی یاد می‌گیرم", color: "green" },
  ];

  const learningIcons = [
    "📚",
    "🎬",
    "🎧",
    "✏️",
    "🌍",
    "💭",
    "🗣️",
    "📱",
    "🎯",
    "📝",
    "🔍",
    "🎮",
  ];

  return (
    <div className="min-h-screen bg-[var(--background-layout)]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a]">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Subtitle Cards */}
          {subtitleElements.map((subtitle, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, y: 100 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                y: ["100%", "0%", "-100%"],
                x: Math.sin(i) * 50,
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
                delay: i * -3,
              }}
              style={{
                left: `${15 + i * 20}%`,
              }}
            >
              <div className="bg-white/5 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-white/10 transform-gpu">
                <div className="text-white/60 text-sm mb-1">{subtitle.en}</div>
                <div className="text-[var(--primary)] text-sm">
                  {subtitle.fa}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Learning Method Icons */}
          {learningIcons.map((icon, i) => (
            <motion.div
              key={`icon-${i}`}
              className="absolute text-2xl"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              style={{
                left: `${10 + i * 12}%`,
                top: `${75 + Math.sin(i) * 5}%`,
                filter: "blur(1px)",
              }}
            >
              {icon}
            </motion.div>
          ))}

          {/* Floating Word Bubbles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`bubble-${i}`}
              className="absolute"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: [0.1, 0.2, 0.1],
                scale: [1, 1.2, 1],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2,
              }}
              style={{
                right: `${20 + i * 25}%`,
                top: `${30 + i * 15}%`,
              }}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-transparent backdrop-blur-sm border border-white/10 transform-gpu" />
            </motion.div>
          ))}

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <motion.path
              d={getPath(pathWidth)}
              stroke="var(--primary)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: isMobile ? 4 : 6,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-right"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="inline-block text-[var(--primary)] text-xl md:text-2xl mb-4"
                >
                  زبان را متفاوت یاد بگیرید
                </motion.span>

                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
                  <span className="text-[var(--primary)] inline-block transform hover:scale-105 transition-transform duration-300">
                    زبانیو
                  </span>
                </h1>

                <motion.p
                  className="text-xl md:text-2xl text-gray-300 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  یادگیری زبان با محتوای مورد علاقه‌تان
                </motion.p>

                <motion.div
                  className="flex flex-col gap-4 text-lg text-gray-400 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <p className="flex items-center justify-center lg:justify-end gap-2">
                    <span className="text-[var(--primary)]">✓</span>
                    یادگیری با فیلم‌ها و سریال‌های محبوب دنیا
                  </p>
                  <p className="flex items-center justify-center lg:justify-end gap-2">
                    <span className="text-[var(--primary)]">✓</span>
                    تقویت مهارت‌های شنیداری با پادکست‌های جذاب
                  </p>
                  <p className="flex items-center justify-center lg:justify-end gap-2">
                    <span className="text-[var(--primary)]">✓</span>
                    پیشرفت سریع با روش‌های نوین یادگیری
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[var(--primary)] text-white rounded-full text-lg font-semibold shadow-[0_0_20px_rgba(255,168,0,0.3)] hover:shadow-[0_0_30px_rgba(255,168,0,0.5)] transition-all duration-300 w-full sm:w-auto"
                >
                  رایگان شروع کنید
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
                >
                  ویدیو معرفی
                </motion.button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-6 text-gray-400 text-sm"
              >
                به بیش از ۵۰,۰۰۰ کاربر فعال زبانیو بپیوندید
              </motion.p>
            </motion.div>

            {/* Right Side - Value Proposition */}
            <div className="relative">
              <div className="max-w-xl">
                {/* Core Benefits */}
                <div className="space-y-8">
                  {/* Benefit 1: Comprehensive Learning */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          یادگیری هدفمند
                        </h3>
                        <p className="text-gray-400 text-sm">
                          با محتوای مورد علاقه‌تان
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <div className="flex-1 bg-black/20 rounded-xl p-3 text-center">
                        <div className="text-[var(--primary)] text-sm mb-1">
                          فیلم و سریال
                        </div>
                        <div className="text-white/70 text-xs">+1000</div>
                      </div>
                      <div className="flex-1 bg-black/20 rounded-xl p-3 text-center">
                        <div className="text-[var(--primary)] text-sm mb-1">
                          پادکست
                        </div>
                        <div className="text-white/70 text-xs">+500</div>
                      </div>
                      <div className="flex-1 bg-black/20 rounded-xl p-3 text-center">
                        <div className="text-[var(--primary)] text-sm mb-1">
                          کتاب صوتی
                        </div>
                        <div className="text-white/70 text-xs">+200</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Benefit 2: Smart Tools */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                        <span className="text-2xl">⚡️</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          ابزارهای هوشمند
                        </h3>
                        <p className="text-gray-400 text-sm">
                          یادگیری سریع و موثر
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="bg-black/20 rounded-xl p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[var(--primary)]">📝</span>
                          <span className="text-white/90 text-sm">
                            فلش‌کارت هوشمند
                          </span>
                        </div>
                      </div>
                      <div className="bg-black/20 rounded-xl p-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[var(--primary)]">🎯</span>
                          <span className="text-white/90 text-sm">
                            آزمون نامحدود
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Benefit 3: Progress Tracking */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                        <span className="text-2xl">📈</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          پیشرفت تضمینی
                        </h3>
                        <p className="text-gray-400 text-sm">
                          با روش‌های نوین یادگیری
                        </p>
                      </div>
                    </div>
                    <div className="bg-black/20 rounded-xl p-4 mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/90 text-sm">
                          پیشرفت هفتگی
                        </span>
                        <span className="text-[var(--primary)] text-sm">
                          +15%
                        </span>
                      </div>
                      <div className="w-full bg-black/30 rounded-full h-2">
                        <motion.div
                          className="bg-[var(--primary)] h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "85%" }}
                          transition={{ duration: 1, delay: 0.6 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "۹۸٪", label: "رضایت کاربران" },
              { number: "+۲۰", label: "زبان مختلف" },
              { number: "+۵۰۰۰", label: "کاربر فعال" },
              { number: "+۱۰۰۰", label: "محتوای آموزشی" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="text-center p-0"
              >
                <div className="bg-[var(--primary)]/5 backdrop-blur-sm rounded-xl p-4 border border-[var(--primary)]/10">
                  <div className="text-[var(--primary)] text-sm mb-1">
                    {stat.label}
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {stat.number}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "۱۰۰۰+", label: "فیلم و سریال" },
              { number: "۵۰۰+", label: "پادکست" },
              { number: "۲۰۰+", label: "کتاب صوتی" },
              { number: "۵۰,۰۰۰+", label: "کاربر فعال" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-[var(--primary)] mb-2">
                  {stat.number}
                </div>
                <div className="text-[var(--gray400)]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section ref={ref} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-[var(--black)] text-center mb-16"
          >
            ویژگی‌های منحصر به فرد زبانو
          </motion.h2>

          {/* Video Player Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          >
            <div className="bg-white p-8 rounded-2xl border border-[var(--border-main)] shadow-lg">
              <h3 className="text-2xl font-bold text-[var(--black)] mb-4">
                پخش‌کننده هوشمند
              </h3>
              <ul className="space-y-4 text-[var(--gray400)]">
                <li className="flex items-center">
                  <span className="text-[var(--primary)] mr-2">✓</span>
                  زیرنویس دو زبانه (انگلیسی و فارسی)
                </li>
                <li className="flex items-center">
                  <span className="text-[var(--primary)] mr-2">✓</span>
                  کلیک روی کلمات برای مشاهده جزئیات
                </li>
                <li className="flex items-center">
                  <span className="text-[var(--primary)] mr-2">✓</span>
                  ساخت فلش‌کارت از کلمات
                </li>
                <li className="flex items-center">
                  <span className="text-[var(--primary)] mr-2">✓</span>
                  تمرین تلفظ و امتیازدهی
                </li>
                <li className="flex items-center">
                  <span className="text-[var(--primary)] mr-2">✓</span>
                  تحلیل گرامری جملات
                </li>
              </ul>
            </div>
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-64 bg-[var(--primary)]/10 rounded-2xl border border-[var(--border-main)] shadow-lg"
              />
            </div>
          </motion.div>

          {/* Content Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20"
          >
            {[
              {
                title: "فیلم و سریال",
                icon: "🎬",
                description: "یادگیری با فیلم‌ها و سریال‌های محبوب",
              },
              {
                title: "پادکست",
                icon: "🎧",
                description: "گوش دادن به پادکست‌های آموزشی",
              },
              {
                title: "کتاب صوتی",
                icon: "📚",
                description: "مطالعه کتاب‌های صوتی",
              },
              {
                title: "انیمیشن",
                icon: "🎨",
                description: "یادگیری با انیمیشن‌های جذاب",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white p-6 rounded-2xl border border-[var(--border-main)] shadow-lg text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[var(--black)] mb-2">
                  {item.title}
                </h3>
                <p className="text-[var(--gray400)]">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Learning Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {[
              {
                title: "کتاب‌های معروف",
                description: "یادگیری با کتاب‌های معروف مانند 504 و 4000 واژه",
                icon: "📖",
              },
              {
                title: "دستور زبان",
                description:
                  "آموزش دستور زبان بر اساس سری کتاب‌های English in Use",
                icon: "📝",
              },
              {
                title: "فلش‌کارت‌ها",
                description: "مدیریت و مرور فلش‌کارت‌های شخصی",
                icon: "🎴",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white p-8 rounded-2xl border border-[var(--border-main)] shadow-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-[var(--black)] mb-4">
                  {feature.title}
                </h3>
                <p className="text-[var(--gray400)]">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Dictionary and Quiz */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-white p-8 rounded-2xl border border-[var(--border-main)] shadow-lg">
              <h3 className="text-2xl font-bold text-[var(--black)] mb-4">
                دیکشنری هوشمند
              </h3>
              <p className="text-[var(--gray400)] mb-4">
                جستجوی کلمات و مشاهده جزئیات در محتوای مختلف
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[var(--primary)] text-white rounded-full text-sm font-semibold"
              >
                جستجو در دیکشنری
              </motion.button>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-[var(--border-main)] shadow-lg">
              <h3 className="text-2xl font-bold text-[var(--black)] mb-4">
                آزمون‌های نامحدود
              </h3>
              <p className="text-[var(--gray400)] mb-4">
                آزمون‌های متنوع برای کلمات، دستور زبان و کتاب‌های معروف
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[var(--primary)] text-white rounded-full text-sm font-semibold"
              >
                شروع آزمون
              </motion.button>
            </div>
          </motion.div>

          {/* Feature Boxes */}
          <div className="relative mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
              {/* Interactive Learning Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[var(--primary)]/30 transition-colors group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-2xl">🎬</div>
                  <motion.div
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[var(--primary)]/10 text-[var(--primary)] text-sm px-3 py-1 rounded-full"
                  >
                    Interactive Learning
                  </motion.div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-4">
                  یادگیری تعاملی با محتوا
                </h3>

                <div className="space-y-3 text-gray-300 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    زیرنویس دوزبانه در فیلم‌ها و سریال‌ها
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    ترجمه و تلفظ کلمات با یک کلیک
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    تحلیل گرامری جملات
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    تمرین تلفظ و دریافت امتیاز
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5">
                  <div className="bg-black/30 rounded-xl p-4">
                    <div className="text-sm text-white/70">Friends S01E01</div>
                    <div className="text-[var(--primary)]">How you doing?</div>
                    <div className="text-sm text-white/90">حالت چطوره؟</div>
                  </div>
                </div>
              </motion.div>

              {/* Diverse Content Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[var(--primary)]/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-2xl">📚</div>
                  <motion.div
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-[var(--primary)]/10 text-[var(--primary)] text-sm px-3 py-1 rounded-full"
                  >
                    Rich Content
                  </motion.div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-4">
                  محتوای متنوع آموزشی
                </h3>

                <div className="space-y-3 text-gray-300 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    فیلم و سریال‌های محبوب دنیا
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    پادکست‌های آموزشی جذاب
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    کتاب‌های صوتی و انیمیشن
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    کتاب‌های معروف مثل 504 و 4000
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-black/30 aspect-square rounded-lg flex items-center justify-center">
                      🎬
                    </div>
                    <div className="bg-black/30 aspect-square rounded-lg flex items-center justify-center">
                      🎧
                    </div>
                    <div className="bg-black/30 aspect-square rounded-lg flex items-center justify-center">
                      📖
                    </div>
                    <div className="bg-black/30 aspect-square rounded-lg flex items-center justify-center">
                      🎨
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Smart Tools Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[var(--primary)]/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-2xl">🎯</div>
                  <motion.div
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-[var(--primary)]/10 text-[var(--primary)] text-sm px-3 py-1 rounded-full"
                  >
                    Smart Tools
                  </motion.div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-4">
                  ابزارهای هوشمند یادگیری
                </h3>

                <div className="space-y-3 text-gray-300 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    فلش‌کارت‌های شخصی‌سازی شده
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    دیکشنری هوشمند با جستجو در محتوا
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    آزمون‌های نامحدود از همه مباحث
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    تمرین گرامر با English in Use
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <div className="text-[var(--primary)]">Flashcards</div>
                      <div className="text-white/70">+2,000 words</div>
                    </div>
                    <div className="bg-[var(--primary)]/20 text-[var(--primary)] px-3 py-1 rounded-lg text-sm">
                      95% mastered
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-[var(--black)] text-center mb-16">
            نظرات کاربران
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "سارا محمدی",
                role: "دانشجوی زبان انگلیسی",
                text: "زبانیو بهترین پلتفرم یادگیری زبان است. من با تماشای فیلم‌ها و سریال‌ها خیلی پیشرفت کردم.",
              },
              {
                name: "علی رضایی",
                role: "مهندس نرم‌افزار",
                text: "امکانات پخش‌کننده هوشمند و دیکشنری آنلاین واقعاً عالی است. به همه توصیه می‌کنم.",
              },
              {
                name: "مریم حسینی",
                role: "معلم زبان",
                text: "به عنوان معلم زبان، زبانیو را به همه دانش‌آموزانم توصیه می‌کنم. روش یادگیری بسیار موثری دارد.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-[var(--background-layout)] p-6 rounded-2xl border border-[var(--border-main)]"
              >
                <p className="text-[var(--gray400)] mb-4">{testimonial.text}</p>
                <div className="text-[var(--black)] font-semibold">
                  {testimonial.name}
                </div>
                <div className="text-[var(--gray400)] text-sm">
                  {testimonial.role}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-[var(--black)] text-center mb-16">
            پلن‌های اشتراک
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "پایه",
                price: "۹۹,۰۰۰",
                period: "ماهانه",
                features: [
                  "دسترسی به فیلم‌ها و سریال‌ها",
                  "دیکشنری هوشمند",
                  "فلش‌کارت‌های پایه",
                ],
              },
              {
                name: "پیشرفته",
                price: "۱۹۹,۰۰۰",
                period: "ماهانه",
                features: [
                  "همه امکانات پلن پایه",
                  "دسترسی به پادکست‌ها",
                  "فلش‌کارت‌های نامحدود",
                  "آزمون‌های پیشرفته",
                ],
                popular: true,
              },
              {
                name: "حرفه‌ای",
                price: "۳۹۹,۰۰۰",
                period: "ماهانه",
                features: [
                  "همه امکانات پلن پیشرفته",
                  "دسترسی به کتاب‌های صوتی",
                  "پشتیبانی VIP",
                  "آزمون‌های نامحدود",
                ],
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`bg-white p-8 rounded-2xl border ${
                  plan.popular
                    ? "border-[var(--primary)] shadow-lg"
                    : "border-[var(--border-main)]"
                }`}
              >
                {plan.popular && (
                  <div className="bg-[var(--primary)] text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                    محبوب
                  </div>
                )}
                <h3 className="text-2xl font-bold text-[var(--black)] mb-2">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-[var(--primary)] mb-1">
                  {plan.price}
                </div>
                <div className="text-[var(--gray400)] mb-6">{plan.period}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center text-[var(--gray400)]"
                    >
                      <span className="text-[var(--primary)] mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-full font-semibold ${
                    plan.popular
                      ? "bg-[var(--primary)] text-white"
                      : "bg-white text-[var(--primary)] border-2 border-[var(--primary)]"
                  }`}
                >
                  انتخاب پلن
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center px-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--black)] mb-8">
            آماده شروع یادگیری هستید؟
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[var(--primary)] text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            ثبت‌نام و شروع یادگیری
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default SamplePage;
