import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(reader)/reader/$bookId/chapter/$chapterId/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(reader)/reader/$bookId/chapter/$chapterId/"!</div>
}
