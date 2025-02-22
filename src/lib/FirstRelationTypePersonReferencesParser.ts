import {FirstPersonReferenceAPersonReferencesParser} from "./FirstPersonReferenceAPersonReferencesParser.ts";
import type {PersonReferencesParser} from "./PersonReferencesParser.ts";
import type {TextPersonReferencesSectionParsingNode} from "./TextPersonReferencesSectionNode.ts";
export class FirstRelationTypePersonReferencesParser implements PersonReferencesParser {
	public parseText(
		node: TextPersonReferencesSectionParsingNode,
	): FirstPersonReferenceAPersonReferencesParser {
		switch (node) {
			case "syn ": {
				return new FirstPersonReferenceAPersonReferencesParser(new Map(), "parent");
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
