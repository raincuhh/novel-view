import React, { useEffect, useState } from "react";
import { baseRegisterFormSchema, useRegisterFormStore } from "../../registerFormStore";
import { Button } from "@/shared/components/ui/button";
import { CombinedOnboardingViews } from "../../types";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";

const RegisterPasswordSchema = baseRegisterFormSchema.pick({
	password: true,
	repeatPassword: true,
});

export default function RegisterPasswordForm() {
	const { viewSwitcherNavigate } = useViewTransition<CombinedOnboardingViews>();
	const { formData, updateField } = useRegisterFormStore();

	const [password, setPassword] = useState<string>(formData.password);
	const [repeatPassword, setRepeatPassword] = useState<string>(formData.repeatPassword);
	const [errors, setErrors] = useState<Partial<Record<"password" | "repeatPassword", string>>>({});
	const [isValid, setIsValid] = useState<boolean>(false);

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);
		updateField({ password: value });

		const result = RegisterPasswordSchema.safeParse({ password: value, repeatPassword });
		const errorMessages: Partial<Record<"password" | "repeatPassword", string>> = {};

		if (!result.success) {
			result.error.errors.forEach((err) => {
				errorMessages[err.path[0] as "password" | "repeatPassword"] = err.message;
			});
		}

		if (value !== repeatPassword) {
			errorMessages.repeatPassword = "Passwords do not match";
		}

		setErrors(errorMessages);
		setIsValid(Object.keys(errorMessages).length === 0);
	};

	const handleRepeatPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setRepeatPassword(value);
		updateField({ repeatPassword: value });

		const result = RegisterPasswordSchema.safeParse({ password, repeatPassword: value });
		const errorMessages: Partial<Record<"password" | "repeatPassword", string>> = {};

		if (!result.success) {
			result.error.errors.forEach((err) => {
				errorMessages[err.path[0] as "password" | "repeatPassword"] = err.message;
			});
		}

		if (password !== value) {
			errorMessages.repeatPassword = "Passwords do not match";
		}

		setErrors(errorMessages);
		setIsValid(Object.keys(errorMessages).length === 0);
	};

	return (
		<div className="flex flex-col h-full justify-between">
			<div className="flex flex-col">
				<label htmlFor="password" className="text-sm font-medium">
					Password
				</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={handlePasswordChange}
					placeholder="Enter password"
					className="border p-2 rounded-md w-full"
				/>
				{errors.password && <p className="text-info-danger-text text-sm">{errors.password}</p>}

				<label htmlFor="repeatPassword" className="text-sm font-medium mt-2">
					Confirm Password
				</label>
				<input
					id="repeatPassword"
					type="password"
					value={repeatPassword}
					onChange={handleRepeatPasswordChange}
					placeholder="Repeat password"
					className="border p-2 rounded-md w-full"
				/>
				{errors.repeatPassword && (
					<p className="text-info-danger-text text-sm">{errors.repeatPassword}</p>
				)}
			</div>
			<div className="flex w-full justify-center">
				<Button
					size="lg"
					rounded="full"
					variant="accent"
					disabled={!isValid}
					onClick={() => viewSwitcherNavigate(CombinedOnboardingViews.registerGenderForm)}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
