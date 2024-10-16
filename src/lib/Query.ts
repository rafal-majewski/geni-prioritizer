import type {Root} from "./Root.js";

export type Query = Readonly<{
	roots: readonly Root[];
}>;
