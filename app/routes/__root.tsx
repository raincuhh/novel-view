import type { PropsWithChildren, ReactNode } from "react";
import { Outlet, createRootRoute, HeadContent, Scripts, DefaultGlobalNotFound } from "@tanstack/react-router";
import { seo } from "@/shared/components/utils/seo";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../styles/global.css";
import NotFound from "@/pages/notFound/components/ui/notFound";
import AppProvider from "@/shared/providers/appProvider";
import { Suspense } from "react";
import { isProd } from "@/shared/lib/environmentHelpers";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			...seo({
				title: "NovelView",
				description: `NovelView is a modern EPub reader made for readers, by readers.`,
			}),
		],
	}),
	// errorComponent: (props) => {
	//   return (<RootDocument><DefaultGlobalNotFound/></RootDocument>)
	// },
	notFoundComponent: () => <NotFound />,
	component: RootComponent,
	loader: async () => {
		//testing loading
		// await new Promise((resolve) => setTimeout(resolve, 1000 * 2));
		// return { message: "Welcome to NovelView!" };
	},
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html>
			<head>
				<HeadContent />
			</head>
			<body className="scroll-smooth">
				<AppProvider>
					<Layout>{children}</Layout>
					{isProd() ? (
						<div className="absolute">
							<ReactQueryDevtools buttonPosition="bottom-left" />
							<TanStackRouterDevtools position="bottom-right" />
						</div>
					) : null}
					<Scripts />
				</AppProvider>
			</body>
		</html>
	);
}

type LayoutProps = Readonly<PropsWithChildren>;

function Layout({ children }: LayoutProps) {
	return (
		<div className="flex flex-col bg-primary text-normal font-medium">
			<main>{children}</main>
		</div>
	);
}

{
	/* <div className="flex flex-col h-screen w-screen">
              <div className="absolute flex flex-col top-0 right-0 left-0 bottom-0">
                <div className="flex flex-col flex-auto min-w-0 min-h-0 overflow-hidden">
                  <div className="flex w-full h-full">
                    <div
                      className="grid h-screen w-screen"
                      style={{
                        gridTemplateColumns: "min-content min-content 1fr",
                        gridTemplateRows: "var(--custom-app-top-bar-height) min-content 1fr",
                        gridTemplateAreas: `"titlebar titlebar titlebar" "clustersList notice notice" "clustersList page page"`,
                      }}
                    >
                      <Titlebar/>
                      <div style={{ gridArea: "clustersList" }}>Clusters List</div>


                      <div style={{ gridArea: "notice" }}>Notice</div>
                      <div style={{ gridArea: "page" }}>{children}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */
}
