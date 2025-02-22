import type {ScrapingQueryFormDataRoot} from "./ScrapingQueryFormDataRoot.ts";
export function computeScrapingQueryFormDataRootsFromRawFormData(
	rawUrls: readonly FormDataEntryValue[],
	rawPriorities: readonly FormDataEntryValue[],
): readonly ScrapingQueryFormDataRoot[] | null {
	const rootCount = Math.max(rawUrls.length, rawPriorities.length);
	const roots: ScrapingQueryFormDataRoot[] = [];
	for (let rootIndex = 0; rootIndex < rootCount; ++rootIndex) {
		const rawUrl = rawUrls[rootIndex];
		if (typeof rawUrl !== "string") {
			return null;
		}
		const url = rawUrl === "" ? null : rawUrl;
		const rawPriority = rawPriorities[rootIndex];
		if (typeof rawPriority !== "string") {
			return null;
		}
		const priority = rawPriority === "" ? null : Number(rawPriority);
		const root = {
			url,
			priority,
		} as const satisfies ScrapingQueryFormDataRoot;
		roots.push(root);
	}
	return roots;
}
