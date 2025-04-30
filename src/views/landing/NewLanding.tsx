"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { isMobile } from "react-device-detect";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Pagination } from "swiper/modules";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import StaticWordDetail from "@/components/modals/StaticWordDetail";
import {
  AmazingWordStaticContent,
  LearnWordStaticContent,
  MoviesWordStaticContent,
} from "@/mock/word-detail-modal-static-content";

const NewLanding = () => {
  const [pathWidth, setPathWidth] = useState(1000);
  const [mounted, setMounted] = useState(false);
  const [wordDetailModalData, setWordDetailModalData] = useState<{
    isOpen: boolean;
    wordData: any;
  }>({
    isOpen: false,
    wordData: null,
  });
  const controls = useAnimation();
  const router = useRouter();
  const { isGuest } = useAuth();

  // Optimize animations based on device
  const isReducedMotion = isMobile;

  // Stats section refs and animation
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, {
    once: true,
    amount: 0.3,
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

  useEffect(() => {
    if (statsInView) {
      controls.start("visible");
    }
  }, [statsInView, controls]);

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
    const nodeRef = useRef(null);

    useEffect(() => {
      if (statsInView) {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min(
            (timestamp - startTimestamp) / (duration * 1000),
            1
          );

          setCount(Math.floor(progress * end));

          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };

        window.requestAnimationFrame(step);
      }
    }, [statsInView, end, duration]);

    return (
      <div ref={nodeRef} className="text-2xl md:text-3xl font-bold text-white">
        {count.toLocaleString()}
        {suffix}
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

  const features = [
    {
      title: "یادگیری با فیلم",
      description:
        "زیرنویس دوزبانه که ذهنت رو منفجر می‌کنه! ترجمه و تلفظ آنی کلمات!)",
      icon: "🎬",
    },
    {
      title: "پادکست آموزشی",
      description: "موضوعاتی که عاشقشونی! سریع‌ترین راه برای تقویت لغاته!",
      icon: "🌍",
    },
    {
      title: "فلش‌کارت هوشمند",
      description:
        "فلش‌کارت ساختن از سکانس های مختلف! مرور با روش مدرن و تقویت سریع دایره لغات",
      icon: "✨",
    },
    {
      title: "آزمون‌های نامحدود",
      description: "بازگویی و سنجش تشابه! آزمون‌هایی که شبیه بازی می‌مونن!",
      icon: "🎯",
    },
  ];

  useEffect(() => {
    if (!isGuest) {
      router.push("/public/home");
    }
  }, [isGuest]);

  return (
    <div className="min-h-screen bg-[var(--background-layout)]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#232323] to-[#2a2a2a]">
        {renderAnimatedBackground}

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
                  className="inline-block text-[var(--primary)] text-lg md:text-2xl mb-4 bg-[#ffa80020] px-4 py-2 rounded-full"
                >
                  🔥 یادگیری زبان به روش آدم خفنا!
                </motion.span>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 md:mb-6">
                  <motion.span
                    className="text-[var(--primary)] inline-block"
                    whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    زبانو
                  </motion.span>
                </h1>

                <motion.p
                  className="text-lg md:text-2xl text-gray-300 mb-4 md:mb-6 font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  زبان یاد بگیر، ولی قبلش{" "}
                  <motion.span
                    className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mx-1"
                    whileHover={{ scale: 1.1 }}
                    animate={{
                      color: ["#6366f1", "#ec4899", "#6366f1"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    لذت ببر!
                  </motion.span>{" "}
                  🚀
                </motion.p>

                <motion.div
                  className="flex flex-col gap-3 md:gap-4 text-base md:text-lg text-gray-400 mb-6 md:mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <p className="flex items-center justify-center md:justify-start gap-2">
                    <span className="text-[var(--primary)] text-xl">🎬</span>
                    فیلم و سریال ببین، زبان یاد بگیر!
                  </p>
                  <p className="flex items-center justify-center md:justify-start gap-2">
                    <span className="text-[var(--primary)] text-xl">🎧</span>
                    پادکست‌های باحال گوش کن، مثل یک نیتیو حرف بزن!
                  </p>
                  <p className="flex items-center justify-center md:justify-start gap-2">
                    <span className="text-[var(--primary)] text-xl">🚀</span>
                    پیشرفت با سرعت نور، بدون خستگی و استرس!
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, rotateZ: 1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[var(--primary)] to-amber-500 text-white rounded-full text-base md:text-lg font-semibold shadow-[0_0_20px_rgba(255,168,0,0.3)] hover:shadow-[0_0_30px_rgba(255,168,0,0.5)] transition-all duration-300"
                >
                  <Link href={"/login"}>همین الان شروع کن! 🤟</Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, rotateZ: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-white/5 backdrop-blur-lg text-white border-2 border-white/20 rounded-full text-base md:text-lg font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  <Link href={"/public/catalog"}>یه نگاهی بنداز 👀</Link>
                </motion.button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-4 md:mt-6 text-gray-400 text-sm"
              >
                <span className="bg-pink-500/20 text-pink-300 px-2 py-1 rounded-md">
                  +۵۰,۰۰۰
                </span>{" "}
                نفر قبلاً خفن شدن! تو کجایی؟ 😎
              </motion.p>
            </motion.div>

            {/* Languages Section */}
            <div className="lg:pl-8 w-full overflow-hidden">
              <div className="space-y-6 max-w-xl mx-auto lg:mx-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white/5 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 flex items-center gap-3">
                    <span className="text-2xl md:text-3xl">🌍</span>
                    زبان‌های موجود
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                    {[
                      {
                        flag: "/images/flags/england.png",
                        name: "انگلیسی",
                        content: "1000+",
                        code: "GB",
                        disabled: false,
                        link: "/en/public/catalog",
                      },
                      {
                        flag: "/images/flags/Germany.webp",
                        name: "آلمانی",
                        content: "500+",
                        code: "DE",
                        disabled: false,
                        link: "/de/public/catalog",
                      },
                      {
                        flag: "/images/flags/France.webp",
                        name: "فرانسوی",
                        content: "400+",
                        code: "FR",
                        disabled: true,
                        link: "/fr/public/catalog",
                      },
                      {
                        flag: "/images/flags/Spain.webp",
                        name: "اسپانیایی",
                        content: "300+",
                        code: "ES",
                        disabled: false,
                        link: "/es/public/catalog",
                      },
                      {
                        flag: "/images/flags/China.png",
                        name: "چینی",
                        content: "200+",
                        code: "CN",
                        disabled: true,
                        link: "/cn/public/catalog",
                      },
                      {
                        flag: "/images/flags/Italy.webp",
                        name: "ایتالیایی",
                        content: "600+",
                        code: "IT",
                        disabled: true,
                        link: "/it/public/catalog",
                      },
                    ].map((lang, index) => (
                      <motion.a
                        key={index}
                        href={lang.link}
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
                        className="group relative perspective !block"
                      >
                        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/5 hover:border-[var(--primary)]/30 transition-all duration-300 transform-gpu hover:shadow-[0_0_20px_rgba(255,168,0,0.1)]">
                          <div className="flex items-center gap-2 md:gap-3 mb-2">
                            <div className="w-6 h-6 md:w-8 md:h-8 relative overflow-hidden rounded-lg transform group-hover:scale-110 transition-transform duration-300">
                              <img
                                src={lang.flag}
                                alt={`${lang.name} flag`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-white font-medium text-sm md:text-base">
                              {lang.name}
                            </span>
                          </div>
                          {lang?.disabled ? (
                            <div className="text-xs md:text-sm text-center !text-[var(--gray400)]">
                              به زودی
                            </div>
                          ) : (
                            <div className="text-xs md:text-sm text-center text-[var(--primary)]">
                              {lang.content} محتوا
                            </div>
                          )}
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-4 md:mt-6 text-center"
                  >
                    <p className="text-gray-400 text-xs md:text-sm">
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
                  className="bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10"
                >
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                      <span className="text-xl md:text-2xl">⚡️</span>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-white">
                        ابزارهای هوشمند
                      </h3>
                      <p className="text-gray-400 text-xs md:text-sm">
                        یادگیری سریع و موثر
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    <div className="bg-black/20 rounded-lg md:rounded-xl p-2 md:p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--primary)]">🖼️</span>
                        <span className="text-white/90 text-xs md:text-sm">
                          دیکشنری تصویری
                        </span>
                      </div>
                    </div>
                    <div className="bg-black/20 rounded-lg md:rounded-xl p-2 md:p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--primary)]">📝 </span>
                        <span className="text-white/90 text-xs md:text-sm">
                          فلش‌کارت هوشمند
                        </span>
                      </div>
                    </div>
                    <div className="bg-black/20 rounded-lg md:rounded-xl p-2 md:p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--primary)]">🎯</span>
                        <span className="text-white/90 text-xs md:text-sm">
                          آزمون نامحدود
                        </span>
                      </div>
                    </div>
                    <div className="bg-black/20 rounded-lg md:rounded-xl p-2 md:p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--primary)]">🗣️</span>
                        <span className="text-white/90 text-xs md:text-sm">
                          بازگویی و سنجش تشابه
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Stats Preview - Mobile Optimized */}
          <motion.div
            ref={statsRef}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  staggerChildren: 0.1,
                },
              },
            }}
            className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8"
          >
            {[
              { label: "کاربر فعال", value: 50000, suffix: "+" },
              { label: "محتوای آموزشی", value: 2700, suffix: "+" },
              { label: "رضایت کاربران", value: 98, suffix: "%" },
              { label: "زبان مختلف", value: 3, suffix: "+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6 },
                  },
                }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-[#1E1E1E] backdrop-blur-sm rounded-2xl p-6 border border-[#333] group-hover:border-[var(--primary)]/30 transition-all duration-300">
                  <div className="text-[var(--primary)] text-sm mb-2">
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
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#1a1a1a] via-[#232323] to-[#2a2a2a]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[#ff9966]"
            >
              ویژگی‌های جذاب و مهیج! 🎮
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-300 max-w-2xl mx-auto"
            >
              اینجا فقط زبان یاد نمی‌گیری، یه سفر هیجان‌انگیز رو شروع می‌کنی! ✨
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-[var(--primary)] transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-[#2d3748] flex items-center justify-center text-[var(--primary)] mb-4 mx-auto md:mx-0">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 10, 0],
                      scale: [1, 1.1, 1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                    className="text-2xl"
                  >
                    {feature.icon}
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white md:text-right text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-400 md:text-right text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Easter Egg Section */}
      <section className="py-16 bg-[#1E1E1E] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative bg-gradient-to-r from-gray-900 to-black rounded-3xl overflow-hidden border border-[var(--primary)]/20 shadow-[0_0_30px_rgba(0,0,0,0.2)]"
          >
            {/* Background particle effect */}
            {mounted && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={`particle-easter-${i}`}
                    className="absolute rounded-full"
                    style={{
                      background: i % 2 === 0 ? "var(--primary)" : "#fff",
                      width: Math.random() * 6 + 2,
                      height: Math.random() * 6 + 2,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: 0.1,
                    }}
                    animate={{
                      y: [0, -Math.random() * 100 - 50],
                      opacity: [0.1, 0.6, 0],
                    }}
                    transition={{
                      duration: Math.random() * 10 + 5,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: Math.random() * 5,
                    }}
                  />
                ))}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4 p-6 md:p-12 relative z-10">
              <div className="flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6"
                >
                  <span className="inline-block bg-[var(--primary)]/20 text-[var(--primary)] px-4 py-1 rounded-full text-sm mb-4">
                    بزن روش! 👆
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    زبان‌آموزی{" "}
                    <span className="text-[var(--primary)]">تعاملی</span> و
                    <span className="relative ml-2">
                      باحال
                      <motion.svg
                        width="100%"
                        height="8"
                        viewBox="0 0 100 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute -bottom-2 left-0 w-full"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      >
                        <path
                          d="M1 5.5C20 -0.5 50 9.5 99 1.5"
                          stroke="var(--primary)"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </motion.svg>
                    </span>
                  </h2>
                  <p className="text-gray-300 mb-6">
                    همیشه خواستی زبان یاد بگیری ولی حوصله نداشتی؟ ما راهکار
                    خفنشو داریم! روی کلمات کلیک کن تا جادو رو ببینی! ✨
                  </p>
                </motion.div>

                {mounted && (
                  <div className="relative p-6 rounded-xl bg-white/5 backdrop-blur-sm">
                    <div className="text-lg text-gray-200 leading-relaxed">
                      {"من عاشق تماشای ".split(" ").map((word, i) => (
                        <span key={i} className="text-white">
                          {word}{" "}
                        </span>
                      ))}

                      <motion.span
                        className="relative inline-block cursor-pointer bg-[var(--primary)]/10 px-2 py-1 rounded-md text-[var(--primary)] font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setWordDetailModalData({
                            isOpen: true,
                            wordData: MoviesWordStaticContent,
                          });
                        }}
                      >
                        movies
                        <motion.div
                          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--primary)]"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </motion.span>

                      {" هستم و با زبانو ".split(" ").map((word, i) => (
                        <span key={i} className="text-white">
                          {word}{" "}
                        </span>
                      ))}

                      <motion.span
                        className="relative inline-block cursor-pointer bg-[var(--primary)]/10 px-2 py-1 rounded-md text-[var(--primary)] font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setWordDetailModalData({
                            isOpen: true,
                            wordData: LearnWordStaticContent,
                          });
                        }}
                      >
                        learn
                        <motion.div
                          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--primary)]"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: 0.5,
                          }}
                        />
                      </motion.span>

                      {" می‌کنم. ".split(" ").map((word, i) => (
                        <span key={i} className="text-white">
                          {word}{" "}
                        </span>
                      ))}

                      <motion.span
                        className="relative inline-block cursor-pointer bg-[var(--primary)]/10 px-2 py-1 rounded-md text-[var(--primary)] font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setWordDetailModalData({
                            isOpen: true,
                            wordData: AmazingWordStaticContent,
                          });
                        }}
                      >
                        amazing
                        <motion.div
                          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--primary)]"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: 1,
                          }}
                        />
                      </motion.span>

                      {" است!".split(" ").map((word, i) => (
                        <span key={i} className="text-white">
                          {word}{" "}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-gray-400">
                      کلمات رنگی رو لمس کن تا معنی‌شون رو ببینی! همینقدر ساده
                      است! 😎
                    </div>
                  </div>
                )}
              </div>

              {/* Interactive animation side */}
              <div className="flex items-center justify-center p-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative w-full max-w-md aspect-square"
                >
                  {mounted && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="w-full h-full rounded-full border-4 border-dashed border-[var(--primary)]/30" />
                    </motion.div>
                  )}

                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ rotate: 45 }}
                    animate={{
                      rotate: [45, 405],
                    }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="w-4/5 h-4/5 rounded-full border-4 border-dashed border-purple-500/20" />
                  </motion.div>

                  {/* Center interactive element */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      className="relative w-48 h-48 bg-gradient-to-br from-[var(--primary)] to-amber-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,168,0,0.3)]"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <motion.div
                        className="absolute inset-2 rounded-full border-4 border-white/20"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 15,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      <motion.div
                        className="text-6xl"
                        animate={{
                          rotate: [0, 10, -10, 10, 0],
                          scale: [1, 1.1, 1, 1.1, 1],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                      >
                        🌟
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Orbiting elements */}
                  {mounted && (
                    <>
                      {["🎬", "🎮", "🎧", "📱", "🏆"].map((emoji, i) => (
                        <motion.div
                          key={`orbit-${i}`}
                          className="absolute w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                          style={{
                            top: "50%",
                            left: "50%",
                            marginLeft: -24,
                            marginTop: -24,
                          }}
                          animate={{
                            x: [
                              Math.cos((i * (Math.PI * 2)) / 5) * 120,
                              Math.cos((i * (Math.PI * 2)) / 5 + Math.PI * 2) *
                                120,
                            ],
                            y: [
                              Math.sin((i * (Math.PI * 2)) / 5) * 120,
                              Math.sin((i * (Math.PI * 2)) / 5 + Math.PI * 2) *
                                120,
                            ],
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 10 + i * 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <span className="text-2xl">{emoji}</span>
                        </motion.div>
                      ))}
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#1a1a1a] via-[#232323] to-[#2a2a2a] relative overflow-hidden">
        {/* Fun Background Elements */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-20 right-10 w-32 h-32 rounded-full bg-purple-500/10 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2,
              }}
            />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-block mb-4 bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent text-lg font-bold"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              اینا رو ببین! 👀
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              نظرات <span className="text-[var(--primary)]">دوستای خفنمون</span>
            </h2>
            <p className="text-gray-400 text-lg">
              ببین بقیه درموردمون چی میگن 😉
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
                  text: "وااای عالیه! دیگه مثل قبلا سر کلاس خوابم نمی‌بره! سریال می‌بینم و زبان یاد می‌گیرم! 🤩",
                  avatar: "👩‍🎓",
                  color: "from-pink-500 to-purple-500",
                },
                {
                  name: "علی رضایی",
                  role: "مهندس نرم‌افزار",
                  text: "عجب هک باحالی برای یادگیری! دیکشنری و پخش‌کننده هوشمندش فوق‌العاده‌ست! برنامه‌نویساش خیلی خفنن! 💻",
                  avatar: "👨‍💻",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  name: "مریم حسینی",
                  role: "معلم زبان",
                  text: "به شاگردام میگم: دیگه بهونه نیارید! زبانو رو نصب کنید و باهاش فیلم ببینید. یادگیری رو صدبرابر می‌کنه! 🚀",
                  avatar: "👩‍🏫",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  name: "محمد رضایی",
                  role: "دانشجوی زبان آلمانی",
                  text: "آلمانی یادگرفتن با زبانو مثل آب خوردنه! دیگه لازم نیست اون کتابای خسته‌کننده رو بخونم! 🇩🇪",
                  avatar: "👨‍🎓",
                  color: "from-yellow-500 to-orange-500",
                },
                {
                  name: "نازنین کریمی",
                  role: "مترجم",
                  text: "به عنوان مترجم، زبانو جزو ابزارهای اصلی‌م شده. سریع‌ترین راه برای تقویت لغاته! 💎",
                  avatar: "👩‍💼",
                  color: "from-purple-500 to-indigo-500",
                },
              ].map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{
                      y: -10,
                      transition: { duration: 0.3 },
                    }}
                    className="group relative h-full pt-12"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div
                      className={`relative bg-[#1E1E1E] backdrop-blur-sm rounded-2xl p-8 border-2 border-transparent group-hover:border-gradient-${testimonial.color} transition-all duration-300 h-full shadow-lg`}
                    >
                      {/* Glow effect on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-tr ${testimonial.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      ></div>

                      {/* Avatar Circle with Gold Border */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <motion.div
                          className={`w-16 h-16 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-3xl shadow-lg border-4 border-[#1E1E1E] backdrop-blur-sm`}
                          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          {testimonial.avatar}
                        </motion.div>
                      </div>

                      <div className="pt-10 text-center">
                        <div className="text-white font-semibold text-lg mb-1 flex items-center justify-center gap-1">
                          {testimonial.name}
                          <motion.span
                            animate={{ rotate: [0, 5, 0, 5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            ✌️
                          </motion.span>
                        </div>
                        <div
                          className={`bg-gradient-to-r ${testimonial.color} bg-clip-text text-transparent text-sm mb-6`}
                        >
                          {testimonial.role}
                        </div>
                        <div className="text-gray-300 text-sm leading-relaxed">
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
              .border-gradient-from-pink-500 {
                border-image: linear-gradient(to right, #ec4899, #a855f7);
                border-image-slice: 1;
              }
              .border-gradient-from-blue-500 {
                border-image: linear-gradient(to right, #3b82f6, #06b6d4);
                border-image-slice: 1;
              }
              .border-gradient-from-green-500 {
                border-image: linear-gradient(to right, #22c55e, #10b981);
                border-image-slice: 1;
              }
              .border-gradient-from-yellow-500 {
                border-image: linear-gradient(to right, #eab308, #f97316);
                border-image-slice: 1;
              }
              .border-gradient-from-purple-500 {
                border-image: linear-gradient(to right, #a855f7, #6366f1);
                border-image-slice: 1;
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

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black/20 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-white/10 mb-12"
          >
            <ul className="space-y-3 text-right">
              <li className="text-gray-300 flex items-center justify-end flex-row-reverse gap-2">
                <span>کوییز نامحدود از همه محتوا‌ها</span>
                <span className="text-[var(--primary)]">✓</span>
              </li>
              <li className="text-gray-300 flex items-center justify-end flex-row-reverse gap-2">
                <span>
                  می‌توانید با یک اشتراک به صورت همزمان در چند دستگاه مختلف
                  زبانو رو تماشا کنید.
                </span>
                <span className="text-[var(--primary)]">✓</span>
              </li>
              <li className="text-gray-300 flex items-center justify-end flex-row-reverse gap-2">
                <span>ذخیره نامحدود کلمات در فلش‌کارت‌ها</span>
                <span className="text-[var(--primary)]">✓</span>
              </li>
              <li className="text-gray-300 flex items-center justify-end flex-row-reverse gap-2">
                <span>امکان استفاده از زیرنویس چند زبانه</span>
                <span className="text-[var(--primary)]">✓</span>
              </li>
              <li className="text-gray-300 flex items-center justify-end flex-row-reverse gap-2">
                <span>
                  دسترسی به بیش از 3000 ساعت محتوای آموزشی (انیمیشن ، فیلم ،
                  موزیک ، کتاب)
                </span>
                <span className="text-[var(--primary)]">✓</span>
              </li>
            </ul>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              {
                name: "ماهانه",
                price: "99,000",
                period: "تومان",
                features: [],
                discount: "",
                popular: false,
                color: "from-blue-500/10 to-purple-500/10",
                borderColor: "border-blue-500/20",
                buttonClass:
                  "bg-white/10 hover:bg-white/20 text-white border border-white/20",
              },
              {
                name: "سه ماهه",
                price: "199,000",
                period: "تومان",
                features: [],
                discount: "30%",
                popular: false,
                color: "from-[var(--primary)]/20 to-orange-600/20",
                borderColor: "border-[var(--primary)]",
                buttonClass:
                  "bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white",
              },
              {
                name: "شش ماهه",
                price: "299,000",
                period: "تومان",
                features: [],
                discount: "35%",
                popular: true,
                color: "from-purple-500/10 to-pink-500/10",
                borderColor: "border-purple-500/20",
                buttonClass:
                  "bg-white/10 hover:bg-white/20 text-white border border-white/20",
              },
              {
                name: "سالانه",
                price: "499,000",
                period: "تومان",
                features: [],
                discount: "40%",
                popular: false,
                color: "from-green-500/10 to-blue-500/10",
                borderColor: "border-green-500/20",
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
                        پرفروش‌ترین
                      </div>
                    </div>
                  )}

                  {/* Plan Name & Price */}
                  <div className="mb-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    {plan.discount && (
                      <span className="inline-block bg-pink-500/20 text-pink-300 text-sm px-3 py-1 rounded-full mb-2">
                        {plan.discount}
                      </span>
                    )}
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-[var(--primary)]">
                        {plan.price}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {plan.period}
                      </span>
                    </div>
                  </div>

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
                    <Link href={"/app/subscriptions"}>خرید</Link>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-32 bg-gradient-to-b from-[#2a2a2a] via-[#232323] to-[#1a1a1a] relative overflow-hidden">
        {/* Background Elements */}
        {mounted && (
          <div className="absolute inset-0 pointer-events-none">
            <motion.div className="absolute w-full h-full" initial={false}>
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.1, 0.8, 0.1],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
              <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 2,
                }}
              />
            </motion.div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center px-4 relative z-10"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block bg-gradient-to-r from-pink-500 to-orange-500 text-white text-sm px-4 py-1 rounded-full mb-6"
          >
            آخرین فرصت! 🔥
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] via-yellow-400 to-[var(--primary)]">
              آماده‌ای که خفن‌ترین نسخه خودت بشی؟
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            همین الان به جمع آدم‌های باحال زبانو بپیوند و زبان رو به سبک{" "}
            <span className="font-bold text-white mx-1">خودت</span> یاد بگیر!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-5 bg-gradient-to-r from-[var(--primary)] to-amber-500 text-white rounded-full text-lg font-bold shadow-[0_0_20px_rgba(255,168,0,0.3)] hover:shadow-[0_0_30px_rgba(255,168,0,0.5)] transition-all duration-300 w-full sm:w-auto"
            >
              <Link
                href="/login"
                className="flex items-center justify-center gap-2"
              >
                <span>همین الان شروع کن</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🚀
                </motion.span>
              </Link>
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="text-gray-300 hover:text-white transition-colors duration-300 font-medium underline decoration-dashed underline-offset-4 decoration-[var(--primary)]/50 cursor-pointer"
              onClick={() => (window.location.href = "#plans")}
            >
              <Link href={"/public/home"}>اول یه نگاهی بندازم! 👀</Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 flex justify-center items-center gap-1 text-gray-400"
          >
            <span>یادگیری رو از همین الان شروع کن!</span>
            <motion.span
              animate={{
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              🧠
            </motion.span>
          </motion.div>
        </motion.div>
      </section>
      {wordDetailModalData.isOpen && (
        <StaticWordDetail
          open={wordDetailModalData.isOpen}
          toggleModal={() =>
            setWordDetailModalData({ isOpen: false, wordData: null })
          }
          wordData={wordDetailModalData.wordData}
        />
      )}
    </div>
  );
};

export default NewLanding;
