import {LastPersonProfileReferenceAfterATextImgPersonProfileRelationsParser} from "./LastPersonProfileReferenceAfterATextImgPersonProfileRelationsParser.ts";
import type {PersonProfileRelationsParser} from "./PersonProfileRelationsParser.ts";
import type {RelationTypeToPersonProfileReferences} from "./RelationTypeToPersonProfileReferences.ts";
export class LastPersonProfileReferenceAfterATextPersonProfileRelationsParser
	implements PersonProfileRelationsParser
{
	public parseSpan(): never {
		throw new Error("An unexpected span.");
	}
	public parseImg(): LastPersonProfileReferenceAfterATextImgPersonProfileRelationsParser {
		return new LastPersonProfileReferenceAfterATextImgPersonProfileRelationsParser(
			this.relationTypeToPersonProfileReferences,
		);
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
	public parseBr(): never {
		throw new Error("An unexpected br.");
	}
	public finalize(): never {
		throw new Error("An unexpected end of the input.");
	}
}
