importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  const notificationOptions = {
    body: payload.notification.body,
    image: payload.notification.image,
    icon: payload.notification.icon,
  };

  new Notification(payload?.notification?.title, notificationOptions);
});
