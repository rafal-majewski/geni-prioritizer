import type {APersonProfileRelationsParsingNodeData} from "./APersonProfileRelationsParsingNodeData.ts";
import {DonePersonProfileCollapsedRelationsParser} from "./DonePersonProfileCollapsedRelationsParser.ts";
import type {PersonProfileCollapsedRelationsParser} from "./PersonProfileCollapsedRelationsParser.ts";
import type {PersonProfileReference} from "./PersonProfileReference.ts";
export class FinalAPersonProfileCollapsedRelationsParser
	implements PersonProfileCollapsedRelationsParser
{
	private readonly personProfileReferences: readonly [
		PersonProfileReference,
		...PersonProfileReference[],
	];
	public constructor(
		personProfileReferences: readonly [PersonProfileReference, ...PersonProfileReference[]],
	) {
		this.personProfileReferences = personProfileReferences;
	}
	public parseText(): never {
		throw new Error("An unexpected text.");
	}
	public parseA(
		data: APersonProfileRelationsParsingNodeData,
	): DonePersonProfileCollapsedRelationsParser {
		if (!data.href.endsWith("#") || data.textContent !== "« mniej") {
			throw new Error("An unexpected href.");
		}
		return new DonePersonProfileCollapsedRelationsParser(this.personProfileReferences);
	}
	public finalize(): never {
		throw new Error("An unexpected end of the input.");
	}
}
