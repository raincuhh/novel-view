import { User as SupabaseUser } from "@supabase/supabase-js";

export enum UserRoles {
	user = "user",
	admin = "admin",
}

export type User = SupabaseUser & {
	user_id?: string;
	username?: string;
	role?: UserRoles;
	dob?: DateOfBirth;
	gender?: GenderType;
};

export type DateOfBirth = `${number}-${number}-${number}`;

export enum Gender {
	Male = "Male",
	Female = "Female",
	NonBinary = "NonBinary",
	Other = "Other",
	PreferNotToSay = "PreferNotToSay",
}

export type GenderType = keyof typeof Gender;
