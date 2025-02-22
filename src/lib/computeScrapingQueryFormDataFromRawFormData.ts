import {computeScrapingQueryFormDataRootsFromRawFormData} from "./computeScrapingQueryFormDataRootsFromRawFormData.ts";
import type {ScrapingQueryFormData} from "./ScrapingQueryFormData.ts";
import type {ScrapingQueryFormDataRoot} from "./ScrapingQueryFormDataRoot.ts";
export function computeScrapingQueryFormDataFromRawFormData(
	rawData: FormData,
): ScrapingQueryFormData | null {
	const dataRootUrls: readonly FormDataEntryValue[] = rawData.getAll("root-url");
	const dataRootPriorities: readonly FormDataEntryValue[] = rawData.getAll("root-priority");
	const roots: readonly ScrapingQueryFormDataRoot[] | null =
		computeScrapingQueryFormDataRootsFromRawFormData(dataRootUrls, dataRootPriorities);
	if (roots === null) {
		return null;
	}
	return {
		roots,
	};
}
