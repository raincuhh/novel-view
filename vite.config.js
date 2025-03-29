import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [tailwindcss(), react()],
	clearScreen: false,
	publicDir: "public",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 8080,
		strictPort: true,
		open: true,
		host: "0.0.0.0",
	},
	build: {
		target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
		outDir: "dist/",
		sourcemap: !!process.env.TAURI_DEBUG,
	},
});
