import type {APersonProfileRelationsParsingNodeData} from "./APersonProfileRelationsParsingNodeData.ts";
import {computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData} from "./computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData.ts";
import {FinalAPersonProfileCollapsedRelationsParser} from "./FinalAPersonProfileCollapsedRelationsParser.ts";
import type {PersonProfileCollapsedRelationsParser} from "./PersonProfileCollapsedRelationsParser.ts";
export class SinglePersonProfileReferencePersonProfileCollapsedRelationsParser
	implements PersonProfileCollapsedRelationsParser
{
	public parseText(): never {
		throw new Error("An unexpected text.");
	}
	public parseA(
		data: APersonProfileRelationsParsingNodeData,
	): FinalAPersonProfileCollapsedRelationsParser {
		const personProfileReference =
			computePersonProfileReferenceFromAPersonProfileRelationsParsingNodeData(data);
		return new FinalAPersonProfileCollapsedRelationsParser([personProfileReference]);
	}
	public finalize(): never {
		throw new Error("An unexpected end of the input.");
	}
}
