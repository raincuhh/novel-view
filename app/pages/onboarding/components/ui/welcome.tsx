import { Button } from "@/shared/components/ui/button";
import Icon from "@/shared/components/ui/icon";
import { OnboardingViews } from "../../types";
import { useViewTransition } from "@/shared/providers/viewTransitionProvider";
import React from "react";

export default function Welcome() {
	const { viewSwitcherNavigate } = useViewTransition<OnboardingViews>();

	return (
		<div className="flex flex-col">
			<div className="flex justify-center pb-8">
				<Icon.brandLogo className="w-32 h-32 fill-accent hover:fill-accent-hover transition-discrete duration-100 ease-in-out" />
			</div>
			<h1 className="mb-24 text-center text-3xl font-semibold">
				Your books, your library, your experience.
			</h1>
			<div className="flex flex-col gap-4 mb-8">
				<Button
					variant="accent"
					rounded="full"
					size="lg"
					onClick={() => viewSwitcherNavigate(OnboardingViews.register)}
				>
					Register
				</Button>
				<Button
					variant="outline"
					rounded="full"
					size="lg"
					onClick={() => viewSwitcherNavigate(OnboardingViews.login)}
				>
					Login
				</Button>
				{/* <div className="bg-info-danger-bg text-info-danger-text p-2 border-solid border-info-danger-border border rounded-sm">
					This is a danger alert box. Please proceed with caution.
				</div>
				<div className="bg-info-warning-bg text-info-warning-text p-2 border-solid border-info-warning-border border rounded-sm">
					This is a warning alert box. Please be aware of potential issues.
				</div>
				<div className="bg-info-success-bg text-info-success-text p-2 border-solid border-info-success-border border rounded-sm">
					This is a success alert box. Everything is working as expected.
				</div> */}
			</div>
		</div>
	);
}
