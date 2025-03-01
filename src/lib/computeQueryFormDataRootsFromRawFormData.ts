import type {QueryFormDataRoot} from "./QueryFormDataRoot.ts";
export function computeQueryFormDataRootsFromRawFormData(
	rawUrls: readonly FormDataEntryValue[],
	rawPriorities: readonly FormDataEntryValue[],
): readonly QueryFormDataRoot[] | null {
	const rootCount = Math.max(rawUrls.length, rawPriorities.length);
	const roots: QueryFormDataRoot[] = [];
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
		const priority = rawPriority.trim() === "" ? null : Number(rawPriority);
		const root = {
			url,
			priority,
		} as const satisfies QueryFormDataRoot;
		roots.push(root);
	}
	return roots;
}
