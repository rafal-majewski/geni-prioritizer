import type {PersonLoadingStatus} from "./PersonLoadingStatus.ts";
import type {PersonName} from "./PersonName.ts";
import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
import type {RelationTypeToPersonProfileUrls} from "./RelationTypeToPersonProfileUrls.ts";
export type Person = Readonly<{
	loadingStatus: PersonLoadingStatus;
	name: PersonName;
	profileUrl: PersonProfileUrl;
	explorationPercentage: number;
	relations: RelationTypeToPersonProfileUrls;
}>;
