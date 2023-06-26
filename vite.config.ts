import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { join } from "path";
import projeceConfig from "./src/projectConfig";

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
				target: projeceConfig.server_ip,
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/local/, ""),
			},
		},
	},
});
