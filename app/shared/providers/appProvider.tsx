import React, { PropsWithChildren } from "react";
import pipe from "../lib/pipe";
import withProvider from "../components/utils/withProvider";
import { ReactQueryProvider } from "./reactQueryProvider";

type AppProviderProps = PropsWithChildren<{}>;

const AppProvider = ({ children }: AppProviderProps) => {
	const AppWithProviders: React.ComponentType<PropsWithChildren> = pipe(withProvider(ReactQueryProvider))(
		(props: PropsWithChildren<{}>) => <>{props.children}</>
	);

	return <AppWithProviders>{children}</AppWithProviders>;
};

export default AppProvider;
