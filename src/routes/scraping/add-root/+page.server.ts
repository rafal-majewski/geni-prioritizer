import {addRootToScrapingQueryFormData} from "../../../lib/addRootToScrapingQueryFormData.ts";
import {computeScrapingQueryFormDataFromRawFormData} from "../../../lib/computeScrapingQueryFormDataFromRawFormData.ts";
import {fail} from "@sveltejs/kit";
export const actions = {
	async default({request}) {
		const rawFormData: FormData = await request.formData();
		const formData = computeScrapingQueryFormDataFromRawFormData(rawFormData);
		if (formData === null) {
			// TODO: Return Svelte data
			return fail(400);
		}
		const newFormData = addRootToScrapingQueryFormData(formData);
		return newFormData;
	},
};
