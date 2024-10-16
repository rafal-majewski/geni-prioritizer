import {sveltekit as createSvelteKitVitePlugin} from "@sveltejs/kit/vite";
import type {UserConfig as ViteConfig} from "vite";

const svelteKitVitePlugin = createSvelteKitVitePlugin();

const viteConfig: ViteConfig = {
	plugins: [svelteKitVitePlugin],
};

export default viteConfig;
