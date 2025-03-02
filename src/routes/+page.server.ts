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
		// TODO: DO NOT ALLOW INVALID QUERIES
		if (queryFormData === null) {
			return fail(400);
		}
		const newQueryFormData = addRootToQueryFormData(queryFormData);
		return newQueryFormData;
	},
	async "set-exploration-percentage"({request}) {
		const rawFormData: FormData = await request.formData();
		const rawExplorationPercentage = rawFormData.get("exploration-percentage");
		if (typeof rawExplorationPercentage !== "string") {
			return fail(400);
		}
		const rawProfileUrl = rawFormData.get("profile-url");
		if (typeof rawProfileUrl !== "string") {
			return fail(400);
		}
		const explorationPercentage =
			rawExplorationPercentage.trim() === "" ? null : Number(rawExplorationPercentage);
		if (explorationPercentage === null) {
			return fail(400);
		}
		const profileUrl = rawProfileUrl === "" ? null : rawProfileUrl;
		if (profileUrl === null) {
			return fail(400);
		}
		switch (await manager.setExplorationPercentageOfPerson(profileUrl, explorationPercentage)) {
			case "notFound": {
				return fail(400);
			}
			case "success": {
				return;
			}
		}
	},
};
export async function load() {
	return {
		results: await manager.getResults(),
		query: manager.getQuery(),
	};
}
