'use server'

import { createClient } from "@/supabase/server";
import { SettingsForm } from "@/types";


export async function saveNotificationChanges(data: SettingsForm & { fcm_token: string; old_token?: string | null }) {
    const supabase = await createClient()

    const { fcm_token: newToken, old_token: oldToken, ...preferences } = data;

    // Check if old token exists (from locaStorage)
    if (oldToken) {
        const { data: existingOld, error: findOldError } = await supabase
        .from('attendance_logs')
        .select('id')
        .eq('fcm_token', oldToken)
        .maybeSingle();

        if (findOldError) {
            return { success: false, message: 'Old token lookup failed' };
        }

            // If old token record found, update it with the new token
        if (existingOld) {
        const { error: updateError } = await supabase
            .from('attendance_logs')
            .update({
            fcm_token: newToken,
            check_in: preferences.checkInTime,
            check_out: preferences.checkOutTime,
            notifications_enabled: preferences.notificationsEnabled,
            })
            .eq('id', existingOld.id);

        if (updateError) {
            return { success: false, message: 'Failed to update with new token' };
        }

        return { success: true, message: 'Settings updated successfully' };
        }
    }

    // Old token not available or not found — fallback: check if new token already exists
    const { data: existingNew, error: findNewError } = await supabase
        .from('attendance_logs')
        .select('id')
        .eq('fcm_token', newToken)
        .maybeSingle();

    if (findNewError) {
        return { success: false, message: 'Token lookup failed' };
    }

    if (existingNew) {
        // Token already exists, just update preferences
        const { error: updateError } = await supabase
        .from('attendance_logs')
        .update({
            check_in: preferences.checkInTime,
            check_out: preferences.checkOutTime,
            notifications_enabled: preferences.notificationsEnabled,
        })
        .eq('id', existingNew.id);

        if (updateError) {
        return { success: false, message: 'Update failed' };
        }

        return { success: true, message: 'Settings updated successfully' };
    }

    // Insert new row
    const { error: insertError } = await supabase
        .from('attendance_logs')
        .insert({
        fcm_token: newToken,
        check_in: preferences.checkInTime,
        check_out: preferences.checkOutTime,
        notifications_enabled: preferences.notificationsEnabled,
        });

    if (insertError) {
        return { success: false, message: insertError.message };
    }

    return { success: true, message: 'Settings Saved successfully'}
}