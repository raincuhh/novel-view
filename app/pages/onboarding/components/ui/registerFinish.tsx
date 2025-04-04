import React, { useState } from "react";
import OnboardingViewContainer from "./onboardingViewContainer";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";
import { CombinedOnboardingViews } from "../../types";
import { baseRegisterFormSchema, useRegisterFormStore } from "../../registerFormStore";
import { Button } from "@/shared/components/ui/button";
import Checkbox from "@/shared/components/ui/checkbox";
import ReadOnlyFormDisplay from "@/shared/components/ui/readOnlyFormDisplay";

const registerTermsSchema = baseRegisterFormSchema.pick({ terms: true });

export default function RegisterFinish() {
	const { viewSwitcherNavigate } = useViewTransition<CombinedOnboardingViews>();
	const { formData, updateField } = useRegisterFormStore();

	const [isValid, setIsValid] = useState<boolean>(
		registerTermsSchema.safeParse({ terms: formData.terms }).success
	);

	const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = e.target.checked;
		updateField({ terms: isChecked });
		setIsValid(isChecked);
	};

	const handleSubmit = () => {
		console.log("finalizing form...");
		console.log("formData: ", formData);
	};

	return (
		<OnboardingViewContainer className="justify-start gap-4">
			<div className="flex flex-col gap-8 mt-12">
				<div className="flex flex-col gap-4">
					<h1 className="text-2xl font-semibold select-none">Overview</h1>
					<ReadOnlyFormDisplay data={formData.email} label="Email" />
					<ReadOnlyFormDisplay data={formData.password} label="Password" isCensored={true} />
					<ReadOnlyFormDisplay data={formData.gender} label="Gender" />
					<ReadOnlyFormDisplay data={formData.DOB} label="Date of Birth" />
					<ReadOnlyFormDisplay data={formData.username} label="Username" />
				</div>
				<div className="flex flex-col gap-2">
					<p className="text-muted">
						By agreeing to the <span className="font-bold">Terms of Use</span>, you acknowledge that you
						have read and understood them.
					</p>
					<Checkbox onChange={handleTermsChange} text="I agree to the Terms of Use" />
				</div>
			</div>
			<div className="flex w-full justify-center">
				<Button
					size="lg"
					rounded="full"
					variant="accent"
					disabled={!isValid}
					onClick={handleSubmit}
					aria-label="next"
				>
					Finish
				</Button>
			</div>
		</OnboardingViewContainer>
	);
}
