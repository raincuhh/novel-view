import { useViewTransition, ViewTransitionProvider } from "@/shared/providers/viewTransitionProvider";
import { createFileRoute, Link } from "@tanstack/react-router";
import { OnboardingViews } from "@/pages/onboarding/types";
import Welcome from "@/pages/onboarding/components/ui/welcome";
import Finish from "@/pages/onboarding/components/ui/finish";
import Login from "@/features/auth/components/ui/login";
import Register from "@/features/auth/components/ui/register";

const viewComponents: Record<OnboardingViews, React.ElementType> = {
	[OnboardingViews.welcome]: Welcome,
	[OnboardingViews.finish]: Finish,
	[OnboardingViews.register]: Register,
	[OnboardingViews.login]: Login,
};

const OnboardingContent = () => {
	const { currentView } = useViewTransition<OnboardingViews>();
	const Component = viewComponents[currentView] || null;
	return Component ? <Component /> : null;
};

export const Route = createFileRoute("/(onboarding)/_onboarding/onboarding")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="py-6 sm:mx-auto sm:w-full sm:max-w-sm">
			<ViewTransitionProvider initialView={OnboardingViews.welcome} duration={300} type={OnboardingViews}>
				<OnboardingContent />
			</ViewTransitionProvider>
		</div>
	);
}
