"use client";

import { useTheme } from "next-themes";
import React from "react";

const CatalogView = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-primary">
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="text-textColors-light-main dark:text-textColors-dark-main"
      >
        click me
      </button>
      <div className="w-10 h-10 rounded-md bg-gray400 !dark:bg-red-950"></div>
    </div>
  );
};

export default CatalogView;
