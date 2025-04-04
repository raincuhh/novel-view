import React, { useState } from "react";
import OnboardingViewContainer from "./onboardingViewContainer";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";
import { CombinedOnboardingViews } from "../../types";
import { baseRegisterFormSchema, useRegisterFormStore } from "../../registerFormStore";
import { Button } from "@/shared/components/ui/button";
import Checkbox from "@/shared/components/ui/checkbox";
import ReadOnlyFormDisplay from "@/shared/components/ui/readOnlyFormDisplay";
import { Form } from "@/shared/components/ui/form";
import { Link } from "@tanstack/react-router";

const registerTermsSchema = baseRegisterFormSchema.pick({ terms: true, privacy: true });

export default function RegisterFinish() {
	const { viewSwitcherNavigate } = useViewTransition<CombinedOnboardingViews>();
	const { formData, updateField } = useRegisterFormStore();

	const [isValid, setIsValid] = useState<boolean>(
		registerTermsSchema.safeParse({ terms: formData.terms, privacy: formData.privacy }).success
	);

	const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = e.target.checked;
		updateField({ terms: isChecked });
		setIsValid(isChecked && formData.privacy);
	};

	const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = e.target.checked;
		updateField({ privacy: isChecked });
		setIsValid(formData.terms && isChecked);
	};

	const handleTermsAndPrivacyChange = () => {
		const isChecked = formData.terms && formData.privacy;
		setIsValid(isChecked);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("finalizing form...");
		console.log("formData: ", formData);
		if (isValid) {
			viewSwitcherNavigate(CombinedOnboardingViews.registerEmailForm);
		}
	};

	return (
		<OnboardingViewContainer>
			<Form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-8 mt-12">
					<div className="flex flex-col gap-4">
						<h1 className="text-2xl font-semibold select-none">Overview</h1>
						<ReadOnlyFormDisplay data={formData.email} label="Email" />
						<ReadOnlyFormDisplay data={formData.password} label="Password" isCensored={true} />
						<ReadOnlyFormDisplay data={formData.gender} label="Gender" />
						<ReadOnlyFormDisplay data={formData.DOB} label="Date of Birth" />
						<ReadOnlyFormDisplay data={formData.username} label="Username" />
					</div>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<p className="text-normal">
									By agreeing to the{" "}
									<Link to="/legal/tos" className="text-accent hover:text-accent-hover font-bold">
										Terms of Use
									</Link>
									, you acknowledge that you have read, understood, and agreed to the policies
									governing your usage of the app.
								</p>
								<Checkbox
									onChange={handleTermsChange}
									checked={formData.terms ?? false}
									text="I agree to the Terms of Use"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<p className="text-muted">
									By agreeing to the{" "}
									<Link
										to="/legal/privacy-policy"
										className="text-accent hover:text-accent-hover font-bold"
									>
										Privacy Policy
									</Link>
									, you acknowledge that you have read, understood, and agreed to how we collect,
									store, and manage your personal information.
								</p>
								<Checkbox
									onChange={handlePrivacyChange}
									checked={formData.privacy ?? false}
									text="I agree to the Privacy Policy"
								/>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<Checkbox
								onChange={handleTermsAndPrivacyChange}
								checked={formData.terms && formData.privacy}
								text="I agree to the Terms of Use and Privacy Policy"
							/>
						</div>
					</div>
				</div>
				<div className="flex w-full justify-center">
					<Button size="lg" rounded="full" variant="accent" disabled={!isValid} aria-label="next">
						Finish
					</Button>
				</div>
			</Form>
		</OnboardingViewContainer>
	);
}
