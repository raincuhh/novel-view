import DOB from "@/shared/components/ui/DOB";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-screen flex flex-col">
			<div>
				Hello "/"! <Link to="/onboarding">to onboarding</Link>
			</div>

			<div>
				<DOB />
			</div>
		</div>
	);
}
