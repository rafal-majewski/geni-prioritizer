import {DonePersonProfileRelationsParser} from "./DonePersonProfileRelationsParser.ts";
import {LastPersonProfileReferenceAfterATextPersonProfileRelationsParser} from "./LastPersonProfileReferenceAfterATextPersonProfileRelationsParser.ts";
import type {PersonProfileRelationsParser} from "./PersonProfileRelationsParser.ts";
import {RelationTypeSeparatorPersonProfileRelationsParser} from "./RelationTypeSeparatorPersonProfileRelationsParser.ts";
import type {RelationTypeToPersonProfileReferences} from "./RelationTypeToPersonProfileReferences.ts";
export class LastPersonProfileReferenceAfterAPersonProfileRelationsParser
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
	public parseText(
		text: string,
	):
		| DonePersonProfileRelationsParser
		| RelationTypeSeparatorPersonProfileRelationsParser
		| LastPersonProfileReferenceAfterATextPersonProfileRelationsParser {
		switch (text) {
			case " ": {
				return new RelationTypeSeparatorPersonProfileRelationsParser(
					this.relationTypeToPersonProfileReferences,
				);
			}
			case "  ": {
				return new DonePersonProfileRelationsParser(this.relationTypeToPersonProfileReferences);
			}
			case "  \n\n": {
				return new LastPersonProfileReferenceAfterATextPersonProfileRelationsParser(
					this.relationTypeToPersonProfileReferences,
				);
			}
			default: {
				throw new Error("An unexpected text.");
			}
		}
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
