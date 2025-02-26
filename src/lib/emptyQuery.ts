import type {Query} from "./Query.ts";
export const emptyQuery = {
	roots: [],
} as const satisfies Query;
