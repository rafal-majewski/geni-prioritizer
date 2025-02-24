import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
export type ScrapingQueryRoot = Readonly<{
	url: PersonProfileUrl;
	priority: number;
}>;
