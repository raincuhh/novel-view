import React, { useEffect, useState } from "react";
import { useRegisterFormStore, registerFormSchema } from "../../registerFormStore";
import { Button } from "@/shared/components/ui/button";
import { CombinedOnboardingViews } from "../../types";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";

const RegisterEmailSchema = registerFormSchema.pick({
	email: true,
});

export default function RegisterEmailForm() {
	const { viewSwitcherNavigate } = useViewTransition<CombinedOnboardingViews>();
	const { formData, updateField } = useRegisterFormStore();
	const [email, setEmail] = useState(formData.email);
	const [error, setError] = useState<string | null>(null);
	const [isValid, setIsValid] = useState<boolean>(false);

	useEffect(() => {
		const result = RegisterEmailSchema.safeParse({ email });
		setIsValid(result.success);
	}, [email]);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);

		const result = RegisterEmailSchema.safeParse({ email: value });
		setIsValid(result.success);

		if (!result.success) {
			setError(result.error.errors[0].message);
		} else {
			setError(null);
			updateField({ email: value });
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
				{error && <p className="text-red-500 text-sm">{error}</p>}
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
