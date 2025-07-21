import admin, { ServiceAccount } from 'firebase-admin'

const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID!,
    private_key: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL!
} as ServiceAccount

// Ensure that firebase is initialized once
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log('Firebase Admin Initialized Successfully');
    } catch (error) {
        console.error('Firebase Admin Initialization Failed:', error);
    }
}

export default admin