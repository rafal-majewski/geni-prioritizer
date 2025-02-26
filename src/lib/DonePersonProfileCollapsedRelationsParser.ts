import type {PersonProfileCollapsedRelationsParser} from "./PersonProfileCollapsedRelationsParser.ts";
import type {PersonProfileReference} from "./PersonProfileReference.ts";
export class DonePersonProfileCollapsedRelationsParser
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
	public parseA(): never {
		throw new Error("An unexpected a.");
	}
	public finalize(): readonly [PersonProfileReference, ...PersonProfileReference[]] {
		return this.personProfileReferences;
	}
}
