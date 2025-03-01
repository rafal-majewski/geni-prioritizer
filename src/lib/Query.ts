import type {QueryRoot} from "./QueryRoot.ts";
// TODO: Do not allow invalid
export type Query = Readonly<{
	roots: readonly QueryRoot[];
}>;
