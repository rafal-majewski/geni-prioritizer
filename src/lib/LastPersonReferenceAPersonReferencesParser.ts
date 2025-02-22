import type {APersonReferencesSectionParsingNodeData} from "./APersonReferencesSectionParsingNodeData.ts";
import {LastPersonReferenceTextPersonReferencesParser} from "./LastPersonReferenceTextPersonReferencesParser.ts";
import type {PersonReference} from "./PersonReference.ts";
import type {PersonReferencesParser} from "./PersonReferencesParser.ts";
import type {RelationType} from "./RelationType.ts";
import type {RelationTypeToPersonReferences} from "./RelationTypeToPersonReferences.ts";
export class LastPersonReferenceAPersonReferencesParser implements PersonReferencesParser {
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
	public parseText(): never {
		throw new Error("Unexpected text.");
	}
	public parseA(data: APersonReferencesSectionParsingNodeData): PersonReferencesParser {
		const personReference = {
			name: data.textContent,
			url: data.href,
			id: data.dataProfileId,
		};
		return new LastPersonReferenceTextPersonReferencesParser(
			new Map([
				...this.relationTypeToPersonReferences,
				[this.currentRelationType, [...this.currentPersonReferences, personReference]],
			]),
		);
	}
	public parseBr(): never {
		throw new Error("An unexpected br.");
	}
	public finalize(): RelationTypeToPersonReferences {
		throw new Error("An unexpected end of the input.");
	}
}
