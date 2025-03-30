import { getEnvVar } from "./utils";

const SUPABASE_URL: string = getEnvVar("SUPABASE_URL");
const SUPABASE_PUBLIC_ANON_KEY: string = getEnvVar("SUPABASE_PUBLIC_ANON_KEY");

export const env = {
	SUPABASE_URL,
	SUPABASE_PUBLIC_ANON_KEY,
};
