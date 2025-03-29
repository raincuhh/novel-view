import type { ReactNode } from "react"
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  DefaultGlobalNotFound,
} from "@tanstack/react-router"
import { seo } from "@/shared/components/utils/seo"
// import { QueryClient } from "@tanstack/react-query"
import "../styles/global.css"
import "../styles/satoshi.css"
import Titlebar from "@/widgets/titlebar/components/ui/titlebar"

export const Route = createRootRoute(
  {
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
          title:
            "NovelView",
          description: `NovelView is a modern EPub reader made for readers, by readers.`,
        }),
      ],
    }),
    errorComponent: (props) => {
      return (<RootDocument><DefaultGlobalNotFound/></RootDocument>)
    },
    notFoundComponent: () => <></>,
    component: RootComponent,
  }
)

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className="dark">
        <div className="flex flex-col">
          <main>
            <div className="flex flex-col h-screen w-screen">
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

                      {/* notice is only if a global announcement or something is happening
                      <div style={{ gridArea: "notice" }}>Notice</div> */}
                      <div style={{ gridArea: "page" }}>{children}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
