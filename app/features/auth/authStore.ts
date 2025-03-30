import { User, UserRoles } from "@/shared/types";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { supabase } from "@/shared/lib/services";

type AuthState = {
	user: User | null;
	session: Session | null;
	loading: boolean;
	register: (email: string, password: string, username: string) => Promise<User | null>;
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
	loading: false,

	setUser: (user) => set({ user }),
	setSession: (session) => set({ session }),
	setLoading: (loading) => set({ loading }),

	register: async (email, password, username) => {
		try {
			const { data, error } = await supabase.auth.signUp({ email, password });

			if (error) throw error;

			if (data.user) {
				await supabase.from("profiles").insert({
					user_id: data.user.id,
					username: username,
					role: UserRoles.user,
				});

				const user: User = {
					...data.user,
					user_id: data.user.id,
					username: username,
					role: UserRoles.user,
				};

				set({ user });
				return user;
			}

			return null;
		} catch (err: any) {
			console.error("Error registering user:", err);
			return null;
		}
	},

	login: async (email, password) => {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({ email, password });

			if (error) throw error;

			if (data.session) {
				const { data: profile, error: profileError } = await supabase
					.from("profiles")
					.select("*")
					.eq("user_id", data.session.user.id)
					.single();

				if (profileError) {
					console.error("Error fetching user profile:", profileError);
					throw profileError;
				}

				set({
					session: data.session,
					user: {
						...data.session.user,
						...profile,
					},
				});
			}
		} catch (err: any) {
			console.error("Error during login:", err);
			throw err;
		}
	},

	logout: async () => {
		await supabase.auth.signOut();
		set({ user: null, session: null });
	},

	initAuth: () => {
		console.log("initializing auth!");
		const fetchUser = async (session: Session | null) => {
			set({ loading: true });

			if (!session?.user) {
				set({ user: null, session: null, loading: false });
				return;
			}

			const { data, error } = await supabase
				.from("profiles")
				.select("*")
				.eq("user_id", session.user.id)
				.single();

			if (error) {
				console.error("Error fetching user: ", error);
				set({ loading: false });
				return;
			}

			set({ user: data, session, loading: false });
		};

		supabase.auth.getSession().then(({ data }) => {
			fetchUser(data.session);
		});

		const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
			fetchUser(session);
		});

		return () => {
			authListener?.subscription?.unsubscribe();
		};
	},
}));
