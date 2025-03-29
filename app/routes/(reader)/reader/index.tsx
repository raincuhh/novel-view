import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(reader)/reader/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(reader)/reader/"!</div>
}
