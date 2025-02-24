import {fail, redirect} from "@sveltejs/kit";
import {computeScrapingQueryFormDataFromRawFormData} from "../../lib/computeScrapingQueryFormDataFromRawFormData.ts";
import {computeScrapingQueryFromScrapingQueryFormData} from "../../lib/computeScrapingQueryFromScrapingQueryFormData.ts";
import {scrapingManager} from "../../lib/instances/scrapingManager.ts";
export const actions = {
	async default({request}) {
		const rawQueryFormData = await request.formData();
		const queryFormData = computeScrapingQueryFormDataFromRawFormData(rawQueryFormData);
		if (queryFormData === null) {
			// TODO: Return Svelte data
			return fail(400);
		}
		const query = computeScrapingQueryFromScrapingQueryFormData(queryFormData);
		if (query === null) {
			// TODO: Return Svelte data
			return fail(400);
		}
		for (const root of query.roots) {
			scrapingManager.addUrl(root.url, root.priority);
		}
		// TODO: Return Svelte data
		redirect(302, "/viewing");
	},
};
