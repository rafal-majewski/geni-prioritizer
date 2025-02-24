import type {PersonName} from "./PersonName.ts";
import type {PersonProfileId} from "./PersonProfileId.ts";
import type {RelationTypeToPersonProfileReferences} from "./RelationTypeToPersonProfileReferences.ts";
export type PersonProfile = Readonly<{
	name: PersonName;
	id: PersonProfileId;
	relations: RelationTypeToPersonProfileReferences;
}>;
