import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const uppercaseify = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

export const uppercaseifySentences = (str: string): string => str.split(" ").map(uppercaseify).join(" ");

export const lowercaseify = (str: string): string => str.charAt(0).toLowerCase() + str.slice(1);

export const lowercaseifySentences = (str: string): string => str.split(" ").map(lowercaseify).join(" ");

export const sqlTimestampToDate = (timestamp: string): Date | null => {
	const date = new Date(timestamp);
	return isNaN(date.getTime()) ? null : date;
};

export const sqlTimestampToDateVTwo = (timestamp: string): Date | null => {
	if (!timestamp || typeof timestamp !== "string") return null;
	const date = new Date(timestamp);
	return isNaN(date.getTime()) ? null : date;
};

export const sanitizeAndHyphenate = (str: string): string =>
	str
		.normalize("NFKD")
		.replace(/[^\w\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-")
		.toLowerCase();

export const getTimeAgo = (date: Date): string => {
	if (!(date instanceof Date) || isNaN(date.getTime())) return "Invalid date";

	const now = new Date();
	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
	const intervals = [
		{ label: "year", seconds: 31536000 },
		{ label: "month", seconds: 2592000 },
		{ label: "week", seconds: 604800 },
		{ label: "day", seconds: 86400 },
		{ label: "hour", seconds: 3600 },
		{ label: "minute", seconds: 60 },
		{ label: "second", seconds: 1 },
	];

	for (const { label, seconds: unit } of intervals) {
		const count = Math.floor(seconds / unit);
		if (count >= 1) return `${count} ${label}${count === 1 ? "" : "s"} ago`;
	}
	return "Just now";
};

export const formatTextWithLineBreaks = (text: string): string => {
	return text.replace(/\n+/g, '<span class="block mb-4"></span>');
};

export const getRandomGradient = (): string => {
	const colors = [
		"#FF5733",
		"#33FF57",
		"#3357FF",
		"#FF33A1",
		"#FFD700",
		"#00CED1",
		"#FF4500",
		"#8A2BE2",
		"#20B2AA",
		"#DC143C",
		"#FF8C00",
		"#32CD32",
	];

	const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

	return `linear-gradient(to right, ${getRandomColor()} 20%, ${getRandomColor()} 80%)`;
};

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

// export const getEnvVar = (key: string) => {
// 	if (process.env[key] === undefined) {
// 		throw new Error(`Env variable ${key} is required`);
// 	}
// 	return process.env[key] || "";
// };

export const getEnvVar = (key: string): string =>
	import.meta.env[`VITE_${key}`] ||
	(() => {
		throw new Error(`Env variable VITE_${key} is required`);
	})();
