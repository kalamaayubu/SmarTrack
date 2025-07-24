import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req) => {
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const now = new Date().toTimeString().slice(0, 5); // "HH:MM"

  const { data: usersToNotify, error } = await supabaseClient
    .from('notification_logs')
    .select('fcm_token')
    .eq('notification_enabled', true)
    .or(`check_in_time.eq.${now},check_out_time.eq.${now}`);

  if (error) {
    console.error("Error fetching users:", error.message);
    return new Response("Error fetching users", { status: 500 });
  }

  if (!usersToNotify || usersToNotify.length === 0) {
    console.log("No users to notify at", now);
    return new Response("No notifications sent.", { status: 200 });
  }

  const payload = {
    title: "Checkngo says",
    body: "Its time, please mark your attendance.",
    recipients: usersToNotify.map(user => ({ endpoint: user.fcm_token }))
  };

  const baseUrl = Deno.env.get("ENV") === "production"
  ? "https://checkngo.netlify.app"
  : "http://localhost:3000";

  const fcmRes = await fetch(`${baseUrl}/api/notify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Deno.env.get("YOUR_SERVER_TOKEN")}`
    },
    body: JSON.stringify(payload)
  });

  const fcmText = await fcmRes.text();

  return new Response(
    `Notification function invoked. Status: ${fcmRes.status}. Response: ${fcmText}`,
    { status: fcmRes.ok ? 200 : 500 }
  );
});
