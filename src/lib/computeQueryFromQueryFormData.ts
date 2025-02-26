import {computeQueryRootFromQueryFormDataRoot} from "./computeQueryRootFromQueryFormDataRoot.ts";
import type {Query} from "./Query.ts";
import type {QueryFormData} from "./QueryFormData.ts";
import type {QueryRoot} from "./QueryRoot.ts";
export function computeQueryFromQueryFormData(formData: QueryFormData): Query | null {
	const queryRoots: QueryRoot[] = [];
	for (const formDataRoot of formData.roots) {
		const root = computeQueryRootFromQueryFormDataRoot(formDataRoot);
		if (root === null) {
			return null;
		}
		queryRoots.push(root);
	}
	return {
		roots: queryRoots,
	};
}
