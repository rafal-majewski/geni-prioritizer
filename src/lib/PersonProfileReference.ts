import type {PersonName} from "./PersonName.ts";
import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
export type PersonProfileReference = Readonly<{
	name: PersonName;
	url: PersonProfileUrl;
}>;
