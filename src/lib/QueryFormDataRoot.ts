import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
export type QueryFormDataRoot = Readonly<{
	url: PersonProfileUrl | null;
	importance: number | null;
}>;
