import React, { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & { text?: string };

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, text, ...props }, ref) => {
	return (
		<label className={cn("flex items-center gap-2", className)}>
			<input
				ref={ref}
				type="checkbox"
				className={cn(
					"peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
					className
				)}
				{...props}
			/>
			{text && <span className="text-muted checked:text-normal select-none">{text}</span>}
		</label>
	);
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
