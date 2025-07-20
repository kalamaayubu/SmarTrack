// Import the functions you need from the SDKs you need
import { getMessaging, getToken, onMessage } from "@firebase/messaging";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEQ73R8YgCrUAsDVg6fLljj1btFyRvrxE",
  authDomain: "smartrack-5edd0.firebaseapp.com",
  projectId: "smartrack-5edd0",
  storageBucket: "smartrack-5edd0.firebasestorage.app",
  messagingSenderId: "255285040960",
  appId: "1:255285040960:web:8235386c847b8ea4020ca5"
};

// Initialize Firebase only when in the client side
let messaging;
if (typeof window !== "undefined" && "navigator" in window) {
    const app = initializeApp(firebaseConfig);
    messaging = getMessaging(app)
}

export { messaging, getToken, onMessage }


