import { NotificationProps } from "@/types";
import admin from "./firebaseAdmin";


// Purpose: Send push noification
export const sendNotification = async({ title, body, recipients }: NotificationProps) => {
    try {
        const response = await admin.messaging().sendEachForMulticast({
            tokens: recipients.map(recipient => recipient.endpoint),
            data: { title, body }
        });
        
        // console.log('FCM Multicast Response:', response);
        console.log(`Notification sent! Success: ${response.successCount}, Failures: ${response.failureCount}`)

        if (response.failureCount > 0) {
            response.responses.forEach((res, index) => {
                if (!res.success && res.error?.code === 'messaging/registration-token-not-registered') {
                    console.warn(`⚠️ Invalid token found: ${recipients[index].endpoint}`);
                }
            })
        }
    } catch (error) {
        console.error('Error sending notifications:', error)
    }
}