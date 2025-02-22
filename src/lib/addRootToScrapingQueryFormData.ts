import type {ScrapingQueryFormData} from "./ScrapingQueryFormData.ts";
export function addRootToScrapingQueryFormData(data: ScrapingQueryFormData): ScrapingQueryFormData {
	return {
		...data,
		roots: [
			...data.roots,
			{
				url: null,
				priority: null,
			},
		],
	};
}
