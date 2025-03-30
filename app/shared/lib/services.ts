import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY } from "../env";

if (!SUPABASE_URL || !SUPABASE_PUBLIC_ANON_KEY) {
	throw new Error("Supabase URL or Public Key is missing");
}

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY);
