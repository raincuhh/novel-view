import { motion, AnimatePresence, Variants, VariantLabels } from "framer-motion";
import { useViewTransition, ViewTransitionProvider } from "@/shared/providers/viewTransitionProvider";
import { ElementType } from "react";

export const variants = {
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

type AnimatedTransitionContentProps<T extends string | number | symbol> = {
	viewComponents: Record<T, ElementType>;
	initial?: T;
	animate?: T;
	variants?: Variants;
};

export const AnimatedTransitionContent = <T extends string | number | symbol>({
	viewComponents,
	initial = "center" as T,
	animate = "center" as T,
	variants,
}: AnimatedTransitionContentProps<T>) => {
	const { currentView, direction } = useViewTransition<T>();
	const Comp = (viewComponents[currentView as keyof typeof viewComponents] as ElementType) || null;

	return (
		<AnimatePresence mode="popLayout" custom={direction}>
			<motion.div
				key={currentView as string}
				custom={direction}
				initial={initial as VariantLabels}
				animate={animate as VariantLabels}
				exit="exit"
				variants={variants}
				transition={{ duration: 0.25 }}
				className="inset-0 w-full h-full overflow-hidden relative"
			>
				{Comp && <Comp />}
			</motion.div>
		</AnimatePresence>
	);
};
