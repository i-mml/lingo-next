"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import BookIcon from "@mui/icons-material/Book";
import WordIcon from "@mui/icons-material/Translate";
import { useAuth } from "@/hooks/use-auth";
import { isMobile } from "react-device-detect";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const BottomNavigation = () => {
  const pathname = usePathname();
  const { whoAmI } = useAuth();
  const preferredLanguage = whoAmI?.userpreference?.preferred_language;

  const navItems = [
    {
      id: 1,
      label: "دسته‌بندی‌ها",
      icon: CategoryIcon,
      href: "/public/home",
    },
    {
      id: 2,
      label: "واژه‌آموزی",
      icon: WordIcon,
      href: `/public/vocabulary`,
    },
    {
      id: 3,
      label: "یادگیری",
      icon: BookIcon,
      href: "/app/units",
    },
    {
      id: 4,
      label: "گرامرها",
      icon: AutoStoriesIcon,
      href: `/public/grammar-list`,
    },
    // {
    //   id: 4,
    //   label: "کلاس‌آنلاین",
    //   icon: CalendarMonthIcon,
    //   href: `${
    //     preferredLanguage && preferredLanguage === 5 ? "/de" : "/en"
    //   }/public/group-classes`,
    // },
    {
      id: 5,
      label: "پروفایل",
      icon: PersonIcon,
      href: "/app/account",
    },
  ];

  if (!isMobile) return null;

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-backgroundMain border-t border-borderMain z-50"
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center justify-center w-full h-full relative ${
                  isActive ? "text-primary" : "text-gray400"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;
