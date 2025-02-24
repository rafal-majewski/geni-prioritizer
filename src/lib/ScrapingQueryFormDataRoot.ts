import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
export type ScrapingQueryFormDataRoot = Readonly<{
	url: PersonProfileUrl | null;
	priority: number | null;
}>;
