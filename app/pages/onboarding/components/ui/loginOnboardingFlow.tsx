import React, { ElementType } from "react";
import { OnboardingLoginViews } from "@/pages/onboarding/types";
import { ViewTransitionProvider } from "@/shared/providers/viewTransitionProvider";
import LoginOptions from "./loginOptions";
import LoginForm from "@/features/auth/components/ui/loginForm";
import ForgotPasswordForm from "@/features/auth/components/ui/forgotPasswordForm";
import VerifyEmailForm from "@/features/auth/components/ui/verifyEmailForm";
import ResetPasswordForm from "@/features/auth/components/ui/resetPasswordForm";
import { AnimatedTransitionContent } from "@/shared/components/utils/AnimatedTransitionContent";

const viewComponents: Record<OnboardingLoginViews, ElementType> = {
	[OnboardingLoginViews.loginOptions]: LoginOptions,
	[OnboardingLoginViews.loginForm]: LoginForm,
	[OnboardingLoginViews.forgotPasswordForm]: ForgotPasswordForm,
	[OnboardingLoginViews.verifyEmailForm]: VerifyEmailForm,
	[OnboardingLoginViews.resetPasswordForm]: ResetPasswordForm,
};

export default function LoginOnboardingFlow() {
	return (
		<div className="flex flex-col h-full">
			<ViewTransitionProvider
				initialView={OnboardingLoginViews.loginOptions}
				duration={250}
				type={OnboardingLoginViews}
			>
				<AnimatedTransitionContent<OnboardingLoginViews> viewComponents={viewComponents} />
			</ViewTransitionProvider>
		</div>
	);
}
