"use client";

import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Image from "next/image";

export default function Offline() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check if we're offline when the component mounts
    setIsOnline(navigator.onLine);

    // Event listeners for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetry = () => {
    // Force reload from server when user is back online
    if (navigator.onLine) {
      window.location.reload();
    }
  };

  // If online, don't show this page
  if (isOnline) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-backgroundMain">
      <div className="text-center max-w-md mx-auto">
        <Image
          src="/zabano-main-logo.png"
          alt="Zabano Logo"
          width={120}
          height={120}
          className="mx-auto mb-6"
        />

        <h1 className="text-2xl font-bold mb-4 text-textPrimary">
          اتصال به اینترنت برقرار نیست
        </h1>

        <p className="mb-6 text-textSecondary">
          به نظر می‌رسد دستگاه شما به اینترنت متصل نیست. محتوای آفلاین ذخیره شده
          قابل دسترسی است، اما برای تجربه کامل به اینترنت نیاز دارید.
        </p>

        <div className="space-y-4">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRetry}
            className="py-3"
          >
            تلاش مجدد
          </Button>

          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => window.history.back()}
            className="py-3"
          >
            بازگشت
          </Button>
        </div>
      </div>
    </div>
  );
}
