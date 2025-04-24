"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { isMobile } from "react-device-detect";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Pagination } from "swiper/modules";

const SamplePage = () => {
  const ref = useRef(null);
  const isInView = useRef(false);
  const [pathWidth, setPathWidth] = useState(1000);
  const [mounted, setMounted] = useState(false);

  // Optimize animations based on device
  const isReducedMotion = isMobile;

  // Counter animation control with performance optimization
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, {
    once: true,
    margin: "100px 0px",
  });

  useEffect(() => {
    setMounted(true);

    // Optimize resize listener
    const handleResize = debounce(() => {
      setPathWidth(window.innerWidth);
    }, 100);

    setPathWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Debounce function for performance
  function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout | undefined;
    return function executedFunction(...args: any[]) {
      const later = () => {
        if (timeout) clearTimeout(timeout);
        func(...args);
      };
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const Counter = ({
    end,
    suffix = "",
    duration = 2,
  }: {
    end: number;
    suffix?: string;
    duration?: number;
  }) => {
    const [count, setCount] = useState(0);
    const frameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
      if (statsInView) {
        startTimeRef.current = Date.now();

        const animate = () => {
          const elapsed = Date.now() - (startTimeRef.current || 0);
          const progress = Math.min(elapsed / (duration * 1000), 1);

          const newCount = Math.floor(end * progress);
          setCount(newCount);

          if (progress < 1) {
            frameRef.current = requestAnimationFrame(animate);
          }
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
          if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
          }
        };
      }
    }, [statsInView, end, duration]);

    return (
      <div className="flex items-baseline justify-center">
        <span className="text-[var(--primary)] text-3xl md:text-4xl font-bold">
          {count.toLocaleString()}
        </span>
        <span className="text-[var(--primary)] text-xl md:text-2xl font-bold">
          {suffix}
        </span>
      </div>
    );
  };

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
    "🗣️",
    "📱",
    "🎯",
    "📝",
    "🔍",
    "🎮",
  ];

  // Memoize static content
  const renderAnimatedBackground = useMemo(
    () => (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Subtitle Cards - Optimized for mobile */}
        {mounted && (
          <>
            {subtitleElements
              .slice(0, isReducedMotion ? 4 : 8)
              .map((subtitle, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{
                    opacity: [0.1, 0.2, 0.1],
                    y: ["100%", "0%", "-100%"],
                    x: Math.sin(i) * (isReducedMotion ? 20 : 30),
                  }}
                  transition={{
                    duration: isReducedMotion ? 25 : 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * (isReducedMotion ? -3 : -2),
                  }}
                  style={{
                    left: `${15 + i * (isReducedMotion ? 25 : 20)}%`,
                    willChange: "transform",
                  }}
                >
                  <div className="bg-white/5 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-white/10">
                    <div className="text-white/60 text-sm">{subtitle.en}</div>
                    <div className="text-[var(--primary)] text-sm">
                      {subtitle.fa}
                    </div>
                  </div>
                </motion.div>
              ))}

            {/* Learning Method Icons - Optimized for mobile */}
            {learningIcons.slice(0, isReducedMotion ? 4 : 6).map((icon, i) => (
              <motion.div
                key={`icon-${i}`}
                className="absolute text-2xl"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.2, 0.3, 0.2],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: isReducedMotion ? 12 : 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * (isReducedMotion ? 1 : 0.8),
                }}
                style={{
                  left: `${10 + i * (isReducedMotion ? 20 : 15)}%`,
                  top: `${75 + Math.sin(i) * (isReducedMotion ? 2 : 3)}%`,
                  willChange: "transform",
                }}
              >
                {icon}
              </motion.div>
            ))}

            {/* Floating Word Bubbles - Optimized for mobile */}
            {[...Array(isReducedMotion ? 1 : 2)].map((_, i) => (
              <motion.div
                key={`bubble-${i}`}
                className="absolute"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: [0.1, 0.15, 0.1],
                  scale: [1, 1.05, 1],
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: isReducedMotion ? 15 : 12,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 3,
                }}
                style={{
                  right: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`,
                  willChange: "transform",
                }}
              >
                <div
                  className={`${
                    isReducedMotion ? "w-16 h-16" : "w-20 h-20"
                  } rounded-full bg-gradient-to-br from-[var(--primary)]/20 to-transparent backdrop-blur-sm border border-white/10`}
                />
              </motion.div>
            ))}
          </>
        )}

        {/* Connection Lines - Optimized SVG animation */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          style={{ willChange: "transform" }}
        >
          <motion.path
            d={getPath(pathWidth)}
            stroke="var(--primary)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: isReducedMotion ? 10 : 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>
      </div>
    ),
    [mounted, isReducedMotion, pathWidth]
  );

  return (
    <div className="min-h-screen bg-[var(--background-layout)]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a]">
        {renderAnimatedBackground}

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
                    زبانو
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
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-[var(--primary)]">✓</span>
                    یادگیری با فیلم‌ها و سریال‌های محبوب دنیا
                  </p>
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-[var(--primary)]">✓</span>
                    تقویت مهارت‌های شنیداری با پادکست‌های جذاب
                  </p>
                  <p className="flex items-center justify-center  gap-2">
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
                به بیش از ۵۰,۰۰۰ کاربر فعال زبانو بپیوندید
              </motion.p>
            </motion.div>

            {/* Left Side - Feature Preview */}
            <div className="lg:pl-8">
              <div className="space-y-6 max-w-xl">
                {/* 3D Language Showcase */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-3xl">🌍</span>
                    زبان‌های موجود
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      { flag: "🇬🇧", name: "انگلیسی", content: "1000+" },
                      { flag: "🇩🇪", name: "آلمانی", content: "500+" },
                      { flag: "🇫🇷", name: "فرانسوی", content: "400+" },
                      { flag: "🇪🇸", name: "اسپانیایی", content: "300+" },
                      { flag: "🇨🇳", name: "چینی", content: "200+" },
                      { flag: "🇸🇦", name: "عربی", content: "600+" },
                    ].map((lang, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 100,
                        }}
                        whileHover={{
                          scale: 1.05,
                          rotateY: 10,
                          z: 50,
                          transition: { duration: 0.2 },
                        }}
                        className="group relative perspective"
                      >
                        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-[var(--primary)]/30 transition-all duration-300 transform-gpu hover:shadow-[0_0_20px_rgba(255,168,0,0.1)]">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                              {lang.flag}
                            </span>
                            <span className="text-white font-medium">
                              {lang.name}
                            </span>
                          </div>
                          <div className="text-sm text-[var(--primary)]">
                            {lang.content} محتوا
                          </div>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/0 to-[var(--primary)]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={false}
                            animate={{ rotateY: [0, 15, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-6 text-center"
                  >
                    <p className="text-gray-400 text-sm">
                      و بیش از <span className="text-[var(--primary)]">15</span>{" "}
                      زبان دیگر...
                    </p>
                  </motion.div>
                </motion.div>

                {/* Smart Tools Box */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
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
                  <div className="grid grid-cols-2 gap-3">
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
                    <div className="bg-black/20 rounded-xl p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--primary)]">🖼️</span>
                        <span className="text-white/90 text-sm">
                          دیکشنری تصویری
                        </span>
                      </div>
                    </div>
                    <div className="bg-black/20 rounded-xl p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--primary)]">🗣️</span>
                        <span className="text-white/90 text-sm">
                          بازگویی و سنجش تشابه
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Stats Preview */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {[
              { label: "کاربر فعال", value: 5000, suffix: "+" },
              { label: "محتوای آموزشی", value: 1000, suffix: "+" },
              { label: "رضایت کاربران", value: 98, suffix: "%" },
              { label: "زبان مختلف", value: 20, suffix: "+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-[#1E1E1E] backdrop-blur-sm rounded-2xl p-6 border border-[#333] group-hover:border-[var(--primary)]/30 transition-all duration-300">
                  <div className="text-[var(--primary)] text-sm mb-4 text-center">
                    {stat.label}
                  </div>
                  <Counter end={stat.value} suffix={stat.suffix} duration={2} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 md:py-24 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ویژگی‌های منحصر به فرد
            </h2>
            <p className="text-gray-400 text-lg">
              تجربه یادگیری زبان با تکنولوژی پیشرفته
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Interactive Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[var(--primary)]/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-3xl">🎬</div>
                  <div className="bg-[var(--primary)]/10 text-[var(--primary)] text-sm px-3 py-1 rounded-full">
                    Interactive
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  یادگیری تعاملی
                </h3>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    زیرنویس دوزبانه در فیلم‌ها
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    ترجمه و تلفظ کلمات
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    تحلیل گرامری جملات
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Diverse Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[var(--primary)]/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-3xl">📚</div>
                  <div className="bg-[var(--primary)]/10 text-[var(--primary)] text-sm px-3 py-1 rounded-full">
                    Rich Content
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  محتوای متنوع
                </h3>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    فیلم و سریال‌های محبوب
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    پادکست‌های آموزشی
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    کتاب‌های صوتی و انیمیشن
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Smart Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[var(--primary)]/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-3xl">🎯</div>
                  <div className="bg-[var(--primary)]/10 text-[var(--primary)] text-sm px-3 py-1 rounded-full">
                    Smart Tools
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  ابزارهای هوشمند
                </h3>
                <div className="space-y-3 text-gray-300 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    فلش‌کارت‌های هوشمند
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    دیکشنری هوشمند
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[var(--primary)]">•</span>
                    آزمون‌های نامحدود
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-10 md:py-24 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              نظرات کاربران
            </h2>
            <p className="text-gray-400 text-lg">
              تجربه‌های واقعی از زبان‌آموزان زبانو
            </p>
          </motion.div>

          <div className="relative">
            <Swiper
              modules={[Autoplay, A11y, Pagination]}
              className="testimonials-swiper px-[5%] pb-16"
              breakpoints={{
                320: {
                  slidesPerView: 1.2,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2.2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3.2,
                  spaceBetween: 30,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 32,
                },
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                bulletActiveClass: "swiper-pagination-bullet-active",
                bulletClass: "swiper-pagination-bullet",
                horizontalClass: "swiper-pagination-horizontal",
              }}
              loop
              style={
                {
                  "--swiper-pagination-color": "var(--primary)",
                  "--swiper-pagination-bullet-inactive-color": "#666",
                  "--swiper-pagination-bullet-inactive-opacity": "0.3",
                  "--swiper-pagination-bullet-size": "10px",
                  "--swiper-pagination-bullet-horizontal-gap": "6px",
                } as React.CSSProperties
              }
            >
              {[
                {
                  name: "سارا محمدی",
                  role: "دانشجوی زبان انگلیسی",
                  text: "زبانو بهترین پلتفرم یادگیری زبان است. من با تماشای فیلم‌ها و سریال‌ها خیلی پیشرفت کردم.",
                  avatar: "👩‍🎓",
                },
                {
                  name: "علی رضایی",
                  role: "مهندس نرم‌افزار",
                  text: "امکانات پخش‌کننده هوشمند و دیکشنری آنلاین واقعاً عالی است. به همه توصیه می‌کنم.",
                  avatar: "👨‍💻",
                },
                {
                  name: "مریم حسینی",
                  role: "معلم زبان",
                  text: "به عنوان معلم زبان، زبانو را به همه دانش‌آموزانم توصیه می‌کنم. روش یادگیری بسیار موثری دارد.",
                  avatar: "👩‍🏫",
                },
                {
                  name: "محمد رضایی",
                  role: "دانشجوی زبان آلمانی",
                  text: "با زبانو یادگیری زبان آلمانی برای من بسیار آسان شد. محتوای متنوع و ابزارهای هوشمند واقعاً کمک‌کننده هستند.",
                  avatar: "👨‍🎓",
                },
                {
                  name: "نازنین کریمی",
                  role: "مترجم",
                  text: "به عنوان مترجم، زبانو را به همه کسانی که می‌خواهند زبان یاد بگیرند توصیه می‌کنم. روش‌های نوین یادگیری واقعاً موثر هستند.",
                  avatar: "👩‍💼",
                },
              ].map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="group relative h-full pt-8"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative bg-[#1E1E1E] backdrop-blur-sm rounded-2xl p-8 border border-[#333] hover:border-[var(--primary)]/30 transition-all duration-300 h-full shadow-lg">
                      {/* Avatar Circle with Gold Border */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <div className="w-16 h-16 rounded-full bg-[#1E1E1E] flex items-center justify-center text-3xl shadow-lg border-4 border-[var(--primary)] backdrop-blur-sm">
                          {testimonial.avatar}
                        </div>
                      </div>

                      <div className="pt-10 text-center">
                        <div className="text-white font-semibold text-lg mb-2">
                          {testimonial.name}
                        </div>
                        <div className="text-[var(--primary)] text-sm mb-6">
                          {testimonial.role}
                        </div>
                        <div className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                          {testimonial.text}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            <style jsx global>{`
              .testimonials-swiper .swiper-pagination {
                position: relative;
                margin-top: 2rem;
              }
              .testimonials-swiper .swiper-pagination-bullet {
                width: 10px;
                height: 10px;
                background: #666;
                opacity: 0.3;
                transition: all 0.3s ease;
              }
              .testimonials-swiper .swiper-pagination-bullet-active {
                background: var(--primary);
                opacity: 1;
                width: 24px;
                border-radius: 4px;
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-10 md:py-24 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              پلن‌های اشتراک
            </h2>
            <p className="text-gray-400 text-lg">
              انتخاب پلن مناسب برای یادگیری زبان
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
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
                icon: "🎬",
                color: "from-blue-500/10 to-purple-500/10",
                borderColor: "border-blue-500/20",
                buttonClass:
                  "bg-white/10 hover:bg-white/20 text-white border border-white/20",
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
                icon: "⭐️",
                popular: true,
                color: "from-[var(--primary)]/20 to-orange-600/20",
                borderColor: "border-[var(--primary)]",
                buttonClass:
                  "bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white",
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
                icon: "👑",
                color: "from-purple-500/10 to-pink-500/10",
                borderColor: "border-purple-500/20",
                buttonClass:
                  "bg-white/10 hover:bg-white/20 text-white border border-white/20",
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`group relative ${
                  plan.popular ? "md:-mt-4 md:mb-4" : ""
                }`}
              >
                {/* Background Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.color} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-60 group-hover:opacity-100`}
                />

                {/* Card Content */}
                <div
                  className={`relative h-full bg-[#1E1E1E] backdrop-blur-xl rounded-3xl p-8 border ${plan.borderColor} transition-all duration-300 group-hover:border-opacity-100 group-hover:transform group-hover:-translate-y-2 group-hover:shadow-2xl`}
                >
                  {plan.popular && (
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                      <div className="bg-[var(--primary)] text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg">
                        محبوب‌ترین
                      </div>
                    </div>
                  )}

                  {/* Plan Icon */}
                  <div className="text-4xl mb-6">{plan.icon}</div>

                  {/* Plan Name & Price */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-[var(--primary)]">
                        {plan.price}
                      </span>
                      <span className="text-gray-400 text-sm">
                        تومان / {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-gray-300 gap-2"
                      >
                        <span className="text-[var(--primary)]">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                      plan.buttonClass
                    } ${
                      plan.popular ? "shadow-lg shadow-[var(--primary)]/20" : ""
                    }`}
                  >
                    انتخاب پلن
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-12 text-gray-400 text-sm"
          >
            تمامی پلن‌ها شامل ۷ روز ضمانت بازگشت وجه می‌باشند
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-24 bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center px-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            آماده شروع یادگیری هستید؟
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[var(--primary)] text-white rounded-full text-lg font-semibold shadow-[0_0_20px_rgba(255,168,0,0.3)] hover:shadow-[0_0_30px_rgba(255,168,0,0.5)] transition-all duration-300"
          >
            ثبت‌نام و شروع یادگیری
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌍</span>
                <span className="text-2xl font-bold text-white">زبانو</span>
              </div>
              <p className="text-gray-400 text-sm">
                یادگیری زبان با تکنولوژی پیشرفته و محتوای جذاب
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[var(--primary)]/20 transition-all duration-300"
                >
                  <span className="text-xl">📱</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[var(--primary)]/20 transition-all duration-300"
                >
                  <span className="text-xl">📧</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[var(--primary)]/20 transition-all duration-300"
                >
                  <span className="text-xl">📞</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-6">دسترسی سریع</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    صفحه اصلی
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    دوره‌های آموزشی
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    پشتیبانی
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    درباره ما
                  </a>
                </li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-white font-semibold mb-6">ویژگی‌ها</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    یادگیری با فیلم
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    پادکست آموزشی
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    فلش‌کارت هوشمند
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    آزمون‌های نامحدود
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-6">تماس با ما</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-400">
                  <span className="text-[var(--primary)]">📍</span>
                  تهران، خیابان ولیعصر
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <span className="text-[var(--primary)]">📧</span>
                  info@zabano.com
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <span className="text-[var(--primary)]">📞</span>
                  ۰۲۱-۱۲۳۴۵۶۷۸
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © ۲۰۲۴ زبانو. تمامی حقوق محفوظ است.
              </p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  شرایط استفاده
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  حریم خصوصی
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  قوانین
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SamplePage;
