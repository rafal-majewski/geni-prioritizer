import {sveltekit as createSveltePlugins} from "@sveltejs/kit/vite";
import type {UserConfig} from "vite";
const svelteKitPlugins = await createSveltePlugins();
export default {
	plugins: svelteKitPlugins,
} as const satisfies UserConfig;
