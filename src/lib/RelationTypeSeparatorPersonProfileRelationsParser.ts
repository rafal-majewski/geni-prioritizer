import {NonFirstRelationTypePersonProfileRelationsParser} from "./NonFirstRelationTypePersonProfileRelationsParser.ts";
import type {PersonProfileRelationsParser} from "./PersonProfileRelationsParser.ts";
import type {RelationTypeToPersonProfileReferences} from "./RelationTypeToPersonProfileReferences.ts";
export class RelationTypeSeparatorPersonProfileRelationsParser
	implements PersonProfileRelationsParser
{
	public parseSpan(): never {
		throw new Error("An unexpected span.");
	}
	public parseImg(): never {
		throw new Error("An unexpected img.");
	}
	private readonly relationTypeToPersonProfileReferences: RelationTypeToPersonProfileReferences;
	public constructor(relationTypeToPersonProfileReferences: RelationTypeToPersonProfileReferences) {
		this.relationTypeToPersonProfileReferences = relationTypeToPersonProfileReferences;
	}
	public parseText(): never {
		throw new Error("An unexpected text.");
	}
	public parseA(): never {
		throw new Error("An unexpected a.");
	}
	public parseBr(): NonFirstRelationTypePersonProfileRelationsParser {
		return new NonFirstRelationTypePersonProfileRelationsParser(
			this.relationTypeToPersonProfileReferences,
		);
	}
	public finalize(): never {
		throw new Error("An unexpected end of the input.");
	}
}
