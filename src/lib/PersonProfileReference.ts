import type {PersonName} from "./PersonName.ts";
import type {PersonProfileId} from "./PersonProfileId.ts";
import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
export type PersonProfileReference = Readonly<{
	name: PersonName;
	url: PersonProfileUrl;
	id: PersonProfileId;
}>;
