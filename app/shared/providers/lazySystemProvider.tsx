import { lazy, PropsWithChildren, Suspense } from "react";

const LazySystemProvider = lazy(() =>
	import("./systemProvider").then((module) => ({
		default: module.SystemProvider,
	}))
);

export const DynamicSystemProvider = ({ children }: PropsWithChildren<{}>) => (
	<Suspense fallback={<div>Loading...</div>}>
		<LazySystemProvider>{children}</LazySystemProvider>
	</Suspense>
);
