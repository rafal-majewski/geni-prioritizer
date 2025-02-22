import type {PersonReferencesParser} from "./PersonReferencesParser.ts";
import type {RelationTypeToPersonReferences} from "./RelationTypeToPersonReferences.ts";
export class DonePersonReferencesParser implements PersonReferencesParser {
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
	public parseBr(): never {
		throw new Error("An unexpected br.");
	}
	public finalize(): RelationTypeToPersonReferences {
		return this.relationTypeToPersonReferences;
	}
}
