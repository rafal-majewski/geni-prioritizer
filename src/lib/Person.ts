import type {PersonName} from "./PersonName.ts";
import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
import type {RelationTypeToPersonProfileUrls} from "./RelationTypeToPersonProfileUrls.ts";
export type Person = Readonly<{
	name: PersonName;
	profileUrl: PersonProfileUrl;
	explorationPercentage: number;
	relations: RelationTypeToPersonProfileUrls;
	scrapingTimestampSeconds: number;
}>;
