import { createTheme, responsiveFontSizes } from "@mui/material";
import { useLanguage } from "../store";
import { getDirection } from "@/utils/get-direction";
import { useTheme } from "next-themes";

const breakpoints = {
  values: {
    xs: 0,
    sm: 601,
    md: 1025,
    lg: 1450,
    xl: 1921,
  },
};

const darkTheme = createTheme({
  breakpoints,
  typography: {
    fontFamily: ["Dana"].join(","),
    allVariants: {
      fontFamily: "inherit",
    },
  },
  direction: "rtl",
  palette: {
    type: "dark",
    primary: {
      main: "#ffa800",
    },
    background: {
      // @ts-ignore
      main: "#161b1b",
      layout: "#191f1f",
      primary: "#ffa800",
      disabled: "#737373",
      tab: "#262626",
      activeTab: "#404040",
    },
    text: {
      primary: "#ffa800",
      // @ts-ignore
      main: "#fffff9",
      gray400: "#9CA3AF",
      gray300: "#D1D5DB",
      gray200: "#e5e7eb",
      placeholder: "#6B7280",
      black: "#000",
    },
    border: {
      main: "#393939",
      selected: "#ffa800",
    },
  },
});
const lightTheme = createTheme({
  breakpoints,
  direction: "rtl",
  palette: {
    type: "light",
    primary: {
      main: "#ffa800",
    },
    background: {
      // @ts-ignore
      main: "#ffffff", // Light background
      layout: "#f5f5f5", // Slightly off-white for layout
      primary: "#ffa800", // White for primary backgrounds
      disabled: "#efefef", // Very light grey for disabled states
      tab: "#FeFeFe",
      activeTab: "red",
    },
    text: {
      primary: "#ffa800", // Black for primary text
      // @ts-ignore
      main: "#333", // Darker grey for main text
      gray400: "#7a7a7a", // Lighter grey for less important text
      gray300: "#a9a9a9", // Even lighter grey for very subtle text
      gray200: "#e5e7eb",
      placeholder: "#9CA3AF", // Slightly darker grey for placeholders
      black: "#000", // Black for special cases like error messages
    },
    border: {
      main: "#E0E0E0", // Light grey for borders
      selected: "#ffa800", // Primary color for selected items
    },
  },
});

const useThemeCreator = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "light" ? "dark" : "light";
  const directionTheme = getDirection(language);
  darkTheme.direction = directionTheme;
  lightTheme.direction = directionTheme;

  let themeResult = null;

  themeResult = responsiveFontSizes(isDark ? darkTheme : lightTheme);

  return { theme: themeResult };
};

export default useThemeCreator;
