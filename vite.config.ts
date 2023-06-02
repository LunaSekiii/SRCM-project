import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	// base: "./",
	plugins: [react()],
	resolve: {
		alias: {
			"@": join(__dirname, "src"),
		},
	},
	server: {
		// host: "0.0.0.0",
		proxy: {
			"/local": {
				target: "http://10。60.102.53:8080",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/local/, ""),
			},
		},
	},
});
