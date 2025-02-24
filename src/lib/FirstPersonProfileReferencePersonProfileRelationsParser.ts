import type {APersonProfileRelationsParsingNodeData} from "./APersonProfileRelationsParsingNodeData.ts";
import {computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData} from "./computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData.ts";
import {FirstPersonProfileReferenceAfterAPersonProfileRelationsParser} from "./FirstPersonProfileReferenceAfterAPersonProfileRelationsParser.ts";
import type {PersonProfileRelationsParser} from "./PersonProfileRelationsParser.ts";
import type {RelationType} from "./RelationType.ts";
import type {RelationTypeToPersonProfileReferences} from "./RelationTypeToPersonProfileReferences.ts";
export class FirstPersonProfileReferencePersonProfileRelationsParser
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
	public constructor(
		relationTypeToPersonProfileReferences: RelationTypeToPersonProfileReferences,
		currentRelationType: RelationType,
	) {
		this.relationTypeToPersonProfileReferences = relationTypeToPersonProfileReferences;
		this.currentRelationType = currentRelationType;
	}
	public parseText(): never {
		throw new Error("An unexpected text.");
	}
	public parseA(
		data: APersonProfileRelationsParsingNodeData,
	): FirstPersonProfileReferenceAfterAPersonProfileRelationsParser {
		const personProfileReference =
			computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData(data);
		return new FirstPersonProfileReferenceAfterAPersonProfileRelationsParser(
			this.relationTypeToPersonProfileReferences,
			this.currentRelationType,
			[personProfileReference],
		);
	}
	public parseBr(): never {
		throw new Error("An unexpected br.");
	}
	public finalize(): never {
		throw new Error("An unexpected end of the input.");
	}
}
