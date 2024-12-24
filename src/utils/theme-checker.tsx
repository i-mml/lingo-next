"use client";

import { useThemeType } from "@/store/useThemeType";
import { useLayoutEffect } from "react";

const ThemeChanger = () => {
  const { isDark } = useThemeType();

  useLayoutEffect(() => {
    const toggleTheme = () => {
      document.documentElement.classList.toggle("dark", !isDark);
    };
    toggleTheme();
    console.log(isDark);
  }, [isDark]);

  return null;
};

export default ThemeChanger;
