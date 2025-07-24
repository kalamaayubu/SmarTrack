// app/api/notify-users/route.js
import { NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';
import { sendNotification } from '../../../lib/firebase/sendNotification';

const SERVER_SECRET = process.env.SERVER_SECRET_TOKEN;

export async function POST(req) {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.split('Bearer ')[1];

  if (token !== SERVER_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await createClient();

  // Get current time in total minutes (since midnight)
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Fetch all users who have enabled notifications
  const { data: users, error } = await supabase
    .from('attendance_logs')
    .select('fcm_token, check_in, check_out, notifications_enabled')
    .eq('notifications_enabled', true);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Filter users whose check-in or check-out time is near current time(+/-1 min)
  const eligible = users.filter(user => {
    const checkInMin = convertToMinutes(user.check_in);
    const checkOutMin = convertToMinutes(user.check_out);

    return (
      user.fcm_token && // Ensure a user has a valid FCM token
      (
        Math.abs(currentMinutes - checkInMin) <= 1 ||
        Math.abs(currentMinutes - checkOutMin) <= 1
      )
    );
  });

  if (eligible.length === 0) {
    return NextResponse.json({ message: 'No users to notify at this time.' });
  }

  await sendNotification({
    title: 'SmartTrack Alert',
    body: 'Hey there, its time check in or out!',
    recipients: eligible.map(user => ({ endpoint: user.fcm_token }))
  });

  return NextResponse.json({ message: 'Notifications sent', count: eligible.length });
}

// Converts time string to total minutes(from midnight)
function convertToMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') return -1;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}
