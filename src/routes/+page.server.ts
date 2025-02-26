import {fail} from "@sveltejs/kit";
import {computeQueryFormDataFromRawFormData} from "../lib/computeQueryFormDataFromRawFormData.ts";
import {computeQueryFromQueryFormData} from "../lib/computeQueryFromQueryFormData.ts";
import {manager} from "../lib/instances/manager.ts";
import {addRootToQueryFormData} from "../lib/addRootToQueryFormData.ts";
export const actions = {
	async run({request}) {
		const rawQueryFormData = await request.formData();
		const queryFormData = computeQueryFormDataFromRawFormData(rawQueryFormData);
		if (queryFormData === null) {
			// TODO: Return Svelte data
			return fail(400);
		}
		const query = computeQueryFromQueryFormData(queryFormData);
		if (query === null) {
			// TODO: Return Svelte data
			return fail(400);
		}
		manager.setQuery(query);
		return queryFormData;
	},
	async "add-root"({request}) {
		const rawFormData: FormData = await request.formData();
		const queryFormData = computeQueryFormDataFromRawFormData(rawFormData);
		if (queryFormData === null) {
			return fail(400);
		}
		const newQueryFormData = addRootToQueryFormData(queryFormData);
		return newQueryFormData;
	},
};
export function load() {
	return {
		persons: manager.getPersons(),
		queryFormData: manager.getQuery(),
	};
}
