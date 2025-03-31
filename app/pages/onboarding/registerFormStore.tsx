import { create } from "zustand";
import { z } from "zod";
import { Gender } from "@/shared/lib/types";

export const registerFormSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(8, "Password must be at least 8 characters").max(20),
	repeatPassword: z.string().min(8).max(20),
	gender: z.enum(["Male", "Female", "NonBinary", "Other", "PreferNotToSay"]),
	DOB: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
	username: z.string().min(2, "Username must be at least 2 characters"),
	terms: z.boolean().refine((data) => data),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;

type RegisterFormState = {
	formData: RegisterFormData;
	updateField: (data: Partial<RegisterFormData>) => void;
	isFormValid: () => boolean;
	resetForm: () => void;
};

export const useRegisterFormStore = create<RegisterFormState>((set, get) => ({
	formData: {
		email: "",
		password: "",
		repeatPassword: "",
		gender: Gender.PreferNotToSay,
		DOB: "",
		username: "",
		terms: false,
	},

	updateField: (data) => {
		const newState = { ...get().formData, ...data };
		const parsed = registerFormSchema.safeParse(newState);
		if (!parsed.success) {
			console.error("Validation failed:", parsed.error.errors);
			return;
		}
		set({ formData: newState });
	},

	isFormValid: () => {
		const parsed = registerFormSchema.safeParse(get().formData);
		return parsed.success;
	},

	resetForm: () =>
		set({
			formData: {
				email: "",
				password: "",
				repeatPassword: "",
				gender: Gender.PreferNotToSay,
				DOB: "",
				username: "",
				terms: false,
			},
		}),
}));
