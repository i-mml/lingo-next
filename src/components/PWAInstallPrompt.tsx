"use client";

import { useEffect, useState } from "react";
import { Button, Snackbar, Alert, Box, Typography } from "@mui/material";
import { InstallMobile, Close } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { isIOS, isMobileSafari } from "react-device-detect";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export default function PWAInstallPrompt() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const pathname = usePathname();

  // Check if current path is public or landing page
  const isPublicPath = pathname?.startsWith("/public") || pathname === "/";

  // Only show on iOS and only on public pages
  const shouldShowPrompt = isIOS && isPublicPath;

  useEffect(() => {
    // If not iOS or not on public pages, don't show
    if (!shouldShowPrompt) return;

    // Check if already installed
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as NavigatorWithStandalone).standalone === true
    ) {
      return; // Already installed, no need to show prompt
    }

    // For iOS we'll show a custom prompt since beforeinstallprompt doesn't work there
    if (isIOS && isMobileSafari) {
      // Check if we should show the prompt (not shown in the last 7 days)
      const lastPromptDate = localStorage.getItem("pwaPromptLastShown");
      if (
        !lastPromptDate ||
        Date.now() - parseInt(lastPromptDate) > 7 * 24 * 60 * 60 * 1000
      ) {
        setShowPrompt(true);
        localStorage.setItem("pwaPromptLastShown", Date.now().toString());
      }
    } else {
      // Save the install prompt event for later use (for non-iOS)
      const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
        e.preventDefault();
        setInstallPrompt(e);

        // Check if we should show the prompt (not shown in the last 7 days)
        const lastPromptDate = localStorage.getItem("pwaPromptLastShown");
        if (
          !lastPromptDate ||
          Date.now() - parseInt(lastPromptDate) > 7 * 24 * 60 * 60 * 1000
        ) {
          setShowPrompt(true);
          localStorage.setItem("pwaPromptLastShown", Date.now().toString());
        }
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

      return () => {
        window.removeEventListener(
          "beforeinstallprompt",
          handleBeforeInstallPrompt
        );
      };
    }
  }, [shouldShowPrompt, pathname]);

  const handleInstallClick = async () => {
    if (isIOS) {
      // iOS installation guide toast
      setShowPrompt(false);
    } else if (installPrompt) {
      try {
        await installPrompt.prompt();
        const choice = await installPrompt.userChoice;

        // Reset the install prompt state
        setInstallPrompt(null);
        setShowPrompt(false);
      } catch (error) {
        console.error("Error during installation:", error);
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember user dismissed this for 3 days
    localStorage.setItem(
      "pwaPromptLastShown",
      (Date.now() + 3 * 24 * 60 * 60 * 1000).toString()
    );
  };

  if (!showPrompt || !shouldShowPrompt) return null;

  return (
    <Snackbar
      open={showPrompt}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{
        mb: 2,
        maxWidth: { xs: "95%", sm: 500 },
        "& .MuiAlert-root": {
          width: "100%",
        },
      }}
    >
      <Alert
        severity="info"
        variant="filled"
        sx={{
          alignItems: "flex-start",
          p: 2,
          direction: "rtl",
          textAlign: "right",
        }}
        action={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              color="primary"
              size="small"
              variant="contained"
              onClick={handleInstallClick}
              startIcon={<InstallMobile />}
              sx={{ mr: 1, whiteSpace: "nowrap" }}
            >
              نصب
            </Button>
            <Button color="inherit" size="small" onClick={handleDismiss}>
              <Close />
            </Button>
          </Box>
        }
      >
        <Typography variant="body1" sx={{ mb: 1, fontWeight: "bold" }}>
          نسخه وب اپلیکیشن زبانو را نصب کنید
        </Typography>
        <Typography variant="body2">
          با نصب وب اپلیکیشن زبانو، نوتیفیکیشن های یادآوری و تخفیف های روز را
          دریافت کنید و تجربه بهتری داشته باشید.
        </Typography>
      </Alert>
    </Snackbar>
  );
}
