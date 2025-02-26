import type {PersonName} from "./PersonName.ts";
import type {RelationTypeToPersonProfileReferences} from "./RelationTypeToPersonProfileReferences.ts";
export type PersonProfile = Readonly<{
	name: PersonName;
	relations: RelationTypeToPersonProfileReferences;
}>;
