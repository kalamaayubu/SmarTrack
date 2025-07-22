'use server'

import { createClient } from "../supabase/server"

export async function getUsersToNotifyNow() {
    const supabase = await createClient()
    const now = new Date().toTimeString().slice(0, 5); // "HH:MM"
    
    const { data } = await supabase
        .from('notification_logs')
        .select('fcm_token')
        .eq('notification_enabled', true)
        .or(`check_in_time.eq.${now},check_out_time.eq.${now}`);

    return data ?? [] // Return data if available else and empty array
}