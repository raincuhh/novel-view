import Icon from "@/shared/components/ui/icon";
import { Link } from "@tanstack/react-router";
import React from "react";

export default function Welcome() {
	return (
		<div className="flex flex-col">
			<div className="flex justify-center pb-8">
				<Icon.brandLogo className="w-48 h-48 fill-accent hover:fill-accent-hover transition-discrete duration-100 ease-in-out" />
			</div>
			<h1 className="mb-24 text-center text-3xl font-bold">Your books, your library, your experience.</h1>
			<div className="flex flex-col gap-4 mb-8">
				<div className="text-normal text-lg">awdaw</div>
				<div className="text-muted text-lg">awdaw</div>
				<div className="text-faint text-lg">awdaw</div>
			</div>
			{/* <div className="text-center">
				<p>info about us</p>
			</div> */}
		</div>
	);
}
