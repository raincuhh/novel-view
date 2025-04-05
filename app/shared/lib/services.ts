import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { env } from "./env";

if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
	throw new Error("Supabase URL or Public Key is missing");
}

export const supabase: SupabaseClient = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
