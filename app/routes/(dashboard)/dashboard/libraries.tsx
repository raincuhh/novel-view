import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/dashboard/libraries')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/libraries"!</div>
}
