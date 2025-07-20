import { createServerClient } from "@supabase/ssr";


export async function createClient() {
    // Return supabase client configured for SSR
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => [],
                setAll: () => {},
            },
        }
    );
}