import React, { forwardRef, HTMLAttributes, useEffect, useState } from "react";
import RenderList from "../utils/renderList";

const DOB = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
	const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
	const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
	const [currentDay, setCurrentDay] = useState<number>(new Date().getDate());

	const daysInMonth = (month: number, year: number) => {
		return new Date(year, month, 0).getDate();
	};

	useEffect(() => {
		console.log(daysInMonth(4, 2025));
		console.log(currentYear, currentMonth, currentDay);
	}, []);

	return (
		<div className="w-full relative">
			<div className="absolute w-full justify-center items-center">
				<div className="relative">
					<div className="flex justify-center gap-4">
						<DOBScrollbar
							data={Array.from(
								{ length: daysInMonth(currentMonth + 1, currentYear) },
								(_, i) => i + 1
							)}
						/>
						<DOBScrollbar data={Array.from({ length: 12 }, (_, i) => i + 1)} />
						<DOBScrollbar data={Array.from({ length: 101 }, (_, i) => currentYear - 100 + i)} />
					</div>
					<div className="absolute"></div>
				</div>
			</div>
		</div>
	);
});

export default DOB;

type DOBScrollbarProps<T extends React.ReactNode> = {
	data: T[];
};

const DOBScrollbar = <T extends React.ReactNode>({ data }: DOBScrollbarProps<T>) => {
	return (
		<div className="flex flex-col gap-4 overflow-y-scroll max-h-48 snap-y snap-mandatory">
			<RenderList
				data={data}
				render={(item: T, index: number) => (
					<span data-index={index + 1} key={index} className="snap-center font-bold text-lg">
						{item}
					</span>
				)}
			/>
		</div>
	);
};
