import React, { useReducer, createContext, useContext } from "react";

type ViewTransitionContextType<T> = {
	currentView: T;
	isAnimating: boolean;
	direction: number;
	navigate: (targetView: T) => void;
};

const ViewTransitionContext = createContext<ViewTransitionContextType<any> | null>(null);

type Action<T> =
	| { type: "CHANGE_VIEW"; payload: { view: T[keyof T]; direction: number } }
	| { type: "END_ANIMATION" };

const viewTransitionReducer = <T,>(state: any, action: Action<T>) => {
	switch (action.type) {
		case "CHANGE_VIEW":
			return {
				...state,
				currentView: action.payload.view,
				direction: action.payload.direction,
				isAnimating: true,
			};
		case "END_ANIMATION":
			return { ...state, isAnimating: false };
		default:
			return state;
	}
};

type ViewTransitionProviderProps<T extends Record<string, string>> = {
	initialView: T[keyof T];
	duration: number;
	type: T;
	children: React.ReactNode;
};

export const ViewTransitionProvider = <T extends { [key: string]: string }>({
	initialView,
	children,
	duration,
	type,
}: ViewTransitionProviderProps<T>) => {
	const [state, dispatch] = useReducer(viewTransitionReducer<T>, {
		currentView: initialView,
		isAnimating: false,
		direction: 0,
	});

	const getDirection = (targetView: T[keyof T]) => {
		const views = Object.values(type);
		return views.indexOf(targetView) > views.indexOf(state.currentView) ? 1 : -1;
	};

	const changeView = (newPage: T[keyof T], newDirection: number) => {
		if (state.isAnimating) return;
		dispatch({ type: "CHANGE_VIEW", payload: { view: newPage, direction: newDirection } });
		setTimeout(() => dispatch({ type: "END_ANIMATION" }), duration);
	};

	const viewSwitcherNavigate = (targetView: T[keyof T]) => {
		if (state.isAnimating) return;
		changeView(targetView, getDirection(targetView));
	};

	return (
		<ViewTransitionContext.Provider value={{ ...state, changeView, getDirection, viewSwitcherNavigate }}>
			{children}
		</ViewTransitionContext.Provider>
	);
};

export const useViewTransition = <T,>() => {
	const context = useContext(ViewTransitionContext);
	if (!context) throw new Error("useViewTransition must be used within a ViewTransitionProvider");
	return context as ViewTransitionContextType<T>;
};
