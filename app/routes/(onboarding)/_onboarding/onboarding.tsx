import { useViewTransition, ViewTransitionProvider } from "@/shared/providers/viewTransitionProvider";
import { createFileRoute, Link } from "@tanstack/react-router";
import { OnboardingViews } from "@/pages/onboarding/types";
import Welcome from "@/pages/onboarding/components/ui/welcome";
import Login from "@/features/auth/components/ui/login";
import Register from "@/features/auth/components/ui/register";
import { motion, AnimatePresence } from "framer-motion";

const viewComponents: Record<OnboardingViews, React.ElementType> = {
	[OnboardingViews.welcome]: Welcome,
	[OnboardingViews.register]: Register,
	[OnboardingViews.login]: Login,
};

const variants = {
	enter: (direction: number) => ({
		x: direction > 0 ? "120%" : "-120%",
		opacity: 0,
	}),
	center: { x: 0, opacity: 1 },
	exit: (direction: number) => ({
		x: direction < 0 ? "120%" : "-120%",
		opacity: 0,
	}),
};

const OnboardingContent = () => {
	const { currentView, direction } = useViewTransition<OnboardingViews>();
	const Component = viewComponents[currentView] || null;

	return (
		<AnimatePresence mode="popLayout" custom={direction}>
			<motion.div
				key={currentView}
				custom={direction}
				initial="enter"
				animate="center"
				exit="exit"
				variants={variants}
				transition={{ duration: 0.3 }}
				className="inset-0 w-full h-full overflow-hidden"
			>
				<Component />
			</motion.div>
		</AnimatePresence>
	);
};

// const OnboardingContent = () => {
// 	const { currentView } = useViewTransition<OnboardingViews>();
// 	const Component = viewComponents[currentView] || null;
// 	return Component ? <Component /> : null;
// };

export const Route = createFileRoute("/(onboarding)/_onboarding/onboarding")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="py-6 sm:mx-auto sm:w-full sm:max-w-sm">
			<div className="text-center mb-4">top level header</div>
			<ViewTransitionProvider initialView={OnboardingViews.welcome} duration={300} type={OnboardingViews}>
				<OnboardingContent />
			</ViewTransitionProvider>
		</div>
	);
}
