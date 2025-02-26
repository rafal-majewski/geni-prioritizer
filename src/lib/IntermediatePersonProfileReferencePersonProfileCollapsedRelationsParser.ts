import type {APersonProfileRelationsParsingNodeData} from "./APersonProfileRelationsParsingNodeData.ts";
import {computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData} from "./computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData.ts";
import {IntermediatePersonProfileReferenceAfterAPersonProfileCollapsedRelationsParser} from "./IntermediatePersonProfileReferenceAfterAPersonProfileCollapsedRelationsParser.ts";
import type {PersonProfileCollapsedRelationsParser} from "./PersonProfileCollapsedRelationsParser.ts";
import type {PersonProfileReference} from "./PersonProfileReference.ts";
export class IntermediatePersonProfileReferencePersonProfileCollapsedRelationsParser
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
	public parseText(): never {
		throw new Error("An unexpected text.");
	}
	public parseA(
		data: APersonProfileRelationsParsingNodeData,
	): IntermediatePersonProfileReferenceAfterAPersonProfileCollapsedRelationsParser {
		const personProfileReference =
			computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData(data);
		const newCurrentPersonProfileReferences = [
			...this.currentPersonProfileReferences,
			personProfileReference,
		] as const;
		return new IntermediatePersonProfileReferenceAfterAPersonProfileCollapsedRelationsParser(
			newCurrentPersonProfileReferences,
		);
	}
	public finalize(): never {
		throw new Error("An unexpected end of the input.");
	}
}
