import type {APersonProfileRelationsParsingNodeData} from "./APersonProfileRelationsParsingNodeData.ts";
import {computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData} from "./computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData.ts";
import {LastPersonProfileReferenceAfterAPersonProfileRelationsParser} from "./LastPersonProfileReferenceAfterAPersonProfileRelationsParser.ts";
import type {PersonProfileReference} from "./PersonProfileReference.ts";
import type {PersonProfileRelationsParser} from "./PersonProfileRelationsParser.ts";
import type {RelationType} from "./RelationType.ts";
import type {RelationTypeToPersonProfileReferences} from "./RelationTypeToPersonProfileReferences.ts";
export class LastPersonProfileReferencePersonProfileRelationsParser
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
	): LastPersonProfileReferenceAfterAPersonProfileRelationsParser {
		const personProfileReference =
			computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData(data);
		const finalCurrentPersonProfileReferences = [
			...this.currentPersonProfileReferences,
			personProfileReference,
		] as const;
		const newRelationTypeToPersonProfileReferences = new Map([
			...this.relationTypeToPersonProfileReferences,
			[this.currentRelationType, finalCurrentPersonProfileReferences],
		]);
		return new LastPersonProfileReferenceAfterAPersonProfileRelationsParser(
			newRelationTypeToPersonProfileReferences,
		);
	}
	public parseBr(): never {
		throw new Error("An unexpected br.");
	}
	public finalize(): never {
		throw new Error("An unexpected end of the input.");
	}
}
