import type {PersonProfileRelationsParser} from "./PersonProfileRelationsParser.ts";
import type {RelationTypeToPersonProfileReferences} from "./RelationTypeToPersonProfileReferences.ts";
export class DonePersonProfileRelationsParser implements PersonProfileRelationsParser {
	public parseSpan(): never {
		throw new Error("An unexpected span.");
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
	public parseImg(): never {
		throw new Error("An unexpected img.");
	}
	public finalize(): RelationTypeToPersonProfileReferences {
		return this.relationTypeToPersonProfileReferences;
	}
}
