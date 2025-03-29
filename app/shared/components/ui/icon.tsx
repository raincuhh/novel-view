import clsx from "clsx";

const defaultStyling = "fill-text-normal h-6 w-6";

type IconProps = { className?: string };

const icon = {
	book: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="M6 22h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3zM5 8V5c0-.805.55-.988 1-1h13v12H5V8z" />
			<path d="M8 6h9v2H8z" />
		</svg>
	),
	brand: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="M11 15h2V9h3l-4-5-4 5h3z" />
			<path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z" />
		</svg>
	),
	upload: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="M11 15h2V9h3l-4-5-4 5h3z" />
			<path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z" />
		</svg>
	),
	x: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z" />
		</svg>
	),
	userPlus: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 8a3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4 3.91 3.91 0 0 0-4 4zm6 0a1.91 1.91 0 0 1-2 2 1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2zM4 18a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1h2z" />
		</svg>
	),
	user: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
		</svg>
	),
	chevronRight: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
		</svg>
	),
	dottedHorizontalRounded: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
		</svg>
	),
	edit: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z" />
			<path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z" />
		</svg>
	),
	eyeOpen: ({ className }: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={clsx(defaultStyling, className)}
			viewBox="0 0 576 512"
		>
			<path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128 364.3c41.2 38.1 94.8 67.7 160 67.7s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80h-2c1.3 5.1 2 10.5 2 16 0 35.3-28.7 64-64 64-5.5 0-10.9-.7-16-2v2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
		</svg>
	),
	eyeClosed: ({ className }: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={clsx(defaultStyling, className)}
			viewBox="0 0 640 512"
		>
			<path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2s-6.3 25.5 4.1 33.7l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7l-105.2-82.4c39.6-40.6 66.4-86.1 79.9-118.4 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7 0-70.7-57.3-128-128-128-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zm205.1 160.8-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3 0-5.5-.7-10.9-2-16h2c44.2 0 80 35.8 80 80 0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8l-37.7-29.7c-22.8 29.7-39.1 59.3-48.6 82.2-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47 43.8 111.7 80.6 192.5 80.6 47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128 13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" />
		</svg>
	),
	fastForwardCircle: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
			<path d="m13 16 5-4-5-4zm-6 0 5-4-5-4z" />
		</svg>
	),
	searchFilled: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="M10 2c-4.411 0-8 3.589-8 8s3.589 8 8 8a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8z" />
		</svg>
	),
	searchHollow: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
		</svg>
	),
	hamburgerMenuClosed: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z" />
		</svg>
	),
	hamburgerMenuOpen: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
		</svg>
	),
	home: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z" />
		</svg>
	),
	leftArrowAlt: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z" />
		</svg>
	),
	rightArrowAlt: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="M3 13h14.586l-5.293 5.293 1.414 1.414L21.414 12l-7.707-7.707-1.414 1.414L17.586 11H3z" />
		</svg>
	),
	library: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="M7 3h2v18H7zM4 3h2v18H4zm6 0h2v18h-2zm9.062 17.792-6.223-16.89 1.877-.692 6.223 16.89z" />
		</svg>
	),
	linkExternal: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="m13 3 3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z" />
			<path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z" />
		</svg>
	),
	minus: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="M5 11h14v2H5z" />
		</svg>
	),
	plus: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
		</svg>
	),
	rectangle: ({ className }: IconProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" className={clsx(defaultStyling, className)} viewBox="0 0 24 24">
			<path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.001 14H4z" />
		</svg>
	),
};
export default icon;
