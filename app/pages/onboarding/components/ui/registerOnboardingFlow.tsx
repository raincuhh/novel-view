import React, { ElementType } from "react";
import { OnboardingRegisterViews } from "@/pages/onboarding/types";
import RegisterOptions from "./registerOptions";
import RegisterEmailForm from "./registerEmailForm";
import RegisterPasswordForm from "./registerPasswordForm";
import RegisterGenderForm from "./registerGenderForm";
import RegisterDOBForm from "./registerPasswordForm";
import RegisterUsernameForm from "./registerUsernameForm";
import RegisterFinish from "./registerFinish";

const viewComponents: Record<OnboardingRegisterViews, ElementType> = {
	[OnboardingRegisterViews.registerOptions]: RegisterOptions,
	[OnboardingRegisterViews.registerEmailForm]: RegisterEmailForm,
	[OnboardingRegisterViews.registerPasswordForm]: RegisterPasswordForm,
	[OnboardingRegisterViews.registerGenderForm]: RegisterGenderForm,
	[OnboardingRegisterViews.registerDOBForm]: RegisterDOBForm,
	[OnboardingRegisterViews.registerUsernameForm]: RegisterUsernameForm,
	[OnboardingRegisterViews.registerFinish]: RegisterFinish,
};
export default function RegisterOnboardingFlow() {
	return <div>RegisterOnboardingFlow</div>;
}
