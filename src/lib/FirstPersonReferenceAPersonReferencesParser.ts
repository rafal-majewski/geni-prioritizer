import type {APersonReferencesSectionParsingNodeData} from "./APersonReferencesSectionParsingNodeData.ts";
import {FirstPersonReferenceTextPersonReferencesParser} from "./FirstPersonReferenceTextPersonReferencesParser.ts";
import type {PersonReference} from "./PersonReference.ts";
import type {PersonReferencesParser} from "./PersonReferencesParser.ts";
import type {RelationType} from "./RelationType.ts";
import type {RelationTypeToPersonReferences} from "./RelationTypeToPersonReferences.ts";
export class FirstPersonReferenceAPersonReferencesParser implements PersonReferencesParser {
	private readonly relationTypeToPersonReferences: RelationTypeToPersonReferences;
	private readonly currentRelationType: RelationType;
	public constructor(
		relationTypeToPersonReferences: RelationTypeToPersonReferences,
		currentRelationType: RelationType,
	) {
		this.relationTypeToPersonReferences = relationTypeToPersonReferences;
		this.currentRelationType = currentRelationType;
	}
	public parseText(): PersonReferencesParser {
		throw new Error("Unexpected text.");
	}
	public parseA(data: APersonReferencesSectionParsingNodeData): PersonReferencesParser {
		const personReference: PersonReference = {
			name: data.textContent,
			url: data.href,
			id: data.dataProfileId,
		};
		return new FirstPersonReferenceTextPersonReferencesParser(
			this.relationTypeToPersonReferences,
			this.currentRelationType,
			[personReference],
		);
	}
	public parseBr(): never {
		throw new Error("An unexpected br.");
	}
	public finalize(): never {
		throw new Error("An unexpected end of input.");
	}
}
