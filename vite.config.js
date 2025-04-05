import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
	plugins: [tailwindcss(), react(), wasm(), topLevelAwait()],
	clearScreen: false,
	publicDir: "public",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			// "@powersync/web": "@powersync/web/dist/index.umd.js",
		},
	},
	optimizeDeps: {
		// includes webworkers and wasm files so dont
		exclude: ["@journeyapps/wa-sqlite", "@powersync/web"],
		include: ["@powersync/web > js-logger"],
	},
	server: {
		port: 3000,
		strictPort: true,
		open: true,
		host: "0.0.0.0",
	},
	build: {
		target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
		outDir: "./dist",
		sourcemap: !!process.env.TAURI_DEBUG,
		rollupOptions: {
			output: {
				format: "es",
			},
		},
		emptyOutDir: true,
	},
	worker: {
		format: "es",
		plugins: () => [wasm(), topLevelAwait()],
	},
	ssr: {
		noExternal: ["@powersync/web", "@tanstack/react-query", "@tanstack/react-router"],
	},
});
