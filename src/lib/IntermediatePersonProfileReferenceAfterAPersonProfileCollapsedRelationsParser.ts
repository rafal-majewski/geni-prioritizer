import {IntermediatePersonProfileReferencePersonProfileCollapsedRelationsParser} from "./IntermediatePersonProfileReferencePersonProfileCollapsedRelationsParser.ts";
import {LastPersonProfileReferencePersonProfileCollapsedRelationsParser} from "./LastPersonProfileReferencePersonProfileCollapsedRelationsParser.ts";
import type {PersonProfileCollapsedRelationsParser} from "./PersonProfileCollapsedRelationsParser.ts";
import type {PersonProfileReference} from "./PersonProfileReference.ts";
export class IntermediatePersonProfileReferenceAfterAPersonProfileCollapsedRelationsParser
	implements PersonProfileCollapsedRelationsParser
{
	private readonly currentPersonProfileReferences: readonly [
		PersonProfileReference,
		...PersonProfileReference[],
	];
	public constructor(
		currentPersonProfileReferences: readonly [PersonProfileReference, ...PersonProfileReference[]],
	) {
		this.currentPersonProfileReferences = currentPersonProfileReferences;
	}
	public parseText(
		text: string,
	):
		| IntermediatePersonProfileReferencePersonProfileCollapsedRelationsParser
		| LastPersonProfileReferencePersonProfileCollapsedRelationsParser {
		switch (text) {
			case "; ": {
				return new IntermediatePersonProfileReferencePersonProfileCollapsedRelationsParser(
					this.currentPersonProfileReferences,
				);
			}
			case " i ": {
				return new LastPersonProfileReferencePersonProfileCollapsedRelationsParser(
					this.currentPersonProfileReferences,
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
	public finalize(): never {
		throw new Error("An unexpected end of the input.");
	}
}
