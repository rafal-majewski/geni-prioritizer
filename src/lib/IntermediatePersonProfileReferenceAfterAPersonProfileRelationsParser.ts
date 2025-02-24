import {IntermediatePersonProfileReferenceAfterASpanPersonProfileRelationsParser} from "./IntermediatePersonProfileReferenceAfterASpanPersonProfileRelationsParser.ts";
import {IntermediatePersonProfileReferencePersonProfileRelationsParser} from "./IntermediatePersonProfileReferencePersonProfileRelationsParser.ts";
import {LastPersonProfileReferencePersonProfileRelationsParser} from "./LastPersonProfileReferencePersonProfileRelationsParser.ts";
import type {PersonProfileReference} from "./PersonProfileReference.ts";
import type {PersonProfileRelationsParser} from "./PersonProfileRelationsParser.ts";
import type {RelationType} from "./RelationType.ts";
import type {RelationTypeToPersonProfileReferences} from "./RelationTypeToPersonProfileReferences.ts";
export class IntermediatePersonProfileReferenceAfterAPersonProfileRelationsParser
	implements PersonProfileRelationsParser
{
	public parseSpan(): IntermediatePersonProfileReferenceAfterASpanPersonProfileRelationsParser {
		return new IntermediatePersonProfileReferenceAfterASpanPersonProfileRelationsParser(
			this.relationTypeToPersonProfileReferences,
			this.currentRelationType,
			this.currentPersonProfileReferences,
		);
	}
	public parseImg(): never {
		throw new Error("An unexpected img.");
	}
	private readonly relationTypeToPersonProfileReferences: RelationTypeToPersonProfileReferences;
	private readonly currentRelationType: RelationType;
	private readonly currentPersonProfileReferences: readonly [
		PersonProfileReference,
		...PersonProfileReference[],
	];
	public constructor(
		relationTypeToPersonProfileReferences: RelationTypeToPersonProfileReferences,
		currentRelationType: RelationType,
		currentPersonProfileReferences: readonly [PersonProfileReference, ...PersonProfileReference[]],
	) {
		this.relationTypeToPersonProfileReferences = relationTypeToPersonProfileReferences;
		this.currentRelationType = currentRelationType;
		this.currentPersonProfileReferences = currentPersonProfileReferences;
	}
	public parseText(
		text: string,
	):
		| IntermediatePersonProfileReferencePersonProfileRelationsParser
		| LastPersonProfileReferencePersonProfileRelationsParser {
		switch (text) {
			case "; ": {
				return new IntermediatePersonProfileReferencePersonProfileRelationsParser(
					this.relationTypeToPersonProfileReferences,
					this.currentRelationType,
					this.currentPersonProfileReferences,
				);
			}
			case " i ": {
				return new LastPersonProfileReferencePersonProfileRelationsParser(
					this.relationTypeToPersonProfileReferences,
					this.currentRelationType,
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
	public parseBr(): never {
		throw new Error("An unexpected br.");
	}
	public finalize(): never {
		throw new Error("An unexpected end of the input.");
	}
}
