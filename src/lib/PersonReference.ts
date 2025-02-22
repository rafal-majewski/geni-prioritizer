import type {PersonId} from "./PersonId.ts";
import type {PersonName} from "./PersonName.ts";
import type {PersonUrl} from "./PersonUrl.ts";
export type PersonReference = Readonly<{
	name: PersonName;
	url: PersonUrl;
	id: PersonId;
}>;
