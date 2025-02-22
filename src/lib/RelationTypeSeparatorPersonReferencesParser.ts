import {NonFirstRelationTypePersonReferencesParser} from "./NonFirstRelationTypePersonReferencesParser.ts";
import type {PersonReferencesParser} from "./PersonReferencesParser.ts";
import type {RelationTypeToPersonReferences} from "./RelationTypeToPersonReferences.ts";
export class RelationTypeSeparatorPersonReferencesParser implements PersonReferencesParser {
	private readonly relationTypeToPersonReferences: RelationTypeToPersonReferences;
	public constructor(relationTypeToPersonReferences: RelationTypeToPersonReferences) {
		this.relationTypeToPersonReferences = relationTypeToPersonReferences;
	}
	public parseText(): never {
		throw new Error("An unexpected text.");
	}
	public parseA(): never {
		throw new Error("An unexpected a.");
	}
	public parseBr(): NonFirstRelationTypePersonReferencesParser {
		return new NonFirstRelationTypePersonReferencesParser(this.relationTypeToPersonReferences);
	}
	public finalize(): never {
		throw new Error("An unexpected end of the input.");
	}
}
