import type {QueryFormDataRoot} from "./QueryFormDataRoot.ts";
export function computeQueryFormDataRootsFromRawFormData(
	rawUrls: readonly FormDataEntryValue[],
	rawImportances: readonly FormDataEntryValue[],
): readonly QueryFormDataRoot[] | null {
	const rootCount = Math.max(rawUrls.length, rawImportances.length);
	const roots: QueryFormDataRoot[] = [];
	for (let rootIndex = 0; rootIndex < rootCount; ++rootIndex) {
		const rawUrl = rawUrls[rootIndex];
		if (typeof rawUrl !== "string") {
			return null;
		}
		const url = rawUrl === "" ? null : rawUrl;
		const rawImportance = rawImportances[rootIndex];
		if (typeof rawImportance !== "string") {
			return null;
		}
		const importance = rawImportance.trim() === "" ? null : Number(rawImportance);
		const root = {
			url: url,
			importance: importance,
		} as const satisfies QueryFormDataRoot;
		roots.push(root);
	}
	return roots;
}
