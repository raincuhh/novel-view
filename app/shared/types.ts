import { User as SupabaseUser } from "@supabase/supabase-js";

export enum UserRoles {
	user = "user",
	admin = "admin",
}

export type User = SupabaseUser & {
	user_id?: string;
	username?: string;
	role?: UserRoles;
};
