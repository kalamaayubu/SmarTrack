'use server'

import { SettingsForm } from "@/types";
import { createClient } from "../supabase/server";


export async function saveNotificationChanges(data: SettingsForm) {
    const supabase = await createClient()

    const { data: attendanceLogsData, error } = await supabase
        .from("attendance_logs")
        .upsert({
            check_in: data.checkInTime,
            check_out: data.checkOutTime,
            notifications_enabled: data.notificationsEnabled,
            fcm_token: 'This is the token'
        }, { ignoreDuplicates: true })
        .select("*")
        .maybeSingle()

        console.log('TIME', data.checkInTime)

    if (error) {
        console.log("Error saving changes", error)
        return { success: false, error: error.message }
    }

    console.log("Data", attendanceLogsData)

    return { success: true, message: 'Preference Saved successfully'}
}