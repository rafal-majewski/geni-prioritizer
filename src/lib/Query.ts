import type {QueryRoot} from "./QueryRoot.ts";
export type Query = Readonly<{
	roots: readonly QueryRoot[];
}>;
