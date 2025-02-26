import {FirstPersonProfileReferencePersonProfileCollapsedRelationsParser} from "./FirstPersonProfileReferencePersonProfileCollapsedRelationsParser.ts";
import type {PersonProfileCollapsedRelationsParser} from "./PersonProfileCollapsedRelationsParser.ts";
import {SinglePersonProfileReferencePersonProfileCollapsedRelationsParser} from "./SinglePersonProfileReferencePersonProfileCollapsedRelationsParser.ts";
export class InitialTextPersonProfileCollapsedRelationsParser
	implements PersonProfileCollapsedRelationsParser
{
	public parseText(
		text: string,
	):
		| SinglePersonProfileReferencePersonProfileCollapsedRelationsParser
		| FirstPersonProfileReferencePersonProfileCollapsedRelationsParser {
		switch (text) {
			case ";  i ": {
				return new SinglePersonProfileReferencePersonProfileCollapsedRelationsParser();
			}
			case "; ": {
				return new FirstPersonProfileReferencePersonProfileCollapsedRelationsParser();
			}
			default: {
				throw new Error("An unexpected text.");
			}
		}
	}
	public parseA(): never {
		throw new Error("An unexpected a.");
	}
	public finalize(): never {
		throw new Error("An unexpected end of the input.");
	}
}
