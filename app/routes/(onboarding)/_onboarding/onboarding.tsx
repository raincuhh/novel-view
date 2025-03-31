import React, { ElementType } from "react";
import { ViewTransitionProvider } from "@/shared/providers/viewTransitionProvider";
import { createFileRoute, Link } from "@tanstack/react-router";
import { OnboardingViews } from "@/pages/onboarding/types";
import Welcome from "@/pages/onboarding/components/ui/welcome";
import loginOnboardingFlow from "@/pages/onboarding/components/ui/loginOnboardingFlow";
import { AnimatedTransitionContent } from "@/shared/components/utils/AnimatedTransitionContent";
import RegisterOnboardingFlow from "@/pages/onboarding/components/ui/registerOnboardingFlow";

const viewComponents: Record<OnboardingViews, ElementType> = {
	[OnboardingViews.welcome]: Welcome,
	[OnboardingViews.registerOnboardingFlow]: RegisterOnboardingFlow,
	[OnboardingViews.loginOnboardingFlow]: loginOnboardingFlow,
};

export const Route = createFileRoute("/(onboarding)/_onboarding/onboarding")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="absolute h-screen w-screen flex flex-col">
			<div className="py-6 px-6 lg:px-8 sm:mx-auto sm:w-full sm:max-w-sm h-full">
				<ViewTransitionProvider
					initialView={OnboardingViews.welcome}
					duration={250}
					type={OnboardingViews}
				>
					<div className="flex-1 overflow-hidden w-full h-full relative">
						<AnimatedTransitionContent<OnboardingViews> viewComponents={viewComponents} />
					</div>
				</ViewTransitionProvider>
			</div>
		</div>
	);
}
