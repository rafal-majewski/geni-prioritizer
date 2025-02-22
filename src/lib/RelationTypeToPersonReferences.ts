import type {PersonReference} from "./PersonReference.ts";
import type {RelationType} from "./RelationType.ts";
export type RelationTypeToPersonReferences = ReadonlyMap<
	RelationType,
	readonly [PersonReference, ...PersonReference[]]
>;
