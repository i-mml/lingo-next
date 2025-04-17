"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Wifi, WifiOff } from "lucide-react";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    // Don't run on server
    if (typeof window === "undefined") return;

    const handleOnline = () => {
      setIsOnline(true);
      toast.success("اتصال اینترنت برقرار شد", {
        icon: <Wifi size={18} />,
        autoClose: 3000,
        position: "bottom-center",
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.warning("اتصال اینترنت قطع شد. از محتوای آفلاین استفاده کنید", {
        icon: <WifiOff size={18} />,
        autoClose: 5000,
        position: "bottom-center",
      });
    };

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Clean up
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}

// Component to show content based on online status
export function OnlineStatusAware({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const isOnline = useOnlineStatus();

  if (!isOnline && fallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
