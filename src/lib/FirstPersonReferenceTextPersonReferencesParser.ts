import {LastPersonReferenceAPersonReferencesParser} from "./LastPersonReferenceAPersonReferencesParser.ts";
import type {PersonReference} from "./PersonReference.ts";
import type {PersonReferencesParser} from "./PersonReferencesParser.ts";
import type {RelationType} from "./RelationType.ts";
import type {RelationTypeToPersonReferences} from "./RelationTypeToPersonReferences.ts";
export class FirstPersonReferenceTextPersonReferencesParser implements PersonReferencesParser {
	private readonly relationTypeToPersonReferences: RelationTypeToPersonReferences;
	private readonly currentRelationType: RelationType;
	private readonly currentPersonReferences: readonly [PersonReference, ...PersonReference[]];
	public constructor(
		relationTypeToPersonReferences: RelationTypeToPersonReferences,
		currentRelationType: RelationType,
		currentPersonReferences: readonly [PersonReference, ...PersonReference[]],
	) {
		this.relationTypeToPersonReferences = relationTypeToPersonReferences;
		this.currentRelationType = currentRelationType;
		this.currentPersonReferences = currentPersonReferences;
	}
	public parseText(text: string): PersonReferencesParser {
		switch (text) {
			case " i ": {
				return new LastPersonReferenceAPersonReferencesParser(
					this.relationTypeToPersonReferences,
					this.currentRelationType,
					this.currentPersonReferences,
				);
			}
			default: {
				throw new Error("Unexpected text.");
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
		throw new Error("An unexpected end of input.");
	}
}
