import {exmptyRelationTypeToPersonProfileReferences} from "./emptyRelationTypeToPersonProfileReferences.ts";
import {FirstPersonProfileReferencePersonProfileRelationsParser} from "./FirstPersonProfileReferencePersonProfileRelationsParser.ts";
import type {PersonProfileRelationsParser} from "./PersonProfileRelationsParser.ts";
import {somethingToRelatonType} from "./somethingToRelatonType.ts";
export class FirstRelationTypePersonProfileRelationsParser implements PersonProfileRelationsParser {
	public parseSpan(): never {
		throw new Error("An unexpected span.");
	}
	public parseImg(): never {
		throw new Error("An unexpected img.");
	}
	public parseText(text: string): FirstPersonProfileReferencePersonProfileRelationsParser {
		const match = /(?<something>.*) /.exec(text);
		if (match === null) {
			throw new Error("An unexpected text.");
		}
		const relationType =
			somethingToRelatonType[
				(
					match.groups as {
						something: string;
					}
				).something
			];
		if (relationType === undefined) {
			throw new Error("An unexpected text.");
		}
		return new FirstPersonProfileReferencePersonProfileRelationsParser(
			exmptyRelationTypeToPersonProfileReferences,
			relationType,
		);
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
