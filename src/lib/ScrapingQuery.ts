import type {ScrapingQueryRoot} from "./ScrapingQueryRoot.ts";
export type ScrapingQuery = Readonly<{
	roots: readonly ScrapingQueryRoot[];
}>;
