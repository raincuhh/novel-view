import { User, UserRoles } from "@/shared/types";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { supabase } from "@/shared/lib/services";

type AuthState = {
	user: User | null;
	session: Session | null;
	register: (email: string, password: string, first_name: string, last_name: string) => Promise<User | null>;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	setUser: (user: User | null) => void;
	setSession: (session: Session | null) => void;
	setLoading: (loading: boolean) => void;
	initAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	session: null,

	setUser: (user) => set({ user }),
	setSession: (session) => set({ session }),

	register: async (email, password, username) => {
		const { data, error } = await supabase.auth.signUp({ email, password });

		if (error) throw error;

		if (data.user) {
			await supabase.from("profiles").insert({
				user_id: data.user.id,
				username: username,
				role: UserRoles.user,
			});
		}

		set({ user: data.user });

		return data.user;
	},

	login: async (email, password) => {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) throw error;

		if (data.session) {
			set({ session: data.session, user: data.user });
		}
	},

	logout: async () => {
		await supabase.auth.signOut();
		set({ user: null, session: null });
	},
}));
