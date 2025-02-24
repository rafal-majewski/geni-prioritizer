import type {APersonProfileRelationsParsingNodeData} from "./APersonProfileRelationsParsingNodeData.ts";
import {computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData} from "./computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData.ts";
import {IntermediatePersonProfileReferenceAfterAPersonProfileRelationsParser} from "./IntermediatePersonProfileReferenceAfterAPersonProfileRelationsParser.ts";
import type {PersonProfileReference} from "./PersonProfileReference.ts";
import type {PersonProfileRelationsParser} from "./PersonProfileRelationsParser.ts";
import type {RelationType} from "./RelationType.ts";
import type {RelationTypeToPersonProfileReferences} from "./RelationTypeToPersonProfileReferences.ts";
export class IntermediatePersonProfileReferencePersonProfileRelationsParser
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
	public parseText(): never {
		throw new Error("An unexpected text.");
	}
	public parseA(
		data: APersonProfileRelationsParsingNodeData,
	): IntermediatePersonProfileReferenceAfterAPersonProfileRelationsParser {
		const personProfileReference =
			computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData(data);
		const newCurrentPersonProfileReferences = [
			...this.currentPersonProfileReferences,
			personProfileReference,
		] as const;
		return new IntermediatePersonProfileReferenceAfterAPersonProfileRelationsParser(
			this.relationTypeToPersonProfileReferences,
			this.currentRelationType,
			newCurrentPersonProfileReferences,
		);
	}
	public parseBr(): never {
		throw new Error("An unexpected br.");
	}
	public finalize(): never {
		throw new Error("An unexpected end of the input.");
	}
}
