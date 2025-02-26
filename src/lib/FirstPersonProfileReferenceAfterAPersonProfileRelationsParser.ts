import {DonePersonProfileRelationsParser} from "./DonePersonProfileRelationsParser.ts";
import {FirstPersonProfileReferenceAfterATextPersonProfileRelationsParser} from "./FirstPersonProfileReferenceAfterATextPersonProfileRelationsParser.ts";
import {IntermediatePersonProfileReferencePersonProfileRelationsParser} from "./IntermediatePersonProfileReferencePersonProfileRelationsParser.ts";
import {LastPersonProfileReferencePersonProfileRelationsParser} from "./LastPersonProfileReferencePersonProfileRelationsParser.ts";
import type {PersonProfileReference} from "./PersonProfileReference.ts";
import type {PersonProfileRelationsParser} from "./PersonProfileRelationsParser.ts";
import type {RelationType} from "./RelationType.ts";
import {RelationTypeSeparatorPersonProfileRelationsParser} from "./RelationTypeSeparatorPersonProfileRelationsParser.ts";
import type {RelationTypeToPersonProfileReferences} from "./RelationTypeToPersonProfileReferences.ts";
export class FirstPersonProfileReferenceAfterAPersonProfileRelationsParser
	implements PersonProfileRelationsParser
{
	public parseSpan(): never {
		throw new Error("An unexpected span.");
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
		| LastPersonProfileReferencePersonProfileRelationsParser
		| DonePersonProfileRelationsParser
		| RelationTypeSeparatorPersonProfileRelationsParser
		| IntermediatePersonProfileReferencePersonProfileRelationsParser
		| FirstPersonProfileReferenceAfterATextPersonProfileRelationsParser {
		switch (text) {
			case " i ": {
				return new LastPersonProfileReferencePersonProfileRelationsParser(
					this.relationTypeToPersonProfileReferences,
					this.currentRelationType,
					this.currentPersonProfileReferences,
				);
			}
			case "  \n\n": {
				const newRelationTypeToPersonProfileReferences = new Map([
					...this.relationTypeToPersonProfileReferences,
					[this.currentRelationType, this.currentPersonProfileReferences],
				]);
				return new FirstPersonProfileReferenceAfterATextPersonProfileRelationsParser(
					newRelationTypeToPersonProfileReferences,
				);
			}
			case "; ": {
				return new IntermediatePersonProfileReferencePersonProfileRelationsParser(
					this.relationTypeToPersonProfileReferences,
					this.currentRelationType,
					this.currentPersonProfileReferences,
				);
			}
			case "  ": {
				const newRelationTypeToPersonProfileReferences = new Map([
					...this.relationTypeToPersonProfileReferences,
					[this.currentRelationType, this.currentPersonProfileReferences],
				]);
				return new DonePersonProfileRelationsParser(newRelationTypeToPersonProfileReferences);
			}
			case " ": {
				const newRelationTypeToPersonProfileReferences = new Map([
					...this.relationTypeToPersonProfileReferences,
					[this.currentRelationType, this.currentPersonProfileReferences],
				]);
				return new RelationTypeSeparatorPersonProfileRelationsParser(
					newRelationTypeToPersonProfileReferences,
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
