import React, { ElementType } from "react";
import { ViewTransitionProvider } from "@/shared/providers/viewTransitionProvider";
import { createFileRoute } from "@tanstack/react-router";
import { CombinedOnboardingViews } from "@/pages/onboarding/types";
import { AnimatedTransitionContent } from "@/shared/components/utils/AnimatedTransitionContent";
import Welcome from "@/pages/onboarding/components/ui/welcome";
import LoginOptions from "@/pages/onboarding/components/ui/loginOptions";
import LoginForm from "@/features/auth/components/ui/loginForm";
import ResetPasswordForm from "@/features/auth/components/ui/resetPasswordForm";
import ForgotPasswordForm from "@/features/auth/components/ui/forgotPasswordForm";
import VerifyEmailForm from "@/features/auth/components/ui/verifyEmailForm";
import RegisterOptions from "@/pages/onboarding/components/ui/registerOptions";
import RegisterEmailForm from "@/pages/onboarding/components/ui/registerEmailForm";
import RegisterPasswordForm from "@/pages/onboarding/components/ui/registerPasswordForm";
import RegisterGenderForm from "@/pages/onboarding/components/ui/registerGenderForm";
import RegisterDOBForm from "@/pages/onboarding/components/ui/registerDOBForm";
import RegisterUsernameForm from "@/pages/onboarding/components/ui/registerUsernameForm";
import RegisterFinish from "@/pages/onboarding/components/ui/registerFinish";

const viewComponents: Record<CombinedOnboardingViews, ElementType> = {
	//top
	[CombinedOnboardingViews.welcome]: Welcome,
	[CombinedOnboardingViews.loginOptions]: LoginOptions,
	[CombinedOnboardingViews.registerOptions]: RegisterOptions,

	//login flow
	[CombinedOnboardingViews.loginForm]: LoginForm,
	[CombinedOnboardingViews.resetPasswordForm]: ResetPasswordForm,
	[CombinedOnboardingViews.forgotPasswordForm]: ForgotPasswordForm,
	[CombinedOnboardingViews.verifyEmailForm]: VerifyEmailForm,

	//register flow
	[CombinedOnboardingViews.registerEmailForm]: RegisterEmailForm,
	[CombinedOnboardingViews.registerPasswordForm]: RegisterPasswordForm,
	[CombinedOnboardingViews.registerGenderForm]: RegisterGenderForm,
	[CombinedOnboardingViews.registerDOBForm]: RegisterDOBForm,
	[CombinedOnboardingViews.registerUsernameForm]: RegisterUsernameForm,
	[CombinedOnboardingViews.registerFinish]: RegisterFinish,
};

export const Route = createFileRoute("/(onboarding)/_onboarding/onboarding")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="absolute h-screen w-screen flex flex-col">
			<div className="py-6 px-6 lg:px-8 sm:mx-auto sm:w-full sm:max-w-sm h-full">
				<ViewTransitionProvider
					initialView={CombinedOnboardingViews.welcome}
					duration={250}
					type={CombinedOnboardingViews}
				>
					<div className="flex-1 overflow-hidden w-full h-full relative">
						<AnimatedTransitionContent<CombinedOnboardingViews>
							viewComponents={viewComponents}
							initial="enter"
						/>
					</div>
				</ViewTransitionProvider>
			</div>
		</div>
	);
}
