

importScripts("https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js");

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAEQ73R8YgCrUAsDVg6fLljj1btFyRvrxE",
  authDomain: "smartrack-5edd0.firebaseapp.com",
  projectId: "smartrack-5edd0",
  storageBucket: "smartrack-5edd0.firebasestorage.app",
  messagingSenderId: "255285040960",
  appId: "1:255285040960:web:8235386c847b8ea4020ca5"
})

// Initialize FCM to enable this(sw) to receive push notifications from firebase servers
const messaging = firebase.messaging()

// Listen to background messages from firebase servers
messaging.onBackgroundMessage((payload) => {
    // Extract the required details from the payload
    const notificationTitle = payload.notification?.title || "SmarTrack"
    const notificationOptions = {
        body: payload.notification?.body || "You have a new message from SmarTrack. Please check it out",
        icon: "/assets/icons/logo2.svg",
        data: { url: payload.fcmOptions?.link || "/"} // Redirect to the homepage when clicked
    };

    // Display push notification
    self.ServiceWorkerRegistration.showNotification(notificationTitle, notificationOptions)
});

// Handle notification click events
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    const targetUrl = event.notification.data?.url || "/"

    event.waitUntil(
        clients.mathcAll({ type: "window", includeUncontrolled: true}) /* Get all browser tabs controlled by this service worker */
        .then((clientList) => {
            // Loop through each open tab/window
            for(const client of clientList) {
                if (client.url.includes(targetUrl) && "focus" in client) {
                    return client.focus() // If a matching tab exists, bring it to the front
                }
            }

            // If no matching tab is found, open a new one
            return clients.openWindow(targetUrl);
        })
    );
});