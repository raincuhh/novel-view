import React, { PropsWithChildren, useEffect } from "react";
import pipe from "../lib/pipe";
import withProvider from "../components/utils/withProvider";
import { ReactQueryProvider } from "./reactQueryProvider";
import { useAuthStore } from "@/features/auth/authStore";

type AppProviderProps = PropsWithChildren<{}>;

const AppProvider = ({ children }: AppProviderProps) => {
	const initAuth = useAuthStore((state) => state.initAuth);

	const AppWithProviders: React.ComponentType<PropsWithChildren> = pipe(withProvider(ReactQueryProvider))(
		(props: PropsWithChildren<{}>) => <>{props.children}</>
	);

	useEffect(() => {
		const cleanup = initAuth();
		return cleanup;
	}, [initAuth]);

	return <AppWithProviders>{children}</AppWithProviders>;
};

export default AppProvider;
