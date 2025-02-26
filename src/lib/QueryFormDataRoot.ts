import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
export type QueryFormDataRoot = Readonly<{
	url: PersonProfileUrl | null;
	priority: number | null;
}>;
