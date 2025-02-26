import {DonePersonProfileRelationsParser} from "./DonePersonProfileRelationsParser.ts";
import {IntermediatePersonProfileReferenceAfterASpanSpanTextPersonProfileRelationsParser} from "./IntermediatePersonProfileReferenceAfterASpanSpanTextPersonProfileRelationsParser.ts";
import type {PersonProfileRelationsParser} from "./PersonProfileRelationsParser.ts";
import {RelationTypeSeparatorPersonProfileRelationsParser} from "./RelationTypeSeparatorPersonProfileRelationsParser.ts";
import type {RelationTypeToPersonProfileReferences} from "./RelationTypeToPersonProfileReferences.ts";
export class IntermediatePersonProfileReferenceAfterASpanSpanPersonProfileRelationsParser
	implements PersonProfileRelationsParser
{
	private readonly relationTypeToPersonProfileReferences: RelationTypeToPersonProfileReferences;
	public constructor(relationTypeToPersonProfileReferences: RelationTypeToPersonProfileReferences) {
		this.relationTypeToPersonProfileReferences = relationTypeToPersonProfileReferences;
	}
	public parseSpan(): never {
		throw new Error("An unexpected span.");
	}
	public parseImg(): never {
		throw new Error("An unexpected img.");
	}
	public parseText(
		text: string,
	):
		| DonePersonProfileRelationsParser
		| IntermediatePersonProfileReferenceAfterASpanSpanTextPersonProfileRelationsParser
		| RelationTypeSeparatorPersonProfileRelationsParser {
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
				return new IntermediatePersonProfileReferenceAfterASpanSpanTextPersonProfileRelationsParser(
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
