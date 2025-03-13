import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@mui/material/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        main: "var(--main)",
        gray400: "var(--gray400)",
        gray300: "var(--gray300)",
        gray200: "var(--gray200)",
        placeholder: "var(--placeholder)",
        black: "var(--black)",

        backgroundMain: "var(--background-main)",
        backgroundLayout: "var(--background-layout)",
        backgroundDisabled: "var(--background-disabled)",
        backgroundTab: "var(--background-tab)",

        borderMain: "var(--border-main)",
        borderSelected: "var(--border-selected)",
      },
    },
  },
  plugins: [require("tailwindcss-rtl")],
  corePlugins: {
    preflight: true,
  },
} satisfies Config;
