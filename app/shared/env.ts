import { getEnvVar } from "./utils";

export const SUPABASE_URL: string = getEnvVar("SUPABASE_URL");
export const SUPABASE_PUBLIC_ANON_KEY: string = getEnvVar("SUPABASE_PUBLIC_ANON_KEY");
