import type {PersonProfileUrl} from "./PersonProfileUrl.ts";
import type {RelationType} from "./RelationType.ts";
export type RelationTypeToPersonProfileUrls = Readonly<
	Record<RelationType, readonly PersonProfileUrl[]>
>;
