import type {QueryFormData} from "./QueryFormData.ts";
export function addRootToQueryFormData(data: QueryFormData): QueryFormData {
	return {
		...data,
		roots: [
			...data.roots,
			{
				url: null,
				importance: null,
			},
		],
	};
}
