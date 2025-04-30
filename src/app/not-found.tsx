"use client";

import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useThemeCreator from "@/hooks/use-theme";

const Particle = ({
  x,
  y,
  size,
  delay,
}: {
  x: number;
  y: number;
  size: number;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    className="absolute rounded-full bg-blue-500/20 dark:bg-blue-400/20"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
    }}
  />
);

export default function NotFound() {
  const router = useRouter();
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  const { theme }: any = useThemeCreator();

  useEffect(() => {
    controls.start({
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
  }, [controls]);

  const particles = Array.from({ length: 15 }).map((_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 20 + 10,
    delay: Math.random() * 2,
  }));

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative"
      style={{
        background: theme?.palette?.background?.main,
        color: theme?.palette?.text?.main,
      }}
    >
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <Particle key={i} {...particle} />
        ))}
      </div>

      <div className="text-center relative z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="relative"
        >
          <motion.h1
            className="text-9xl font-bold mb-4 relative"
            style={{ color: theme?.palette?.text?.main }}
            animate={controls}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            ۴۰۴
            <motion.div
              animate={{
                scale: isHovered ? 1.2 : 1,
                rotate: isHovered ? 360 : 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="absolute -top-4 -right-4"
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="text-4xl"
              >
                🚀
              </motion.div>
            </motion.div>
          </motion.h1>
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-semibold mb-6"
          style={{ color: theme?.palette?.text?.main }}
        >
          صفحه مورد نظر یافت نشد
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 max-w-md mx-auto"
          style={{ color: theme?.palette?.text?.gray300 }}
        >
          به نظر می‌رسد صفحه مورد نظر شما به سفری کیهانی رفته است. نگران نباشید،
          ما به شما کمک می‌کنیم تا به مسیر اصلی برگردید!
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/public/home")}
            className="px-6 py-3 rounded-lg font-medium transition-all duration-300 relative overflow-hidden group"
            style={{
              background: theme?.palette?.background?.primary,
              color: theme?.palette?.text?.main,
            }}
          >
            <span className="relative z-10">صفحه اصلی</span>
            <motion.div
              className="absolute inset-0"
              style={{ background: theme?.palette?.background?.gray200 }}
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex justify-center gap-4"
        >
          {["🌍", "🎯", "✨"].map((emoji, index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
              className="text-2xl cursor-pointer hover:scale-125 transition-transform"
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
