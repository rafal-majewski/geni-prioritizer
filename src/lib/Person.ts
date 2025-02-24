import type {PersonLoadingStatus} from "./PersonLoadingStatus.ts";
import type {PersonName} from "./PersonName.ts";
import type {PersonProfileId} from "./PersonProfileId.ts";
import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
export type Person = Readonly<{
	loadingStatus: PersonLoadingStatus;
	name: PersonName;
	profileId: PersonProfileId;
	profileUrl: PersonProfileUrl;
	parentProfileIds: readonly PersonProfileId[];
	partnerProfileIds: readonly PersonProfileId[];
	childProfileIds: readonly PersonProfileId[];
}>;
