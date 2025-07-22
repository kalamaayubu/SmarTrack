// Deno-compatible imports
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.5";
import { format } from "https://esm.sh/date-fns@3.6.0";


serve(async () => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const currentTime = format(new Date(), 'HH:mm');
  const baseUrl = 
    Deno.env.get("NODE_ENV") === "development" 
        ? 'http://localhost:3000'
        : 'https://checkngo.netlify.app';

  const { data: users, error } = await supabase
    .from('users')
    .select('id, fcm_token, check_in') // Adapt to your schema
    .eq('check_in', currentTime);

  if (error) {
    console.error('Error querying users:', error.message);
    return new Response('Error querying users', { status: 500 });
  }

  if (users.length === 0) {
    console.log('⏰ No users to notify at this time.');
    return new Response('No notifications sent', { status: 200 });
  }

  const notifyPayload = {
    title: "Time to check in!",
    body: "Tap here to mark your attendance",
    recipients: users,
  };

  // Make POST request to your Next.js API route to trigger FCM
  const response = await fetch(`${baseUrl}/api/notify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notifyPayload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to trigger notification:", errorText);
    return new Response("Notification failed", { status: 500 });
  }

  return new Response('✅ Notifications sent.', { status: 200 });
});
