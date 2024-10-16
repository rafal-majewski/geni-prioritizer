import type {Root} from "../Root.js";
import type {Query} from "../Query.js";
import {parseFormDataRoots} from "./parseFormDataRoots.js";

export function parseFormData(data: FormData): Query | null {
	const dataRootUrls: readonly FormDataEntryValue[] = data.getAll("root-url");
	const dataRootWeights: readonly FormDataEntryValue[] = data.getAll("root-weight");
	const roots: readonly Root[] | null = parseFormDataRoots(dataRootUrls, dataRootWeights);

	if (roots === null) {
		return null;
	}

	return {
		roots,
	};
}
