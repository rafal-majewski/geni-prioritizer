import type {PersonLoadingStatus} from "./PersonLoadingStatus.ts";
import type {PersonName} from "./PersonName.ts";
import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
import type {RelationType} from "./RelationType.ts";
export type Person = Readonly<
	{
		loadingStatus: PersonLoadingStatus;
		name: PersonName;
		profileUrl: PersonProfileUrl;
		explorationPercentage: number;
	} & Record<`${RelationType}ProfileUrls`, readonly PersonProfileUrl[]>
>;
