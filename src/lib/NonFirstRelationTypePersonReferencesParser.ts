import {FirstPersonReferenceAPersonReferencesParser} from "./FirstPersonReferenceAPersonReferencesParser.ts";
import type {PersonReferencesParser} from "./PersonReferencesParser.ts";
import type {RelationTypeToPersonReferences} from "./RelationTypeToPersonReferences.ts";
export class NonFirstRelationTypePersonReferencesParser implements PersonReferencesParser {
	private readonly relationTypeToPersonReferences: RelationTypeToPersonReferences;
	public constructor(relationTypeToPersonReferences: RelationTypeToPersonReferences) {
		this.relationTypeToPersonReferences = relationTypeToPersonReferences;
	}
	public parseText(text: string): FirstPersonReferenceAPersonReferencesParser {
		switch (text) {
			case " partner ": {
				return new FirstPersonReferenceAPersonReferencesParser(
					this.relationTypeToPersonReferences,
					"partner",
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
