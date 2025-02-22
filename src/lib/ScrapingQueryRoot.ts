import type {PersonUrl} from "./PersonUrl.ts";
export type ScrapingQueryRoot = Readonly<{
	url: PersonUrl;
	priority: number;
}>;
