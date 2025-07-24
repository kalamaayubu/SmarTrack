import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

const SERVER_SECRET = process.env.SERVER_SECRET_TOKEN;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export async function POST(req) {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split("Bearer ")[1];

  if (token !== SERVER_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, body: messageBody, recipients } = body;

  if (!title || !messageBody || !recipients || !Array.isArray(recipients)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const responses = await Promise.all(
    recipients.map(async ({ endpoint }) => {
      try {
        const response = await admin.messaging().send({
          token: endpoint,
          notification: {
            title,
            body: messageBody,
          },
        });

        return { success: true, response };
      } catch (error) {
        return { success: false, error: error.message };
      }
    })
  );

  return NextResponse.json({ success: true, results: responses });
}
