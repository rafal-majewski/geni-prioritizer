import {parseFormData} from "$lib/parse-form-data/parseFormData.js";
import type {Query} from "$lib/Query.js";
import {error} from "@sveltejs/kit";
import type {Actions, PageServerLoad} from "../../.svelte-kit/types/src/routes/$types.js";

export const actions: Actions = {
	"add-root": async function handleAddRoot(event) {
		const eventRequestFormData = await event.request.formData();
		const query: Query | null = parseFormData(eventRequestFormData);

		if (query === null) {
			error(400);
		}

		return query;
	},
	"remove-root": function handleRemoveRoot(event) {
		console.log(event);
	},
};

export const load: PageServerLoad = function handleLoad() {
	return {
		result: null,
	} as const;
};
