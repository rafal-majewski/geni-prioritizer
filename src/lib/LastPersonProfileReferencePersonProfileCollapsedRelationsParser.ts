import type {APersonProfileRelationsParsingNodeData} from "./APersonProfileRelationsParsingNodeData.ts";
import {computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData} from "./computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData.ts";
import {FinalAPersonProfileCollapsedRelationsParser} from "./FinalAPersonProfileCollapsedRelationsParser.ts";
import type {PersonProfileCollapsedRelationsParser} from "./PersonProfileCollapsedRelationsParser.ts";
import type {PersonProfileReference} from "./PersonProfileReference.ts";
export class LastPersonProfileReferencePersonProfileCollapsedRelationsParser
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
	): FinalAPersonProfileCollapsedRelationsParser {
		const personProfileReference =
			computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData(data);
		const finalCurrentPersonProfileReferences = [
			...this.currentPersonProfileReferences,
			personProfileReference,
		] as const;
		return new FinalAPersonProfileCollapsedRelationsParser(finalCurrentPersonProfileReferences);
	}
	public finalize(): never {
		throw new Error("An unexpected end of the input.");
	}
}
