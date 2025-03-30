import React from "react";
import { OnboardingViews } from "@/pages/onboarding/types";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";
import { Button } from "@/shared/components/ui/button";

export default function Register() {
	const { viewSwitcherNavigate } = useViewTransition<OnboardingViews>();

	return (
		<div>
			<Button
				variant="accent"
				rounded="full"
				size="lg"
				onClick={() => viewSwitcherNavigate(OnboardingViews.welcome)}
			>
				Go back to welcome
			</Button>
			<Button
				variant="accent"
				rounded="full"
				size="lg"
				onClick={() => viewSwitcherNavigate(OnboardingViews.login)}
			>
				Go to login
			</Button>
		</div>
	);
}
