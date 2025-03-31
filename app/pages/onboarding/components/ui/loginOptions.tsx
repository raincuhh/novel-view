import React, { ElementType } from "react";
import { OnboardingViews } from "@/pages/onboarding/types";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";
import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/ui/icon";

export default function LoginOptions() {
	const { viewSwitcherNavigate } = useViewTransition<OnboardingViews>();

	return (
		<div className="flex flex-col justify-end h-full">
			<div className="flex justify-center pb-4">
				<Icon.brandLogo className="w-24 h-24 md:w-32 md:h-32 fill-accent hover:fill-accent-hover transition-discrete duration-100 ease-in-out" />
			</div>
			<h1 className="mb-16 text-center text-2xl md:text-3xl font-bold text-normal">
				Welcome Back! Log in to continue
			</h1>
			<div className="flex flex-col gap-2 mb-8">
				<Button variant="accent" rounded="full" size="lg">
					Continue with email
				</Button>
				<Button variant="outline" rounded="full" size="lg">
					Continue with Google
				</Button>
			</div>
			<div className="mb-2 text-sm font-medium text-center flex flex-col">
				<p>Dont have an account?</p>
				<Button variant="link" onClick={() => viewSwitcherNavigate(OnboardingViews.registerOptions)}>
					Register Now
				</Button>
			</div>
		</div>
	);
}
