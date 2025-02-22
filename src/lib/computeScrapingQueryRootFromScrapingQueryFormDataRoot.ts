import type {ScrapingQueryFormDataRoot} from "./ScrapingQueryFormDataRoot.ts";
import type {ScrapingQueryRoot} from "./ScrapingQueryRoot.ts";
export function computeScrapingQueryRootFromScrapingQueryFormDataRoot(
	formDataRoot: ScrapingQueryFormDataRoot,
): ScrapingQueryRoot | null {
	if (formDataRoot.url === null) {
		return null;
	}
	if (formDataRoot.priority === null) {
		return null;
	}
	return {
		url: formDataRoot.url,
		priority: formDataRoot.priority,
	} as const satisfies ScrapingQueryRoot;
}
