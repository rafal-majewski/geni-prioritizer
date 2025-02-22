import {DonePersonReferencesParser} from "./DonePersonReferencesParser.ts";
import type {PersonReferencesParser} from "./PersonReferencesParser.ts";
import {RelationTypeSeparatorPersonReferencesParser} from "./RelationTypeSeparatorPersonReferencesParser.ts";
import type {RelationTypeToPersonReferences} from "./RelationTypeToPersonReferences.ts";
export class LastPersonReferenceTextPersonReferencesParser implements PersonReferencesParser {
	private readonly relationTypeToPersonReferences: RelationTypeToPersonReferences;
	public constructor(relationTypeToPersonReferences: RelationTypeToPersonReferences) {
		this.relationTypeToPersonReferences = relationTypeToPersonReferences;
	}
	public parseText(
		text: string,
	): DonePersonReferencesParser | RelationTypeSeparatorPersonReferencesParser {
		switch (text) {
			case " ": {
				return new RelationTypeSeparatorPersonReferencesParser(this.relationTypeToPersonReferences);
			}
			case "  ": {
				return new DonePersonReferencesParser(this.relationTypeToPersonReferences);
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
