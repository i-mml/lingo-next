import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axiosInstance from "@/api/configs";

const firebaseConfig = {
  apiKey: "AIzaSyCH-ov0vgXrAuAkA8-_i2RBOS-ceI23Nmc",
  authDomain: "zabano-website.firebaseapp.com",
  projectId: "zabano-website",
  storageBucket: "zabano-website.firebasestorage.app",
  messagingSenderId: "1067814372671",
  appId: "1:1067814372671:web:e0458ccb69211222c0bf8a",
  measurementId: "G-YTKN5S092G",
};

// Initialize variables conditionally
let app: any = null;
let messaging: any = null;

// Check environment first
const isSupportedEnvironment = () => {
  // Check for Instagram in-app browser
  if (/Instagram/.test(navigator.userAgent)) {
    console.warn("Notifications not supported in Instagram in-app browser.");
    return false;
  }

  // Check for service worker support
  if (!("serviceWorker" in navigator)) {
    console.warn("Service Worker not supported.");
    return false;
  }

  // Check for Notification API support
  if (!("Notification" in window)) {
    console.warn("Notifications API not supported.");
    return false;
  }

  return true;
};

const initializeFirebase = () => {
  if (!app && !messaging) {
    app = initializeApp(firebaseConfig);
    messaging = getMessaging(app);
  }
};

export const requestForToken = async () => {
  if (!isSupportedEnvironment()) return;

  initializeFirebase();

  try {
    let permission = await Notification.requestPermission();
    const lastSent = localStorage.getItem("lastTokenSent");
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (permission !== "granted") {
      console.log("Notification permission denied.");
      return;
    }
    if (lastSent && now - parseInt(lastSent) < oneDay) return;

    try {
      const currentToken = await getToken(messaging, {
        vapidKey:
          "BO3u6Y96TFXP_Ntbv0-JgXPwsZaZHnmepxc-xj2hgxgqbFEJbyLXnWevuz1_HbRdn0JlIuDdRRpnX4qNhdlwhP0",
      });
      if (currentToken) {
        console.log("FCM Token:", currentToken);

        await axiosInstance
          .post("/auth/push-tokens/", {
            token: currentToken,
            provider: "site",
          })
          .then(() => localStorage.setItem("lastTokenSent", now.toString()));
      }
    } catch (error) {
      console.error("Error getting FCM token:", error);
    }
    // Handle foreground messages only if supported
    onMessage(messaging, (payload) => {
      console.log("Foreground Message:", payload);
      if (!("Notification" in window)) return;

      const notificationOptions = {
        body: payload.notification?.body,
        image: payload.notification?.image,
        icon: "https://zabano.com/main-icon.png",
      };

      try {
        new Notification(
          payload.notification?.title as any,
          notificationOptions
        );
      } catch (notificationError) {
        console.error("Error showing notification:", notificationError);
      }
    });
  } catch (error) {
    console.error("Notification setup error:", error);
  }
};

// const setupNotifications = async () => {
//   // Early exit for Instagram browser
//   if (isInstagramInAppBrowser) {
//     console.warn("Notifications not supported in Instagram in-app browser.");
//     return;
//   }

//   // Check for required features first
//   if (!("serviceWorker" in navigator)) {
//     console.warn("Service Worker not supported.");
//     return;
//   }

//   try {
//     let permission = await Notification.requestPermission();

//     if (permission !== "granted") {
//       console.log("Notification permission denied.");
//       return;
//     }

//     console.log("Notification permission granted.");

//     try {
//       // const token = await getToken(messaging, {
//       //   vapidKey: 'BO3u6Y96TFXP_Ntbv0-JgXPwsZaZHnmepxc-xj2hgxgqbFEJbyLXnWevuz1_HbRdn0JlIuDdRRpnX4qNhdlwhP0' // Add your VAPID key here
//       // });
//       let token = await messaging.getToken({
//         vapidKey: "BO3u6Y96TFXP_Ntbv0-JgXPwsZaZHnmepxc-xj2hgxgqbFEJbyLXnWevuz1_HbRdn0JlIuDdRRpnX4qNhdlwhP0",
//       });
//       alert(token);

//       await axiosInstance.post("/auth/push-tokens/", {
//         token,
//         provider: "site",
//       });
//     } catch (tokenError) {
//       console.error("Error getting token:", tokenError);
//       return;
//     }

//     // Handle foreground messages only if supported
//     onMessage(messaging, (payload) => {
//       console.log("Foreground Message:", payload);
//       if (!("Notification" in window)) return;

//       const notificationOptions = {
//         body: payload.notification?.body,
//         image: payload.notification?.image,
//         icon: "https://zabano.com/main-icon.png",
//       };

//       try {
//         new Notification(payload.notification?.title, notificationOptions);
//       } catch (notificationError) {
//         console.error("Error showing notification:", notificationError);
//       }
//     });
//   } catch (error) {
//     console.error("Notification setup error:", error);
//   }
// };

// export { setupNotifications };
