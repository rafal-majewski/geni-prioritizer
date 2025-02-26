import {computeQueryFormDataRootsFromRawFormData} from "./computeQueryFormDataRootsFromRawFormData.ts";
import type {QueryFormData} from "./QueryFormData.ts";
import type {QueryFormDataRoot} from "./QueryFormDataRoot.ts";
export function computeQueryFormDataFromRawFormData(rawData: FormData): QueryFormData | null {
	const dataRootUrls: readonly FormDataEntryValue[] = rawData.getAll("root-url");
	const dataRootPriorities: readonly FormDataEntryValue[] = rawData.getAll("root-priority");
	const roots: readonly QueryFormDataRoot[] | null = computeQueryFormDataRootsFromRawFormData(
		dataRootUrls,
		dataRootPriorities,
	);
	if (roots === null) {
		return null;
	}
	return {
		roots,
	};
}
