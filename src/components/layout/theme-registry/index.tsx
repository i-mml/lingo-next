"use client";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import useThemeCreator from "@/hooks/useTheme";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { theme } = useThemeCreator();

  if (!mounted) return null;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <div dir={theme.direction}>{children}</div>
    </MuiThemeProvider>
  );
}
