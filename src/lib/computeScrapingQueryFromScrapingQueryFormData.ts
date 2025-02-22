import {computeScrapingQueryRootFromScrapingQueryFormDataRoot} from "./computeScrapingQueryRootFromScrapingQueryFormDataRoot.ts";
import type {ScrapingQuery} from "./ScrapingQuery.ts";
import type {ScrapingQueryFormData} from "./ScrapingQueryFormData.ts";
import type {ScrapingQueryRoot} from "./ScrapingQueryRoot.ts";
export function computeScrapingQueryFromScrapingQueryFormData(
	formData: ScrapingQueryFormData,
): ScrapingQuery | null {
	const queryRoots: ScrapingQueryRoot[] = [];
	for (const formDataRoot of formData.roots) {
		const root = computeScrapingQueryRootFromScrapingQueryFormDataRoot(formDataRoot);
		if (root === null) {
			return null;
		}
		queryRoots.push(root);
	}
	return {
		roots: queryRoots,
	};
}
