import {IntermediatePersonProfileReferencePersonProfileCollapsedRelationsParser} from "./IntermediatePersonProfileReferencePersonProfileCollapsedRelationsParser.ts";
import {LastPersonProfileReferencePersonProfileCollapsedRelationsParser} from "./LastPersonProfileReferencePersonProfileCollapsedRelationsParser.ts";
import type {PersonProfileCollapsedRelationsParser} from "./PersonProfileCollapsedRelationsParser.ts";
import type {PersonProfileReference} from "./PersonProfileReference.ts";
export class FirstPersonProfileReferenceAfterAPersonProfileCollapsedRelationsParser
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
		| LastPersonProfileReferencePersonProfileCollapsedRelationsParser
		| IntermediatePersonProfileReferencePersonProfileCollapsedRelationsParser {
		switch (text) {
			case " i ": {
				return new LastPersonProfileReferencePersonProfileCollapsedRelationsParser(
					this.currentPersonProfileReferences,
				);
			}
			case "; ": {
				return new IntermediatePersonProfileReferencePersonProfileCollapsedRelationsParser(
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
