import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";

const queryClient = new QueryClient();

export function ReactQueryProvider({ children }: PropsWithChildren) {
	useEffect(() => {
		console.log("hello from client");
	}, []);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
