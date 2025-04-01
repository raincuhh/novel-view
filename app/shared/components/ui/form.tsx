import React, { forwardRef, HTMLAttributes } from "react";
import Label from "./label";
import { cn } from "@/shared/lib/utils";

const Form = forwardRef<HTMLFormElement, HTMLAttributes<HTMLFormElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<form ref={ref} className={cn("space-y-4", className)} {...props}>
				{children}
			</form>
		);
	}
);
Form.displayName = "Form";

type FormLabelProps = {
	error: string | any;
};

const FormLabel = forwardRef<HTMLLabelElement, HTMLAttributes<HTMLLabelElement> & FormLabelProps>(
	({ className, error, ...props }, ref) => {
		return <Label ref={ref} className={cn(error && "text-info-danger-text", className)} {...props} />;
	}
);
FormLabel.displayName = "FormLabel";

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("space-y-2", className)} {...props}>
				{children}
			</div>
		);
	}
);
FormItem.displayName = "FormItem";

const FormControl = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		return (
			<div ref={ref} className={cn("flex items-center", className)} {...props}>
				{children}
			</div>
		);
	}
);
FormControl.displayName = "FormControl";

type FormDescriptionProps = {};

const FormDescription = forwardRef<
	HTMLParagraphElement,
	HTMLAttributes<HTMLParagraphElement> & FormDescriptionProps
>(({ className, children, ...props }, ref) => {
	return <p ref={ref} className={cn("text-normal", className)} {...props} />;
});
FormDescription.displayName = "FormDescription";

export type FormMessageProps = {
	error: string | any;
};

const FormMessage = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement> & FormMessageProps>(
	({ className, children, error, ...props }, ref) => {
		const body = error ? String(error?.message ?? "") : children;

		if (!body) {
			return null;
		}

		return (
			<p ref={ref} className={cn("text-sm font-medium text-info-danger-text", className)} {...props}>
				{body}
			</p>
		);
	}
);
FormMessage.displayName = "FormMessage";

export { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage };
