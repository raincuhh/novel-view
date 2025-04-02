import React, { forwardRef, HTMLAttributes, useEffect, useState } from "react";
import RenderList from "../utils/renderList";
import { cn } from "@/shared/lib/utils";

const DOB = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
	const [currentDay, setCurrentDay] = useState<number>(new Date().getDate());
	const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
	const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
	const [columnWidths, setColumnWidths] = useState<{ day: number; month: number; year: number }>({
		day: 0,
		month: 0,
		year: 0,
	});

	const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();
	const rotateArray = <T,>(array: T[], startIndex: number): T[] => {
		return [...array.slice(startIndex), ...array.slice(0, startIndex)];
	};

	useEffect(() => {
		console.log(`Days in month: ${daysInMonth(currentMonth, currentYear)}`);
		console.log(`Selected: ${currentYear}-${currentMonth}-${currentDay}`);
	}, [currentYear, currentMonth, currentDay]);

	useEffect(() => {
		const dayColumn = document.querySelector(".dob-day .dob-item");
		const monthColumn = document.querySelector(".dob-month .dob-item");
		const yearColumn = document.querySelector(".dob-year .dob-item");

		setColumnWidths({
			day: dayColumn ? dayColumn.clientWidth : 0,
			month: monthColumn ? monthColumn.clientWidth : 0,
			year: yearColumn ? yearColumn.clientWidth : 0,
		});
	}, [currentDay, currentMonth, currentYear]);

	return (
		<div className="w-min mx-4 relative">
			<div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
				<div
					className="w-full h-full"
					style={{
						WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 100%)",
						maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 100%)",
						backgroundColor: "black",
					}}
				></div>
				<div className="flex flex-row w-full gap-2">
					<div
						className="border-t border-b border-border py-[18px] w-full"
						style={{
							width: `${columnWidths.day}px`,
						}}
					></div>
					<div
						className="border-t border-b border-border py-[18px] w-full"
						style={{
							width: `${columnWidths.month}px`,
						}}
					></div>
					<div
						className="border-t border-b border-border py-[18px] w-full"
						style={{
							width: `${columnWidths.year}px`,
						}}
					></div>
				</div>
				<div
					className="w-full h-full"
					style={{
						WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 100%)",
						maskImage: "linear-gradient(to top, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 100%)",
						backgroundColor: "black",
					}}
				></div>
			</div>
			<div className="flex justify-center max-h-36 overflow-y-hidden">
				<DOBScrollbar
					className="dob-day"
					data={rotateArray(
						Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, i) => i + 1),
						currentDay - 1
					)}
					selected={currentDay}
					onValueSelect={setCurrentDay}
				/>
				<DOBScrollbar
					className="dob-month"
					data={rotateArray(
						Array.from({ length: 12 }, (_, i) => i + 1),
						currentMonth - 1
					)}
					selected={currentMonth}
					onValueSelect={setCurrentMonth}
				/>
				<DOBScrollbar
					className="dob-year"
					data={Array.from({ length: 101 }, (_, i) => currentYear - i)}
					selected={currentYear}
					onValueSelect={setCurrentYear}
				/>
			</div>
		</div>
	);
});

export default DOB;

type DOBScrollbarProps<T extends number> = {
	data: T[];
	selected: T;
	onValueSelect: (value: T) => void;
};

const DOBScrollbar = forwardRef<
	HTMLUListElement,
	HTMLAttributes<HTMLUListElement> & DOBScrollbarProps<number>
>(({ className, data, selected, onValueSelect, ...props }, ref) => {
	const handleScroll = () => {};

	useEffect(() => {
		const scrollContainer = (ref as React.RefObject<HTMLUListElement>)?.current;
		if (!scrollContainer) return;

		scrollContainer.addEventListener("scroll", handleScroll);
		return () => scrollContainer.removeEventListener("scroll", handleScroll);
	}, [data, onValueSelect]);

	return (
		<ul
			ref={ref}
			className={`flex flex-col snap-y snap-mandatory overflow-y-scroll scrollbar-hidden pt-[14.5px] ${className || ""}`}
			{...props}
		>
			<RenderList
				data={data}
				render={(item, i) => (
					<li
						key={i}
						className={cn(
							"snap-center font-bold text-xl mb-[14px] px-4 flex justify-center dob-item select-none",
							item === selected ? "text-accent" : ""
						)}
						onClick={() => onValueSelect(item)}
					>
						{item}
					</li>
				)}
			/>
		</ul>
		//https://www.lightnovelworld.co/novel/shadow-slave-1365/chapter-2159
	);
});
