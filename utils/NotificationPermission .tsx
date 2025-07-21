"use client"

import { requestNotificationPermission } from "@/lib/firebase/requestNotificationPermission";
import { useEffect } from "react";


const NotificationPermission  = () => {
    // Ask notification permission
    useEffect(() => {
      const subscribeUser = async () => {
        await requestNotificationPermission();
      };

      subscribeUser();
  }, []);

    return null
}
export default NotificationPermission;
