import type {APersonProfileRelationsParsingNodeData} from "./APersonProfileRelationsParsingNodeData.ts";
import {computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData} from "./computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData.ts";
import {FirstPersonProfileReferenceAfterAPersonProfileCollapsedRelationsParser} from "./FirstPersonProfileReferenceAfterAPersonProfileCollapsedRelationsParser.ts";
import type {PersonProfileCollapsedRelationsParser} from "./PersonProfileCollapsedRelationsParser.ts";
export class FirstPersonProfileReferencePersonProfileCollapsedRelationsParser
	implements PersonProfileCollapsedRelationsParser
{
	public parseText(): never {
		throw new Error("An unexpected text.");
	}
	public parseA(
		data: APersonProfileRelationsParsingNodeData,
	): FirstPersonProfileReferenceAfterAPersonProfileCollapsedRelationsParser {
		const personProfileReference =
			computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData(data);
		return new FirstPersonProfileReferenceAfterAPersonProfileCollapsedRelationsParser([
			personProfileReference,
		]);
	}
	public finalize(): never {
		throw new Error("An unexpected end of the input.");
	}
}
