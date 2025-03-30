import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			Hello "/"! <Link to="/onboarding">to onboarding</Link>
		</div>
	);
}
