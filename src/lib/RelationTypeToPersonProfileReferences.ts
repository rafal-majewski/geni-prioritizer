import type {PersonProfileReference} from "./PersonProfileReference.ts";
import type {RelationType} from "./RelationType.ts";
export type RelationTypeToPersonProfileReferences = ReadonlyMap<
	RelationType,
	readonly [PersonProfileReference, ...PersonProfileReference[]]
>;
