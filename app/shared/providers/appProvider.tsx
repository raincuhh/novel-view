import React, { PropsWithChildren, useEffect } from "react";
import { useAuthStore } from "@/features/auth/authStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SystemProvider } from "./systemProvider";

type AppProviderProps = PropsWithChildren<{}>;

const AppProvider = ({ children }: AppProviderProps) => {
	const initAuth = useAuthStore((state) => state.initAuth);
	const queryClient = React.useMemo(() => new QueryClient(), []);

	useEffect(() => {
		const cleanup = initAuth();
		return cleanup;
	}, [initAuth]);

	return (
		<QueryClientProvider client={queryClient}>
			<SystemProvider>{children}</SystemProvider>
		</QueryClientProvider>
	);
};

export default AppProvider;
