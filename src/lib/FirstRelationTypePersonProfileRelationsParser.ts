import {FirstPersonProfileReferencePersonProfileRelationsParser} from "./FirstPersonProfileReferencePersonProfileRelationsParser.ts";
import type {PersonProfileRelationsParser} from "./PersonProfileRelationsParser.ts";
export class FirstRelationTypePersonProfileRelationsParser implements PersonProfileRelationsParser {
	public parseSpan(): never {
		throw new Error("An unexpected span.");
	}
	public parseImg(): never {
		throw new Error("An unexpected img.");
	}
	public parseText(text: string): FirstPersonProfileReferencePersonProfileRelationsParser {
		const relationType = (
			{
				"syn ": "parent",
				"córka ": "parent",
			} as const
		)[text];
		if (relationType === undefined) {
			throw new Error("An unexpected text.");
		}
		return new FirstPersonProfileReferencePersonProfileRelationsParser(new Map(), relationType);
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
