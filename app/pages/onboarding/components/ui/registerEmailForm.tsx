import React, { useState } from "react";
import { useRegisterFormStore, baseRegisterFormSchema } from "../../registerFormStore";
import { Button } from "@/shared/components/ui/button";
import { CombinedOnboardingViews } from "../../types";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";
import { FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import OnboaridngViewContainer from "./onboardingViewContainer";

const registerEmailSchema = baseRegisterFormSchema.pick({
	email: true,
});

export default function RegisterEmailForm() {
	const { viewSwitcherNavigate } = useViewTransition<CombinedOnboardingViews>();
	const { formData, updateField } = useRegisterFormStore();

	// const [email, setEmail] = useState<string>(formData.email);
	const [error, setError] = useState<string | null>(null);
	const [isValid, setIsValid] = useState<boolean>(
		registerEmailSchema.safeParse({ email: formData.email }).success
	);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		updateField({ email: value });

		const result = registerEmailSchema.safeParse({ email: value });
		setError(result.success ? null : result.error.errors[0]?.message);
		setIsValid(result.success);
	};

	return (
		<OnboaridngViewContainer className="justify-start gap-4">
			<div className="flex flex-col gap-8 mt-12">
				<FormItem>
					<FormLabel id="emailLabel" htmlFor="email" error={error} className="text-2xl font-extrabold">
						Email Address
					</FormLabel>
					<FormControl>
						<Input
							id="email"
							name="email"
							type="email"
							autoComplete="on"
							onChange={handleEmailChange}
							placeholder="Enter email"
							aria-labelledby="emailLabel"
						/>
					</FormControl>
					<FormDescription>You will need to verify this email later.</FormDescription>
					<FormMessage error={error} />
				</FormItem>
			</div>
			<div className="flex w-full justify-center">
				<Button
					size="lg"
					rounded="full"
					variant="accent"
					disabled={!isValid}
					onClick={() => viewSwitcherNavigate(CombinedOnboardingViews.registerPasswordForm)}
					aria-label="next"
				>
					Next
				</Button>
			</div>
		</OnboaridngViewContainer>
	);
}
