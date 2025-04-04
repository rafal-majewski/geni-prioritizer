import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
export type QueryRoot = Readonly<{
	url: PersonProfileUrl;
	importance: number;
}>;
