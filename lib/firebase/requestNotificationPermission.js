// Request notification permission, retrieve FCM token and save it

import { toast } from "sonner";
import { getToken, messaging } from "./firebaseConfig";

export const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission() // Request notification permission

        if (permission !== "granted") {
            console.warn("Notification permission denied.");
            toast.error('Notificaton permission denied')
            return;
        }

        // Register the service worker from firebase-messaging-sw.js
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js")
        console.log("Service Worker registered:", registration);

        // Request FCM token and link to the sw
        const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            serviceWorkerRegistration: registration // Link token to sw, allowing proper notification delivery by FCM
        })

        const oldToken = localStorage.getItem('fcm_token')

        if (!token) {
            console.warn("Failed to retrieve FCM token.");
            return;
        }

        // Save now token locally
        localStorage.setItem('fcm_token', token)

        // Return both old and new token in order to be able to detect rotation
        return { newToken: token, oldToken }; // Return the token
    } catch (error) {
        console.error('Error getting FCM token:', error)
    }
}