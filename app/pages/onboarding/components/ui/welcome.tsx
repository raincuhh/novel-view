import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/ui/icon";
import { OnboardingViews } from "../../types";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";
import React from "react";

export default function Welcome() {
	const { viewSwitcherNavigate } = useViewTransition<OnboardingViews>();

	return (
		<div className="flex flex-col justify-end h-full">
			<div className="flex justify-center pb-4">
				<Icon.brandLogo className="w-24 h-24 md:w-32 md:h-32 fill-accent hover:fill-accent-hover transition-discrete duration-100 ease-in-out" />
			</div>
			<h1 className="mb-32 text-center text-2xl md:text-3xl font-bold">
				Your books, your library, your experience.
			</h1>
			<div className="flex flex-col gap-2 mb-8">
				<Button
					variant="accent"
					rounded="full"
					size="lg"
					onClick={() => viewSwitcherNavigate(OnboardingViews.registerOnboardingFlow)}
				>
					Register Now
				</Button>
				<Button
					variant="outline"
					rounded="full"
					size="lg"
					onClick={() => viewSwitcherNavigate(OnboardingViews.loginOnboardingFlow)}
				>
					Log in
				</Button>
			</div>
			<div className="mb-2 text-sm text-muted text-center">
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
			</div>
		</div>
	);
}
