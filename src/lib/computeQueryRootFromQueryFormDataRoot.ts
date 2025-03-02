import type {QueryFormDataRoot} from "./QueryFormDataRoot.ts";
import type {QueryRoot} from "./QueryRoot.ts";
export function computeQueryRootFromQueryFormDataRoot(
	formDataRoot: QueryFormDataRoot,
): QueryRoot | null {
	if (formDataRoot.url === null) {
		return null;
	}
	if (formDataRoot.importance === null) {
		return null;
	}
	return {
		url: formDataRoot.url,
		importance: formDataRoot.importance,
	};
}
