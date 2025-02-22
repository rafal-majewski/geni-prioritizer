import type {PersonUrl} from "./PersonUrl.ts";
export type ScrapingQueryFormDataRoot = Readonly<{
	url: PersonUrl | null;
	priority: number | null;
}>;
