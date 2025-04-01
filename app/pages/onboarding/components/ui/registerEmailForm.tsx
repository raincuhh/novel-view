import React, { useState } from "react";
import { useRegisterFormStore, baseRegisterFormSchema } from "../../registerFormStore";
import { Button } from "@/shared/components/ui/button";
import { CombinedOnboardingViews } from "../../types";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";

const registerEmailSchema = baseRegisterFormSchema.pick({
	email: true,
});

export default function RegisterEmailForm() {
	const { viewSwitcherNavigate } = useViewTransition<CombinedOnboardingViews>();
	const { formData, updateField } = useRegisterFormStore();

	const [email, setEmail] = useState<string>(formData.email);
	const [error, setError] = useState<string | null>(null);
	const [isValid, setIsValid] = useState<boolean>(false);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);

		const result = registerEmailSchema.safeParse({ email: value });
		if (!result.success) {
			setError(result.error.errors[0]?.message);
			setIsValid(false);
		} else {
			setError(null);
			updateField({ email: value });
			setIsValid(true);
		}
	};

	return (
		<div className="flex flex-col h-full justify-between">
			<div className="flex flex-col">
				<label htmlFor="email" className="text-sm font-medium">
					Email Address
				</label>
				<input
					id="email"
					type="email"
					value={email}
					onChange={handleEmailChange}
					placeholder="Enter your email"
					className="border p-2 rounded-md w-full"
				/>
				{error && <p className="text-info-danger-text text-sm">{error}</p>}
			</div>
			<div className="flex w-full justify-center">
				<Button
					size="lg"
					rounded="full"
					variant="accent"
					disabled={!isValid}
					onClick={() => viewSwitcherNavigate(CombinedOnboardingViews.registerPasswordForm)}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
