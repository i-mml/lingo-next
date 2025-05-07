"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import CategoryIcon from "@mui/icons-material/Category";
import BookIcon from "@mui/icons-material/Book";

const navItems = [
  {
    label: "خانه",
    icon: HomeIcon,
    href: "/public/home",
  },
  {
    label: "دسته‌بندی‌ها",
    icon: CategoryIcon,
    href: "/en/public/group-classes",
  },
  {
    label: "یادگیری",
    icon: BookIcon,
    href: "/app/units",
  },
  {
    label: "کلاس‌آنلاین",
    icon: CalendarMonthIcon,
    href: "public/settings",
  },
  {
    label: "پروفایل",
    icon: PersonIcon,
    href: "/public/profile",
  },
];

const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-backgroundMain border-t border-gray-200 dark:border-gray-800 z-50"
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
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
