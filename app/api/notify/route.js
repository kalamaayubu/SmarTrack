import { NextResponse } from 'next/server';
import { createClient } from '@/supabase/server';
import { sendNotification } from '../../../lib/firebase/sendNotification';

const SERVER_SECRET = process.env.SERVER_SECRET_TOKEN;

export async function POST(req) {
  // Authorization check using SERVER_SECRET
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.split('Bearer ')[1];

  console.log('TOKEN:', token)


  if (token !== SERVER_SECRET) {
    console.log('Unauthorized');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await createClient();

  // Get current time in minutes since midnight
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Fetch users with notifications enabled
  const { data: users, error } = await supabase
    .from('attendance_logs')
    .select('fcm_token, check_in, check_out, notifications_enabled')
    .eq('notifications_enabled', true);

  if (error) {
    console.log('Error fetching users:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Filter users who are due for check-in or check-out and attach a tailored message
  const eligible = users
    .map(user => {
      if (!user.fcm_token) return null;

      const checkInMin = convertToMinutes(user.check_in);
      const checkOutMin = convertToMinutes(user.check_out);

      if (Math.abs(currentMinutes - checkInMin) == 0) {
        return {
          ...user,
          message: 'Hey, it’s time to check in at Swahilipot!',
        };
      }

      if (Math.abs(currentMinutes - checkOutMin) == 0) {
        return {
          ...user,
          message: 'Hey, it’s time to check out at Swahilipot!',
        };
      }

      return null;
    })
    .filter(Boolean); // remove nulls

  if (eligible.length === 0) {
    console.log('No users to notify at this time');
    return NextResponse.json({ message: 'No users to notify at this time.' });
  }

  // Send notifications one by one with tailored messages
  for (const user of eligible) {
    await sendNotification({
      title: 'SmartTrack Alert',
      body: user.message,
      recipients: [{ endpoint: user.fcm_token }],
    });
  }

  return NextResponse.json({
    message: 'Notifications sent successfully',
    count: eligible.length,
  });
}

// Convert "HH:MM" string to total minutes since midnight
function convertToMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') return -1;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}
